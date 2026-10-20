# AUTH.md — Addis Eats Authentication & Security

## Authentication Design

Addis Eats uses a custom HMAC-SHA-256 signed session token stored in an HttpOnly cookie. There is no third-party auth library dependency. The design follows a three-layer security model.

---

## Sign-in and Sign-out

### Sign-in flow
1. User submits email + password to `POST /api/auth/signin`.
2. Server calls `verifyCredentials(email, password)` in `lib/users.js`.
3. Password is hashed with SHA-256 and compared against the stored hash (constant-time for the signature check; the password hash comparison should be upgraded to bcrypt/argon2 for production).
4. On success, `createSession(user)` in `lib/session.js` signs a payload and sets the cookie.
5. The server validates and returns a safe redirect destination. The client navigates there.

### Sign-out flow
1. `POST /api/auth/signout` calls `clearSession()`.
2. Cookie is overwritten with `maxAge: 0`, which causes the browser to expire it immediately.
3. Browser is redirected to `/`.

---

## Session Token

**File:** `lib/session-token.js`

- Format: `base64url(payload).HMAC-SHA256(base64url(payload))`
- Algorithm: HMAC-SHA-256 using `AUTH_SECRET` environment variable
- Lifetime: 7 days
- Cookie name: `addis_eats_session`

### Cookie settings
| Setting | Value |
|---|---|
| `httpOnly` | `true` — not accessible to JavaScript |
| `secure` | `true` in production, `false` in development |
| `sameSite` | `lax` |
| `path` | `/` |
| `maxAge` | 604800 (7 days) |

### Verification
`verifyToken(token)` in `lib/session-token.js`:
1. Splits the token into `[data, sig]`.
2. Recomputes the expected HMAC.
3. Compares using a manual constant-time loop (XOR each character).
4. Returns `null` on length mismatch, signature mismatch, or JSON parse failure.
5. `getSession()` additionally checks `exp` against the current time.

---

## `lib/session.js` — Session Helpers

- `createSession(user)` — signs and sets the cookie
- `getSession()` — reads, verifies, and returns the session payload (or `null`)
- `clearSession()` — zeroes out the cookie

All three functions are server-only (`import 'server-only'`).

---

## Three-Layer Security Model

### Layer 1 — Middleware (`middleware.js`)
- Matches `/checkout/:path*` and `/orders/:path*` using a narrow matcher.
- Checks for the presence of `addis_eats_session` cookie.
- Redirects unauthenticated visitors to `/signin?next=<encoded-destination>`.
- **What this proves:** The browser had the cookie at request time.
- **Why this is not enough:** The cookie might be expired, forged, or from a signed-out session. Middleware only checks presence, not full cryptographic validity.

### Layer 2 — Server-side page and action checks
- Every protected page (`/checkout`, `/orders`, `/orders/[id]`, `/kitchen`, `/dashboard`) calls `getSession()`.
- Redirects to `/signin` if the session is null or expired.
- **What this proves:** The session token is cryptographically valid and unexpired.
- **Why this is not enough:** A valid session does not prove the user owns the resource being accessed.

### Layer 3 — Data ownership and write validation
- `getOrderById(id, session.sub)` returns `null` if the order belongs to a different user.
- `createOrder({ userId: session.sub, ... })` — `userId` always comes from the session, never the request body.
- Prices and totals are recalculated server-side from `lib/dishes.js`.
- Staff actions check `session.role === 'staff'` before allowing status changes to any order.
- **What this proves:** The session user is authorised to read/write this specific resource.

---

## Safe Redirect Handling

**File:** `lib/safe-redirect.js`

Defences implemented:
- Rejects protocol-relative URLs (`//example.com`)
- Rejects backslash tricks (`\example.com`, `/\example.com`)
- Rejects any value matching `^[a-zA-Z][a-zA-Z0-9+-.]*:` (has a protocol)
- Requires leading `/`
- Resolves the path against `NEXT_PUBLIC_APP_URL` and checks the origin matches

A value starting with `/` is necessary but not sufficient — we verify the resolved origin.

---

## Role System

Users have a `role` field: `customer` or `staff`.

| Route/Action | Customer | Staff |
|---|---|---|
| `/menu`, `/cart`, `/` | ✅ | ✅ |
| `/checkout`, `/orders` | ✅ (own orders) | ✅ |
| `/kitchen`, `/dashboard` | ❌ redirected | ✅ |
| Cancel own order | ✅ | ✅ |
| Update any order status | ❌ | ✅ |

The role is stored in the signed session token. Customers cannot grant themselves the staff role because the token is HMAC-signed — tampering invalidates the signature.

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `AUTH_SECRET` | 32-byte hex secret used to sign session tokens. Required. |
| `NEXT_PUBLIC_APP_URL` | Public URL for safe redirect validation. |

---

## Demo Accounts

All demo accounts use the password: `password`

| Email | Role |
|---|---|
| abebe@addiseats.test | customer |
| tigist@addiseats.test | customer |
| dawit@addiseats.test | staff |
| sara@addiseats.test | staff |

---

## Security Test Results

### Attack 1 — Signed-out access
- Navigating to `/orders` while signed out → redirected to `/signin?next=%2Forders` ✅
- Navigating to `/checkout` while signed out → redirected to `/signin?next=%2Fcheckout` ✅
- `GET /api/orders` without a cookie → `401 Unauthorised` ✅
- `POST /api/orders` without a cookie → `401 Unauthorised` ✅

### Attack 2 — Cross-account order access
- Sign in as `abebe@addiseats.test`, attempt to `GET /api/orders/<tigist-order-id>`
- Response: `404 Order not found.` (ownership check in `getOrderById`) ✅
- Navigating to `/orders/<tigist-order-id>` → redirected to `/orders` ✅

### Attack 3 — Malicious redirect
- `/signin?next=https://evil.com` → after sign-in, redirected to `/orders` (fallback) ✅
- `/signin?next=//evil.com` → fallback to `/orders` ✅
- `/signin?next=/\evil.com` → fallback to `/orders` ✅

### Attack 4 — Wrong role (customer accessing /kitchen)
- Sign in as `abebe@addiseats.test` (customer), navigate to `/kitchen` → redirected to `/` ✅
- `GET /api/kitchen/orders` as customer → `403 Forbidden` ✅
- `PATCH /api/orders/<id>` with `status: "confirmed"` as customer → `403 Forbidden` ✅

---

## Limitations

- Passwords are hashed with SHA-256. For production, replace with **bcrypt** or **argon2**.
- The order store is in-memory. A server restart clears all orders. Replace with a real database (e.g., PostgreSQL via Prisma) for production.
- No CSRF protection on the sign-out endpoint (it is a form POST, but adding a CSRF token would be recommended for production).

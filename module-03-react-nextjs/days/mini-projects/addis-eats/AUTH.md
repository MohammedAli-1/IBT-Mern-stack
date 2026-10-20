# Addis Eats — Auth & Protection Layers

Every protected route has multiple layers. Each layer proves something different.

## Protected Routes

### `/checkout`

| Layer | Where | What it proves |
|-------|-------|---------------|
| Middleware | `middleware.js` | Request carries a valid signed session cookie before the page even starts rendering. |
| Page render | `app/checkout/page.js` | Session is still valid at render time — covers cases where middleware cache is stale. |
| Server action | `submitOrder` in `orderActions.js` | Caller is authenticated and the order is stamped with `session.id` as owner. |

### `/orders`

| Layer | Where | What it proves |
|-------|-------|---------------|
| Middleware | `middleware.js` | Request carries a valid signed session cookie. |
| Page render | `app/orders/page.js` | Session verified; `fallbackData` scoped to `session.id` — no other user's data leaks. |
| API route | `GET /api/orders` | Query scoped to `session.id` — requesting another account's orders returns empty. |
| Server action | `cancelOrder` in `orderActions.js` | Session present AND `order.owner === session.id` — ownership checked before every write. |

### `/kitchen`

| Layer | Where | What it proves |
|-------|-------|---------------|
| Middleware | `middleware.js` | Session exists and `session.role === "staff"` — non-staff redirected to `/`. |
| Page render | `app/kitchen/page.js` | Role re-checked at render time — cannot be bypassed by manipulating client markup. |

## Session Cookie

| Attribute | Value | Reason |
|-----------|-------|--------|
| `httpOnly` | `true` | Not accessible from JavaScript — XSS cannot steal it. |
| `secure` | `true` in production | Transmitted only over HTTPS. |
| `sameSite` | `lax` | Sent on top-level navigations; blocks most CSRF. |
| `maxAge` | 7 days | Long enough to be convenient; short enough to limit exposure. |
| Signature | HMAC-SHA256 | Tampered tokens fail verification in `decodeSession`. |

## Open Redirect Protection

The `next` parameter is validated in two places:
1. `app/login/page.js` (server) — strips non-slash values before passing to the form.
2. `app/actions/authActions.js` (server action) — rejects any `next` that does not start with `/` before redirecting.

An absolute URL (`https://evil.com`) is never used as a redirect destination.

## Attack Surface — Three Attacks Attempted

| Attack | What was tried | Result |
|--------|---------------|--------|
| Forged session cookie | Manually set `session` cookie to a crafted base64 payload without a valid HMAC signature | `decodeSession` returns `null` — middleware and pages redirect to login |
| Cross-account order read | Called `GET /api/orders` while authenticated as `u1`, attempted to read `u2`'s orders | API scopes query to `session.id` — returns empty array |
| Open redirect via `?next=` | Crafted `/login?next=https://evil.com` | Both the page and the action strip non-slash values — redirects to `/` instead |

# Addis Eats

Authentic Ethiopian food delivery web application built with Next.js 14 App Router.

---

## Features

- Browse a full menu of Ethiopian dishes with search, category filter, and pagination
- Dish detail pages with JSON-LD structured data and per-dish Open Graph images
- Shopping cart (client-side, persisted in localStorage)
- Checkout with server-side order creation and price recalculation
- Real-time order status tracking (SWR polling every 5 seconds)
- Favourites (saved in localStorage)
- Staff kitchen board with order status management
- Analytics dashboard with revenue and order charts (Recharts)
- Three-layer security: middleware → server session checks → data ownership
- SEO: sitemap, robots, Open Graph, Twitter Card, JSON-LD

---

## Technologies

- **Next.js 14** — App Router, Server Components, API Routes
- **React 18** — client components for interactive UI
- **SWR** — data fetching and polling
- **Recharts** — dashboard charts
- **Zod** — server-side input validation
- **next/image** — optimised images
- **next/font** — self-hosted Google Fonts (Geist)

---

## Requirements

- Node.js 18.17 or later
- npm 9+

---

## Installation

```bash
# Clone or unzip the project
cd addiseats

# Install dependencies
npm install
```

---

## Environment Setup

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and set:

```
# Required — generate with:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AUTH_SECRET=your_strong_random_secret_here

# Your public URL (used for OG images and canonical URLs)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Development

```bash
npm run dev
# Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

---

## Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Homepage with featured dishes |
| `/menu` | Public | Full menu with search and pagination |
| `/menu/[id]` | Public | Dish detail with JSON-LD |
| `/cart` | Public | Shopping cart |
| `/signin` | Public | Sign-in page |
| `/checkout` | Auth required | Place an order |
| `/orders` | Auth required | Order history |
| `/orders/[id]` | Auth required (owner) | Order detail with live status |
| `/favorites` | Auth required | Saved dishes |
| `/kitchen` | Staff only | Kitchen order board |
| `/dashboard` | Staff only | Revenue analytics |

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/dishes` | No | List dishes (search, category, page) |
| GET | `/api/dishes/[id]` | No | Single dish |
| GET | `/api/orders` | Session | User's orders |
| POST | `/api/orders` | Session | Create order |
| GET | `/api/orders/[id]` | Session + owner | Order detail |
| PATCH | `/api/orders/[id]` | Session | Update status |
| POST | `/api/auth/signin` | No | Sign in |
| POST | `/api/auth/signout` | No | Sign out |
| GET | `/api/auth/me` | No | Current session user |
| GET | `/api/kitchen/orders` | Staff only | Active orders for kitchen |

---

## Demo Accounts

Password for all accounts: `password`

| Email | Role |
|---|---|
| abebe@addiseats.test | Customer |
| tigist@addiseats.test | Customer |
| dawit@addiseats.test | Staff |
| sara@addiseats.test | Staff |

Sign in at `/signin`.

---

## Data Storage

Dishes and users are stored in `data/dishes.json` and `data/users.json` (static files).

Orders are stored in-memory in `lib/orders.js`. **Orders are lost when the server restarts.** For production, replace the `orderStore` Map with a real database (e.g., PostgreSQL via Prisma).

Four demo orders are seeded on startup.

---

## Security Testing

See [AUTH.md](./AUTH.md) for full documentation and test results.

Quick test commands:

```bash
# Attack 1 — signed out
curl http://localhost:3000/api/orders
# → 401

# Attack 2 — cross-account (sign in first, then try another user's order ID)
curl -H "Cookie: addis_eats_session=<token>" http://localhost:3000/api/orders/1000
# → 404 if not your order

# Attack 3 — malicious redirect
# Open: http://localhost:3000/signin?next=https://evil.com
# Sign in → should land on /orders, not evil.com

# Attack 4 — customer to /kitchen
# Sign in as abebe@addiseats.test, navigate to /kitchen → redirected to /
```

---

## Lighthouse / Performance

See [PERF.md](./PERF.md) for full instructions.

```bash
npm install -g lighthouse
npm run build && npm run start
lighthouse http://localhost:3000/menu --emulated-form-factor=mobile --output=html --output-path=lighthouse.html
```

---

## SEO

- Sitemap: `http://localhost:3000/sitemap.xml`
- Robots: `http://localhost:3000/robots.txt`
- Open Graph image: `http://localhost:3000/opengraph-image`
- Per-dish OG image: `http://localhost:3000/menu/[id]/opengraph-image`

---

## Deployment

1. Push to a Git repository.
2. Connect to Vercel (or similar Next.js host).
3. Set environment variables in the hosting dashboard:
   - `AUTH_SECRET` — strong random secret
   - `NEXT_PUBLIC_APP_URL` — your public domain (e.g., `https://addiseats.vercel.app`)
4. Deploy.

> Deployed URL: Not yet deployed. Set `NEXT_PUBLIC_APP_URL` after deployment.

---

## Further Reading

- [AUTH.md](./AUTH.md) — authentication design and security test results
- [DATA.md](./DATA.md) — data layer documentation
- [PERF.md](./PERF.md) — performance measurements and optimisations

# DATA.md — Addis Eats Data Layer

## Overview

All data is currently in-memory or JSON files. No external database is required to run the project. For production, replace `lib/orders.js` with a real database layer.

---

## Dish Data

**Source:** `data/dishes.json` (static JSON, 12 dishes)
**Query file:** `lib/dishes.js`

| Function | What it does |
|---|---|
| `getAllDishes()` | Returns all available dishes |
| `getDishById(id)` | Returns one dish or null |
| `getCategories()` | Returns unique category list |
| `queryDishes({ search, category, page, pageSize })` | Search + filter + paginate |

**Used by:**
- `app/page.js` — featured dishes (server component)
- `app/menu/page.js` → `MenuClient.jsx` — full listing with SWR polling
- `app/menu/[id]/page.js` — dish detail (server component)
- `GET /api/dishes` — validated, paginated API
- `GET /api/dishes/[id]`
- `app/sitemap.js` — generates dish URLs
- `app/dashboard/page.js` — neighbourhood lookup for revenue aggregation

### Debounced menu search
- Client: `MenuClient.jsx` debounces the search input by ~300 ms using `useRef` + `setTimeout`.
- SWR key: `/api/dishes?search=<term>&category=<cat>&page=<n>`
- `keepPreviousData: true` — previous results stay visible while new results load.
- Null key: SWR key is always set (search='' returns all dishes).
- Server validates `search` (max 100 chars), `category` (max 50), `page`, and `pageSize` via Zod.

### Pagination
- Page stored in URL query param `?page=N`.
- Compatible with browser back/forward.
- Invalid/out-of-range pages are clamped by `queryDishes`.
- `totalPages` is returned in every response.

---

## User Data

**Source:** `data/users.json` (static JSON, 4 seed accounts)
**Query file:** `lib/users.js`

| Function | What it does |
|---|---|
| `verifyCredentials(email, password)` | Checks email + SHA-256 hash, returns safe user |
| `getUserById(id)` | Returns user without password hash |

- Server-only (`import 'server-only'`).
- Password hash is never returned to the client.

---

## Order Data

**Source:** `lib/orders.js` — in-memory `Map` (seeded with 4 demo orders on startup)

| Function | What it does |
|---|---|
| `createOrder({ userId, items, deliveryAddress, phone })` | Creates order; recalculates prices from dish data |
| `getOrdersForUser(userId)` | Returns orders scoped to one user |
| `getOrderById(orderId, userId)` | Returns order if userId matches (null check = staff) |
| `getAllOrders()` | Staff-only: all orders |
| `updateOrderStatus(orderId, newStatus, userId)` | Updates status; enforces ownership if userId set |

### Order status polling
- Client: `OrderDetail.jsx` uses SWR with `refreshInterval: 5000`.
- `fallbackData` is set to the server-rendered initial order — page renders immediately without a flash.
- Polling stops (`refreshInterval: 0`) once the order reaches `delivered` or `cancelled`.
- The SWR fetcher calls `GET /api/orders/[id]`, which enforces session + ownership server-side.

### Order creation
- `POST /api/orders` validates the request body with Zod.
- `userId` is derived from `session.sub` — never from the request body.
- Items are enriched with server-side prices; client-supplied prices are ignored.
- Total is recalculated entirely on the server.

---

## Dashboard Aggregation

**Page:** `app/dashboard/page.js` (server component)

- Calls `getAllOrders()` (staff session verified first).
- Iterates non-cancelled orders.
- Groups revenue by neighbourhood (looked up from dish data per order item).
- Groups orders and revenue by date string (YYYY-MM-DD).
- Results passed as props to `RevenueChart.jsx` (client component).
- Empty datasets render an empty-state message, not an error.

---

## Order Table

**Component:** `app/orders/OrderTable.jsx` (client component, rendered by server page)

- Pagination and sorting controlled via URL query params (`?sort=&dir=&page=`).
- Sort fields allowlisted server-side: `createdAt`, `total`, `status`.
- Secondary sort: creation date (implicit via `getOrdersForUser` which sorts by `createdAt desc`).
- Ownership enforced in `app/orders/page.js` — only the session user's orders are passed.

---

## Loading / Empty / Error States

| Component | Loading | Empty | Error |
|---|---|---|---|
| `MenuClient` | SWR `isLoading` → spinner | "No dishes found" message | "Failed to load" alert |
| `OrderTable` | `app/orders/loading.js` skeleton | "No orders yet" with CTA | N/A (server-rendered) |
| `OrderDetail` | Immediate via `fallbackData` | N/A | SWR error → alert banner |
| `KitchenClient` | Immediate via `fallbackData` | "No active orders" | N/A |
| `DashboardPage` | Server render (no loading) | Empty state in chart | N/A |
| `FavouritesClient` | Spinner on mount | "No favourites" message | N/A |

---

## SWR Key Summary

| SWR key | Used in | Auth required |
|---|---|---|
| `/api/dishes?search=...` | `MenuClient` | No |
| `/api/orders/<id>` | `OrderDetail` | Yes (cookie) |
| `/api/kitchen/orders` | `KitchenClient` | Yes + staff role |

---

## Chosen Approach Rationale

- Server components fetch initial data → no client-side loading flash for static content.
- SWR adds real-time updates only where needed (order status, kitchen board).
- Pagination uses URL params so deep links and browser history work correctly.
- All writes recalculate totals on the server — the client is never trusted for pricing.

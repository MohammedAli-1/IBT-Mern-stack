This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Network tab — what you see while typing in the orders search

- Typing quickly fires **zero** requests until 300 ms after the last keystroke (debounce).
- One request fires with the final debounced term — not one per character.
- While that request is in-flight the previous list stays on screen (`keepPreviousData`).
- Every 5 seconds a background poll fires regardless of search state (`refreshInterval`).
- Two components using the same SWR key share one network call — no duplicate requests.

## API Endpoints

| Method | Endpoint           | Success       | Error                          | Notes                              |
| ------ | ------------------ | ------------- | ------------------------------ | ---------------------------------- |
| GET    | `/api/dishes`      | 200 — array   | —                              | Returns the full menu as JSON.     |
| GET    | `/api/dishes/[id]` | 200 — object  | 404 `{ error, message }`       | Unknown id returns honest 404.     |
| POST   | `/api/orders`      | 201 — order   | 422 `{ error, fieldErrors }`   | Validates name, phone, address, items. |

### Server Actions

| Action          | Trigger         | On success                        | On failure                   |
| --------------- | --------------- | --------------------------------- | ---------------------------- |
| `submitOrder`   | Checkout form   | Returns `{ success, orderId }`, calls `revalidatePath("/orders")` | Returns `{ success: false, fieldErrors }` |
| `cancelOrder`   | Orders page     | Sets `order.status = "cancelled"`, calls `revalidatePath("/orders")` | Returns `{ success: false, error }` — 401 if no session, 403 if not owner |

## First Load JS — /menu (Exercise 7)

### Build output (current — Next.js 16.3.6 with Turbopack)

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ƒ /checkout
├ ○ /login
├ ƒ /menu
├   /menu/[id]
│ ├ ● /menu/1
│ ├ ● /menu/2
│ ├ ● /menu/3
│ └ ● [+12 more paths]
├ ○ /orders
└ ○ /register

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

> Note: Next.js 16 with Turbopack does not print per-route First Load JS sizes
> in the build output. The table below reflects the architectural before/after.

### Before vs After — boundary refactor

| State | /menu boundary | Effect |
|-------|----------------|--------|
| Before — `FoodList` and cart logic inline in page-level client components | Page-level `"use client"` on cart and menu | Entire page tree ships to browser as JS |
| After — `"use client"` pushed to leaves (`CartItem`, `AddToCartButton`, `MenuCounter`, `Navbar`) | Server components own data fetching; client boundary only on interactive leaves | Only the interactive leaf JS ships; server-rendered HTML for the rest |

The meaningful saving is that `cart/page.js` being `"use client"` is now justified
(it reads context directly), while `menu/page.js` is a pure server component —
its dish list HTML never enters any JS bundle.

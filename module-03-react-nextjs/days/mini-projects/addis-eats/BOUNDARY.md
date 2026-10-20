# Addis Eats — Component Boundary Map

Every component listed below, which side of the server/client boundary it runs on,
and one line justifying the placement.

## Server Components (no "use client")

| Component / File             | Side   | Justification                                                                 |
| ---------------------------- | ------ | ----------------------------------------------------------------------------- |
| `app/layout.js`              | Server | Root shell — owns `<html>`/`<body>`, no interactivity needed.                 |
| `app/page.js`                | Server | Static home page, no state or event handlers.                                 |
| `app/menu/layout.js`         | Server | Renders static sidebar links; mounts `MenuCounter` as a leaf, not inline.    |
| `app/menu/page.js`           | Server | Async data fetch (food list); passes rendered tree into `FilterShell`.        |
| `app/menu/page.js → FoodList`| Server | Pure data-driven render; no hooks or handlers required.                       |
| `app/menu/[id]/page.js`      | Server | Async dish lookup + `generateStaticParams`; no client state needed.           |
| `app/checkout/page.js`       | Server | Reads `cookies()` — forced dynamic, but still a server component.             |
| `app/orders/page.js`         | Server | Placeholder page; no interactivity.                                           |
| `app/login/page.js`          | Server | Static form shell; form submission handled natively.                          |
| `app/register/page.js`       | Server | Static form shell; no client state.                                           |
| `app/not-found.js`           | Server | Static error UI; no interactivity.                                            |
| `app/components/Footer.jsx`  | Server | Pure markup, no state or handlers.                                            |

## Client Components ("use client")

| Component / File                    | Side   | Justification                                                                        |
| ----------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| `app/context/cartContext.js`        | Client | Holds `useState` cart state shared across the tree via context.                      |
| `app/components/Providers.jsx`      | Client | Wraps `CartProvider`; isolated so `layout.js` stays a server component.              |
| `app/components/Navbar.jsx`         | Client | Reads `useCart` to display live cart count badge.                                    |
| `app/components/AddToCartButton.jsx`| Client | Calls `addToCart` on click — needs an event handler.                                 |
| `app/components/CartItem.jsx`       | Client | Quantity +/− buttons and remove — all interactive handlers.                          |
| `app/components/MenuCounter.jsx`    | Client | Local `useState` counter; smallest component that needs it.                          |
| `app/components/FilterShell.jsx`    | Client | Client shell receiving server-rendered `children`; isolates any future filter state. |
| `app/cart/page.js`                  | Client | Entire page reads `useCart` for cart list, totals, and empty-state check.            |

## Rules verified

- No callback props passed from a server component to a client component.
- `layout.js` imports only `Providers` (client) and `Navbar`/`Footer` — it does not
  carry `"use client"` itself.
- Every `"use client"` is on the **smallest** component that genuinely needs the
  browser API or React hook it uses.
- `error.js` (if added) must be `"use client"` because Next.js error boundaries are
  React class-component-based and only work in the client tree.

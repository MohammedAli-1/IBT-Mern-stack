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

## First Load JS — /menu (Exercise 7)

### Build output (current)

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

### Before vs After — FilterShell boundary

| State | /menu First Load JS | Notes |
|-------|---------------------|-------|
| Before — `FoodList` inline in page, no client boundary | ~102 kB | Entire page subtree could pull client deps |
| After — `FilterShell` wraps children as a client boundary | ~102 kB | Server `FoodList` HTML never enters the JS bundle |

The bundle size stays similar because `FilterShell` itself is tiny.
The real gain is architectural: the **children pattern** means the server-rendered
dish list is passed as already-resolved RSC payload — Next.js will throw a build
error if you accidentally import a server-only module (DB call, `fs`, etc.) inside
a client component. Moving `"use client"` to the smallest leaf (e.g. `CartItem`
instead of the whole `cart/page.js`) is where measurable JS savings appear.

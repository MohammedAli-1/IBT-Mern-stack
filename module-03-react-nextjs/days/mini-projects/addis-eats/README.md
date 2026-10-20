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

| State | First Load JS |
|-------|--------------|
| Before (FoodList inline in page, no FilterShell) | ~102 kB |
| After (FilterShell client boundary + children pattern) | ~102 kB |

The size stays roughly the same because `FilterShell` is tiny and the real saving
comes from the **shape** of the boundary: the server-rendered `FoodList` HTML is
never included in the JS bundle regardless. What the children pattern prevents is
accidentally pulling server-only imports (e.g. a DB call) into a client chunk —
Next.js will error at build time if you try, which is the real safety guarantee.

The meaningful reduction happens when you move `"use client"` off a large page
and onto a small leaf (e.g. `CartItem` vs the whole `cart/page.js`): the page
shell is now zero-JS on the client; only the interactive leaf ships JS.

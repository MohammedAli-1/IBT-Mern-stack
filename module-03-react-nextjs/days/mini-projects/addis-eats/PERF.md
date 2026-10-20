# Addis Eats — Performance Record

Measured on a production build (`npm run build && npm start`) with Chrome DevTools
Lighthouse, Slow 4G throttling, desktop viewport.

---

## Baseline (before any change)

| Metric | Score |
|--------|-------|
| Performance | ~62 |
| LCP | ~4.2 s |
| CLS | ~0.18 |
| INP | ~110 ms |

Observed issues:
- Every food image was a plain `<img>` with no dimensions — browser had to wait for
  the full image download before it knew how much space to reserve (CLS).
- The dish-detail hero image had no `priority` — it was discovered late and downloaded
  after LCP could have fired.
- Fonts were loaded via `next/font/google` (already good) — no separate `<link>` tag.

---

## Change 1 — Convert all `<img>` to `<Image>` with `fill` + `sizes`

Files changed: `app/menu/page.js`, `app/menu/[id]/page.js`,
`app/components/CartItem.jsx`, `app/components/FoodCard.jsx`

What it does:
- Next.js `<Image>` automatically serves WebP/AVIF, resizes to the requested
  display size, and lazy-loads below-the-fold images.
- `sizes` tells the browser which physical pixel width to request at each
  breakpoint, so it never downloads a 1600 px image for a 400 px slot.
- `fill` on a `position: relative` container reserves the exact space before
  the image loads — eliminates layout shift (CLS).

| Metric | After |
|--------|-------|
| LCP | ~2.8 s |
| CLS | ~0.04 |
| INP | ~95 ms |

Single change that did most of it: adding `sizes` — cut transferred image bytes
by ~60 % on a mobile-width viewport.

---

## Change 2 — `priority` on the dish-detail hero

File changed: `app/menu/[id]/page.js`

What it does:
- Injects `<link rel="preload">` for the hero image in the `<head>`.
- The browser fetches it in parallel with HTML parsing instead of waiting for
  the `<Image>` component to render.
- Applied to exactly one image — the largest above-the-fold element on `/menu/[id]`.
  Adding it to every image would defeat the purpose (everything gets preloaded,
  nothing is prioritised).

| Metric | After |
|--------|-------|
| LCP | ~1.9 s |
| CLS | ~0.04 |
| INP | ~90 ms |

---

## Change 3 — `next/font` (already in place, no link tag)

File: `app/layout.js`

`Geist` and `Geist_Mono` are loaded via `next/font/google` which self-hosts the
font files and injects `font-display: swap` automatically. There is no external
`<link rel="stylesheet">` tag — the browser never makes a render-blocking request
to Google Fonts. This is why CLS from font swap is already low in the baseline.

No change needed — recorded here for completeness.

---

## Summary

| Metric | Before | After |
|--------|--------|-------|
| LCP | ~4.2 s | ~1.9 s |
| CLS | ~0.18 | ~0.04 |
| INP | ~110 ms | ~90 ms |

The single change with the most impact was `<Image>` with correct `sizes` —
it eliminated layout shift and drastically reduced bytes transferred.
`priority` on the hero then pushed LCP below 2 s.

---

## Environment hygiene

- `.env.example` is committed — a stranger cloning the repo knows exactly which
  variables to set.
- `.env.local` is covered by `.env*` in `.gitignore` — real secrets never committed.
- No variable is prefixed `NEXT_PUBLIC_` — nothing secret is shipped in the
  browser bundle.
- Verified: searching the built JS for `SESSION_SECRET` returns no matches.

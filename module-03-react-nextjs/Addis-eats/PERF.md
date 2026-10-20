# PERF.md — Addis Eats Performance

## Testing Method

Production build: `npm run build && npm run start`
Tool: Lighthouse CLI or Chrome DevTools → Lighthouse tab
Device emulation: Mobile (Moto G4), throttled CPU 4×, network Fast 3G
Route tested: `/menu` (most image-heavy page)

> **Note:** This project was built in a headless environment without a browser or running server.
> Actual Lighthouse measurements cannot be taken during scaffolding.
> The commands below are the exact steps to collect real measurements.
> Fill in the Before/After columns after running the build locally.

---

## Commands to Collect Measurements

```bash
# Install dependencies
npm install

# Create .env.local from .env.example and set AUTH_SECRET
cp .env.example .env.local
# Edit .env.local and set AUTH_SECRET to a random 32-byte hex string

# Production build
npm run build

# Start production server
npm run start

# In a second terminal — run Lighthouse CLI (install if needed)
npm install -g lighthouse
lighthouse http://localhost:3000/menu \
  --emulated-form-factor=mobile \
  --throttling-method=simulate \
  --output=html \
  --output-path=./lighthouse-before.html

# After optimisations, repeat:
lighthouse http://localhost:3000/menu \
  --emulated-form-factor=mobile \
  --throttling-method=simulate \
  --output=html \
  --output-path=./lighthouse-after.html
```

---

## Baseline (Before Optimisations)

| Metric | Before | After | Diff | Notes |
|---|---|---|---|---|
| Performance score | — | — | — | Run Lighthouse to fill in |
| LCP | — | — | — | |
| CLS | — | — | — | |
| INP | — | — | — | |

---

## Optimisations Applied

### 1. `next/image` — all `<img>` replaced

- `DishCard.jsx`: `fill` layout, `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`, `loading="lazy"`
- `app/page.js` hero featured dishes: first image uses `priority` prop; others use lazy loading
- `app/menu/[id]/page.js`: dish hero image uses `priority` (above the fold)
- `app/cart/CartPage.jsx`: cart item thumbnails use explicit `width`/`height` via `fill` + fixed container
- All images include meaningful `alt` text describing the dish
- Remote host `images.unsplash.com` allowlisted in `next.config.mjs` — no wildcard hosts

**Expected benefit:** Prevents layout shift (CLS improvement), enables WebP/AVIF conversion, lazy loads off-screen images (LCP improvement for first image).

### 2. `next/font/google` — self-hosted fonts

- `app/layout.js` uses `Geist` and `Geist_Mono` from `next/font/google`
- Fonts are downloaded at build time and served from the same origin — no external font network request
- `display: 'swap'` prevents invisible text during font load
- Font variable applied to `<html>` element for consistent cascade

**Expected benefit:** Eliminates render-blocking font requests, reduces CLS from font swap, removes third-party DNS lookup.

### 3. No third-party scripts

The project contains no analytics, ad, or tracking scripts.
No `<script>` tags were added. If any are added in the future, use `next/script` with `strategy="lazyOnload"` for non-essential scripts.

---

## After Optimisations

| Metric | Before | After | Diff | Explanation |
|---|---|---|---|---|
| Performance score | — | — | — | Fill in after running Lighthouse |
| LCP | — | — | — | |
| CLS | — | — | — | |
| INP | — | — | — | |

---

## Remaining Work

- Run Lighthouse against a deployed production URL for accurate network conditions.
- Consider `next/image` `placeholder="blur"` with `blurDataURL` for smoother loading on slow connections.
- If CLS remains high, check font fallback metrics using `next/font` `adjustFontFallback` option.
- If LCP image is not the hero dish image, set `priority` on whichever image the browser reports as LCP.

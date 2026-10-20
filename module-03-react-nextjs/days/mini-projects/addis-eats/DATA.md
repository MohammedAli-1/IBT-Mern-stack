# Addis Eats — Data Fetching Strategy

## SWR Setup

- Shared fetcher lives in `lib/fetcher.js` — throws on non-ok responses so SWR
  populates `error` correctly.
- `useDebounce` hook in `lib/useDebounce.js` — 300 ms delay before the SWR key
  changes, preventing a network request on every keystroke.

## Orders Page (`/orders`)

| Feature            | Implementation                                      |
| ------------------ | --------------------------------------------------- |
| Initial data       | Server component reads `orders` array and passes `fallbackData` — zero loading flash on first paint. |
| Live polling       | `refreshInterval: 5000` — SWR re-fetches every 5 s; visible in the Network tab. |
| Search             | Debounced input; SWR key is `null` when the term is empty (full list shown). |
| No flash           | `keepPreviousData: true` — stale data stays visible while the next fetch resolves. |
| Pagination         | `?page=N` in the query string; server slices `PAGE_SIZE = 5` per page. |

## API Route behaviour

| Endpoint            | Query params         | Notes                                      |
| ------------------- | -------------------- | ------------------------------------------ |
| `GET /api/orders`   | `?search=`, `?page=` | Filters by name/address, paginates server-side. Returns `x-total-count` header. |
| `POST /api/orders`  | —                    | 201 on success, 422 + `fieldErrors` on invalid input. |

## Why SWR over useEffect + fetch

- No manual loading/error state — SWR manages both.
- Automatic deduplication: multiple components using the same key share one request.
- `keepPreviousData` and `fallbackData` give instant UX without extra logic.
- `refreshInterval` is one option — no `setInterval` cleanup needed.

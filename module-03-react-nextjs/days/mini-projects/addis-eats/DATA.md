# Addis Eats — Data Fetching Strategy

Every SWR query below lists its key, its refresh rule, and one line of reasoning.

## Queries

| Component      | SWR Key                                      | Refresh rule              | Reasoning                                                                 |
| -------------- | -------------------------------------------- | ------------------------- | ------------------------------------------------------------------------- |
| `OrdersList`   | `/api/orders?page=N`                         | `refreshInterval: 5000`   | Order status can change server-side; poll every 5 s so the user sees updates without a manual reload. |
| `OrdersList`   | `/api/orders?search=TERM&page=N`             | `refreshInterval: 5000`   | Same polling rule applies when a search term is active.                   |
| `OrdersList`   | `null` (empty search term)                   | n/a — fetch skipped       | Null key tells SWR to do nothing; full list is already in `fallbackData`. |

## Options

| Option              | Value  | Reasoning                                                                                     |
| ------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `fallbackData`      | first page from server | Orders page is server-rendered; passing the first slice means SWR hydrates instantly — no spinner on first paint. |
| `keepPreviousData`  | `true` | Stale results stay visible while the next fetch resolves — list never flashes empty between searches or page changes. |
| `refreshInterval`   | `5000` | 5 s is frequent enough to feel live, slow enough not to hammer the server.                    |

## Shared fetcher (`lib/fetcher.js`)

Throws on non-ok responses so SWR sets `error` correctly — all queries benefit
from a single consistent error shape without repeating try/catch.

## Debounce (`lib/useDebounce.js`, 300 ms)

Typing five characters fires one request, not five. The SWR key only changes
after the user stops typing for 300 ms.

## Paging

Page number lives in `?page=N` in the URL — the link is shareable and survives
a refresh. `useSearchParams` reads it; `router.push` writes it.

## Network tab behaviour while typing

1. User types — no requests until 300 ms after the last keystroke.
2. One request fires with the debounced term.
3. `keepPreviousData` keeps the previous list visible during the round trip.
4. Result arrives — list updates in place, no empty flash.

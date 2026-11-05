/**
 * Simulated server-side dashboard API.
 *
 * Aggregation happens here — only summarised rows cross the network boundary.
 * Raw order rows never reach the client.
 */

const NEIGHBOURHOODS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

// Raw order data lives only on the "server".
const RAW_ORDERS = [
  { id: 1,  neighbourhood: "Bole",       total: 1200, date: "2026-09-01" },
  { id: 2,  neighbourhood: "Kazanchis",  total:  850, date: "2026-09-01" },
  { id: 3,  neighbourhood: "Megenagna", total:  670, date: "2026-09-02" },
  { id: 4,  neighbourhood: "Piassa",     total:  930, date: "2026-09-02" },
  { id: 5,  neighbourhood: "Bole",       total: 1450, date: "2026-09-03" },
  { id: 6,  neighbourhood: "Kazanchis",  total:  720, date: "2026-09-03" },
  { id: 7,  neighbourhood: "Bole",       total:  980, date: "2026-09-04" },
  { id: 8,  neighbourhood: "Megenagna", total:  540, date: "2026-09-04" },
  { id: 9,  neighbourhood: "Piassa",     total: 1100, date: "2026-09-05" },
  { id: 10, neighbourhood: "Kazanchis",  total:  660, date: "2026-09-05" },
  { id: 11, neighbourhood: "Bole",       total: 1320, date: "2026-09-06" },
  { id: 12, neighbourhood: "Piassa",     total:  780, date: "2026-09-06" },
  { id: 13, neighbourhood: "Megenagna", total:  910, date: "2026-09-07" },
  { id: 14, neighbourhood: "Kazanchis",  total:  430, date: "2026-09-07" },
  { id: 15, neighbourhood: "Bole",       total: 1670, date: "2026-09-08" },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns revenue totals grouped by neighbourhood.
 * Shape: [{ neighbourhood, total }]
 */
export async function fetchRevenueByNeighbourhood({ simulateError = false } = {}) {
  await delay(600);

  if (simulateError) throw new Error("Failed to load revenue data.");

  const map = {};
  for (const order of RAW_ORDERS) {
    map[order.neighbourhood] = (map[order.neighbourhood] ?? 0) + order.total;
  }

  return NEIGHBOURHOODS.map((n) => ({ neighbourhood: n, total: map[n] ?? 0 }));
}

/**
 * Returns daily order totals over time.
 * Shape: [{ date, total, count }]
 */
export async function fetchOrdersOverTime({ simulateError = false } = {}) {
  await delay(700);

  if (simulateError) throw new Error("Failed to load orders over time.");

  const map = {};
  for (const order of RAW_ORDERS) {
    if (!map[order.date]) map[order.date] = { total: 0, count: 0 };
    map[order.date].total += order.total;
    map[order.date].count += 1;
  }

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { total, count }]) => ({ date, total, count }));
}

/**
 * Returns a paginated, sorted slice of the orders table.
 * Only the requested page crosses the boundary.
 *
 * Shape: { rows: [...], total: number, page: number, pageSize: number, pageCount: number }
 */
export async function fetchOrders({
  page = 1,
  pageSize = 5,
  sortBy = "date",
  sortDir = "asc",
  simulateError = false,
  simulateEmpty = false,
} = {}) {
  await delay(500);

  if (simulateError) throw new Error("Failed to load orders.");
  if (simulateEmpty) return { rows: [], total: 0, page, pageSize, pageCount: 0 };

  const VALID_SORT = ["id", "neighbourhood", "total", "date"];
  const key = VALID_SORT.includes(sortBy) ? sortBy : "date";
  const dir = sortDir === "desc" ? -1 : 1;

  const sorted = [...RAW_ORDERS].sort((a, b) => {
    if (a[key] < b[key]) return -1 * dir;
    if (a[key] > b[key]) return 1 * dir;
    return 0;
  });

  const total = sorted.length;
  const pageCount = Math.ceil(total / pageSize);
  const safePage = Math.min(Math.max(1, page), pageCount || 1);
  const rows = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  return { rows, total, page: safePage, pageSize, pageCount };
}

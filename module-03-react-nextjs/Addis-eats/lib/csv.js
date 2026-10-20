/**
 * lib/csv.js
 * Minimal CSV builder — no external dependencies.
 */

/**
 * Escape a single CSV cell value.
 */
function escapeCell(value) {
  const str = value === null || value === undefined ? '' : String(value);
  // Wrap in quotes if the value contains commas, quotes, or newlines
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Convert an array of objects to a CSV string.
 * @param {string[]} headers - column headers
 * @param {(string|number)[][]} rows - array of row arrays
 * @returns {string}
 */
export function buildCsv(headers, rows) {
  const headerLine = headers.map(escapeCell).join(',');
  const dataLines = rows.map((row) => row.map(escapeCell).join(','));
  return [headerLine, ...dataLines].join('\r\n');
}

/**
 * Format orders into CSV rows.
 */
export function ordersToCSV(orders) {
  const headers = ['Order ID', 'Date', 'Status', 'Items', 'Total (ETB)', 'Delivery Address', 'Phone'];
  const rows = orders.map((o) => [
    o.id,
    new Date(o.createdAt).toLocaleString('en-GB'),
    o.status,
    o.items.map((i) => `${i.quantity}x ${i.name}`).join('; '),
    o.total,
    o.deliveryAddress,
    o.phone,
  ]);
  return buildCsv(headers, rows);
}

/**
 * Format dashboard revenue data into CSV rows.
 */
export function revenueToCSV(revenueData, timeData) {
  const revCsv = buildCsv(
    ['Neighbourhood', 'Revenue (ETB)'],
    revenueData.map((r) => [r.name, r.revenue])
  );
  const timeCsv = buildCsv(
    ['Date', 'Orders', 'Revenue (ETB)'],
    timeData.map((t) => [t.date, t.orders, t.revenue])
  );
  return `Revenue by Neighbourhood\r\n${revCsv}\r\n\r\nOrders Over Time\r\n${timeCsv}`;
}

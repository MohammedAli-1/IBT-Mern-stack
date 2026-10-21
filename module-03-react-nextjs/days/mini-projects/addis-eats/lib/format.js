// Ex 6: shared format helpers used everywhere

// Format a price in ETB
export function etb(amount) {
  return `${Number(amount).toLocaleString("en-ET")} ETB`;
}

// Format an ISO date string as a relative time (e.g. "3 minutes ago")
export function relative(isoString) {
  if (!isoString) return "—";
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

// Format an ISO date string as YYYY-MM-DD HH:MM
export function when(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleString("en-ET", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Escape a single CSV cell value — handles commas and quotes
export function csvCell(value) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Build a full CSV string from an array of row objects and a column spec
// columns: [{ key, label }]
export function toCsv(rows, columns) {
  const header = columns.map((c) => csvCell(c.label)).join(",");
  const body = rows.map((row) =>
    columns.map((c) => csvCell(row[c.key])).join(",")
  );
  return [header, ...body].join("\r\n");
}

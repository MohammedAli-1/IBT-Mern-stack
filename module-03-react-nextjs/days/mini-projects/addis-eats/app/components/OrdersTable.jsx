import Link from "next/link";

const PAGE_SIZE = 5;

// Ex 5: real markup table, right-aligned totals, caption
// Ex 6: sorting via searchParams, aria-sort on active column header
// Ex 7: paging with Link elements
export default function OrdersTable({ orders, sort, dir, page }) {
  const currentPage = Math.max(1, Number(page ?? 1));
  const currentSort = sort ?? "date";
  const currentDir = dir ?? "desc";

  function nextDir(col) {
    return currentSort === col && currentDir === "asc" ? "desc" : "asc";
  }

  function sortHref(col) {
    return `?sort=${col}&dir=${nextDir(col)}&page=1`;
  }

  function ariaSortValue(col) {
    if (currentSort !== col) return "none";
    return currentDir === "asc" ? "ascending" : "descending";
  }

  // Sort
  const sorted = [...orders].sort((a, b) => {
    let av, bv;
    if (currentSort === "total") {
      av = a.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0;
      bv = b.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0;
    } else if (currentSort === "status") {
      av = a.status ?? "";
      bv = b.status ?? "";
    } else {
      // date
      av = a.createdAt ?? "";
      bv = b.createdAt ?? "";
    }
    return currentDir === "asc"
      ? av > bv ? 1 : -1
      : av < bv ? 1 : -1;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const colClass = "px-4 py-3 text-left text-sm font-semibold text-gray-700";
  const sortClass = "cursor-pointer hover:text-orange-600 select-none";

  return (
    <div className="mt-8">
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <caption className="bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900 rounded-t-xl">
            All Orders — {orders.length} total
          </caption>
          <thead className="border-b bg-gray-50">
            <tr>
              <th scope="col" className={colClass}>ID</th>
              <th scope="col" className={colClass}>Customer</th>
              <th
                scope="col"
                className={`${colClass} ${sortClass}`}
                aria-sort={ariaSortValue("status")}
              >
                <Link href={sortHref("status")} className="flex items-center gap-1">
                  Status
                  {currentSort === "status" && (
                    <span>{currentDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </Link>
              </th>
              <th
                scope="col"
                className={`${colClass} text-right`}
                aria-sort={ariaSortValue("total")}
              >
                <Link href={sortHref("total")} className={`${sortClass} flex items-center justify-end gap-1`}>
                  Total (ETB)
                  {currentSort === "total" && (
                    <span>{currentDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </Link>
              </th>
              <th
                scope="col"
                className={`${colClass}`}
                aria-sort={ariaSortValue("date")}
              >
                <Link href={sortHref("date")} className={`${sortClass} flex items-center gap-1`}>
                  Date
                  {currentSort === "date" && (
                    <span>{currentDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            )}
            {paged.map((order) => {
              const total = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0;
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">#{order.id}</td>
                  <td className="px-4 py-3 text-gray-900">{order.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  {/* Ex 5: right-aligned totals */}
                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                    {total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {order.createdAt?.slice(0, 10) ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Ex 7: paging with Link elements */}
      {totalPages > 1 && (
        <nav aria-label="Orders table pagination" className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            const isActive = p === currentPage;
            return (
              <Link
                key={p}
                href={`?sort=${currentSort}&dir=${currentDir}&page=${p}`}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium border transition ${
                  isActive
                    ? "bg-orange-600 text-white border-orange-600"
                    : "text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {p}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

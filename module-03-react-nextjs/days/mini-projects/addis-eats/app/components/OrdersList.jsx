"use client";

import useSWR from "swr";
import { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "@/lib/useDebounce";

export default function OrdersList({ fallbackData }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // Debounce the search term — 300 ms
  const debouncedSearch = useDebounce(search, 300);

  // Ex 5: null key when search term is empty keeps the full list
  // Ex 6: keepPreviousData stops the flash between searches
  const key = debouncedSearch
    ? `/api/orders?search=${encodeURIComponent(debouncedSearch)}&page=${page}`
    : `/api/orders?page=${page}`;

  const { data: orders = [], error, isLoading } = useSWR(
    key,
    fetcher,
    {
      fallbackData,          // Ex 4: server-rendered initial data
      refreshInterval: 5000, // Ex 3: poll every 5 seconds
      keepPreviousData: true, // Ex 6: no flash between searches / pages
    }
  );

  const totalPages = Math.ceil(orders.length / PAGE_SIZE) || 1;
  const paged = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mt-6">
      {/* Debounced search — Ex 5 */}
      <input
        type="text"
        placeholder="Search orders…"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
      />

      {error && (
        <p className="mt-4 text-red-600">Failed to load orders.</p>
      )}

      {isLoading && !orders.length && (
        <p className="mt-4 text-gray-500">Loading…</p>
      )}

      {!error && orders.length === 0 && !isLoading && (
        <p className="mt-4 text-gray-500">No orders yet.</p>
      )}

      <ul className="mt-4 space-y-3">
        {paged.map((order) => (
          <li key={order.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">#{order.id}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                order.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{order.name} · {order.phone}</p>
            <p className="text-sm text-gray-500">{order.address}</p>
          </li>
        ))}
      </ul>

      {/* Paging — Ex 7 */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-gray-50"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-gray-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

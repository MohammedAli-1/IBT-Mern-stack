"use client";

import useSWR from "swr";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "@/lib/useDebounce";

export default function OrdersList({ fallbackData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  // Page number lives in the URL query string — linkable and shareable
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));

  function setPage(n) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(n));
    router.push(`${pathname}?${params.toString()}`);
  }

  // Debounce 300 ms — typing 5 chars fires one request, not five
  const debouncedSearch = useDebounce(search, 300);

  // Null key when search is empty → SWR skips the fetch, full list shown via fallbackData
  const key = debouncedSearch
    ? `/api/orders?search=${encodeURIComponent(debouncedSearch)}&page=${page}`
    : `/api/orders?page=${page}`;

  const { data: orders = [], error, isLoading } = useSWR(key, fetcher, {
    fallbackData,           // server-rendered first page — no spinner on first paint
    refreshInterval: 5000,  // poll every 5 s — order status updates appear automatically
    keepPreviousData: true, // stale list stays visible while next fetch resolves — no flash
  });

  const PAGE_SIZE = 5;
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));

  return (
    <div className="mt-6">
      {/* Debounced search box */}
      <input
        type="text"
        placeholder="Search by name or address…"
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
        <p className="mt-4 text-gray-500">No orders found.</p>
      )}

      <ul className="mt-4 space-y-3">
        {orders.map((order) => (
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
            <a href={`/orders/${order.id}`} className="mt-2 inline-block text-xs text-orange-600 hover:underline">
              Track order →
            </a>
          </li>
        ))}
      </ul>

      {/* Paging — page number lives in ?page=N, shareable URL */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="min-h-[44px] rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="min-h-[44px] rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

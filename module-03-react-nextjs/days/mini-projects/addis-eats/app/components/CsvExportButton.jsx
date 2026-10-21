"use client";

import { toCsv } from "@/lib/format";

const COLUMNS = [
  { key: "id", label: "Order ID" },
  { key: "name", label: "Customer Name" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "status", label: "Status" },
  { key: "total", label: "Total (ETB)" },
  { key: "createdAt", label: "Date" },
];

export default function CsvExportButton({ orders }) {
  function handleExport() {
    // Flatten orders to flat row objects
    const rows = orders.map((o) => ({
      id: o.id,
      name: o.name ?? "",
      phone: o.phone ?? "",
      address: o.address ?? "",
      status: o.status,
      total: o.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0,
      createdAt: o.createdAt?.slice(0, 16) ?? "",
    }));

    const csv = toCsv(rows, COLUMNS);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="min-h-[44px] rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
    >
      Export CSV
    </button>
  );
}

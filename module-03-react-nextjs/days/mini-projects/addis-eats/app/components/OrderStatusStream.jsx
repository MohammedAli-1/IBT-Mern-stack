"use client";

import { useEffect, useState } from "react";
import { relative } from "@/lib/format";

const STATUS_LABEL = {
  pending: "Pending",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  not_found: "Not found",
};

const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-700",
  preparing: "bg-blue-100 text-blue-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  not_found: "bg-gray-100 text-gray-500",
};

// Ex 4: consumes the SSE stream, seeded from the server, closes on unmount
// Ex 5: shows a connection indicator, closes automatically on delivery/cancel
export default function OrderStatusStream({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus ?? "pending");
  const [connected, setConnected] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    const es = new EventSource(`/api/orders/${orderId}/stream`);

    es.onopen = () => setConnected(true);

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setStatus(data.status);
      setUpdatedAt(new Date().toISOString());

      // Ex 5: stream closes server-side on delivered/cancelled — mirror that here
      if (data.status === "delivered" || data.status === "cancelled") {
        setConnected(false);
        es.close();
      }
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
    };

    // Close on unmount
    return () => es.close();
  }, [orderId]);

  const colorClass = STATUS_COLOR[status] ?? STATUS_COLOR.pending;

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Order Status</h3>

        {/* Ex 5: connection indicator */}
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className={`h-2 w-2 rounded-full ${connected ? "bg-green-400" : "bg-gray-300"}`} />
          {connected ? "Live" : "Disconnected"}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${colorClass}`}>
          {STATUS_LABEL[status] ?? status}
        </span>
        {updatedAt && (
          <span className="text-xs text-gray-400">Updated {relative(updatedAt)}</span>
        )}
      </div>
    </div>
  );
}

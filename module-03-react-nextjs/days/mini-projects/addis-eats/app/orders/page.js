import { Suspense } from "react";
import OrdersList from "../components/OrdersList";
import { orders } from "../Data/orders";

// Server component — passes first page as fallbackData so SWR has
// data immediately on first paint; no spinner appears.
export default function OrdersPage() {
  const fallbackData = orders.slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
      <p className="mt-2 text-gray-600">
        Live order status — refreshes every 5 seconds.
      </p>

      {/* Suspense required because OrdersList uses useSearchParams */}
      <Suspense fallback={<p className="mt-6 text-gray-500">Loading orders…</p>}>
        <OrdersList fallbackData={fallbackData} />
      </Suspense>
    </div>
  );
}

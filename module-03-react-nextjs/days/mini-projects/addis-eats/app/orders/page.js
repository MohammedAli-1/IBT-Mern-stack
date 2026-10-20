import OrdersList from "../components/OrdersList";
import { orders } from "../Data/orders";

// Ex 4: server component fetches the initial order list and passes it
// as fallbackData so SWR hydrates instantly with no loading flash.
export default function OrdersPage() {
  // Grab the first page server-side (same slice the API would return)
  const fallbackData = orders.slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
      <p className="mt-2 text-gray-600">
        Live order status — refreshes every 5 seconds.
      </p>

      <OrdersList fallbackData={fallbackData} />
    </div>
  );
}

import { getSession } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { orders } from "@/app/Data/orders";
import { when, etb } from "@/lib/format";
import OrderStatusStream from "@/app/components/OrderStatusStream";
import DeliveryMap from "@/app/components/DeliveryMap";
import Link from "next/link";

export default async function OrderTrackingPage({ params }) {
  const session = await getSession();
  if (!session) redirect("/login?next=/orders");

  const { id } = await params;
  const order = orders.find((o) => o.id === Number(id));

  if (!order || order.owner !== session.id) notFound();

  const total = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0;

  // Simulated positions — replace with real geo data
  const courierPos = [9.005, 38.763];
  const deliveryPos = [9.02, 38.78];

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/orders" className="text-sm text-orange-600 hover:underline">
        ← Back to orders
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">Order #{order.id}</h1>
      <p className="mt-1 text-sm text-gray-500">Placed {when(order.createdAt)}</p>

      {/* Ex 4 & 5: live status via SSE, seeded with server-fetched status */}
      <div className="mt-6">
        <OrderStatusStream orderId={order.id} initialStatus={order.status} />
      </div>

      {/* Ex 1 & 2: dynamic map with courier + delivery markers */}
      <div className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Delivery Map</h2>
        <DeliveryMap
          orderId={order.id}
          courierPos={courierPos}
          deliveryPos={deliveryPos}
        />
        <p className="mt-2 text-xs text-gray-500">
          🛵 Courier at {courierPos[0].toFixed(3)}, {courierPos[1].toFixed(3)} →
          📍 Delivery at {deliveryPos[0].toFixed(3)}, {deliveryPos[1].toFixed(3)}
        </p>
      </div>

      {/* Order summary */}
      <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-gray-900">Items</h2>
        {order.items?.length ? (
          <ul className="mt-3 space-y-2">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name} × {item.quantity}</span>
                <span className="text-gray-900 font-medium">{etb(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No items recorded.</p>
        )}
        <div className="mt-4 flex justify-between border-t pt-3 font-semibold">
          <span>Total</span>
          <span className="text-orange-600">{etb(total)}</span>
        </div>
      </div>
    </div>
  );
}

import { Suspense } from "react";
import OrdersList from "../components/OrdersList";
import { getOrdersByOwner } from "../Data/orders";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Orders",
  description: "View and track your Addis-Eats orders.",
  alternates: { canonical: "https://addis-eats.vercel.app/orders" },
};

export default async function OrdersPage() {
  // Every private page verifies session while rendering — not only in middleware
  const session = await getSession();
  if (!session) redirect("/login?next=/orders");

  // Scope initial fallbackData to this user's orders (Ex 6)
  const fallbackData = getOrdersByOwner(session.id).slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
      <p className="mt-2 text-gray-600">Live order status — refreshes every 5 seconds.</p>

      <Suspense fallback={<p className="mt-6 text-gray-500">Loading orders…</p>}>
        <OrdersList fallbackData={fallbackData} />
      </Suspense>
    </div>
  );
}

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
  const session = await getSession();
  if (!session) redirect("/login?next=/orders");

  const fallbackData = getOrdersByOwner(session.id).slice(0, 5);
  const totalOrders = getOrdersByOwner(session.id).length;

  return (
    <div className="min-h-[80vh] bg-orange-50 py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="mt-1 text-sm text-gray-500">
              {totalOrders > 0 ? `${totalOrders} order${totalOrders !== 1 ? "s" : ""} total` : "No orders yet"}
              {" · "}Live updates every 5s
            </p>
          </div>
          <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
            {totalOrders}
          </span>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Suspense fallback={
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          }>
            <OrdersList fallbackData={fallbackData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

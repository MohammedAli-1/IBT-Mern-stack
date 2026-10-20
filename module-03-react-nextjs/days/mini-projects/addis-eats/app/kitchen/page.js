import { getSession } from "@/lib/session";
import { orders } from "../Data/orders";
import { redirect } from "next/navigation";

// Middleware already blocks non-staff, but we double-check server-side
// so the role gate cannot be bypassed by manipulating client markup.
export default async function KitchenPage() {
  const session = await getSession();

  if (!session || session.role !== "staff") {
    redirect("/");
  }

  const pending = orders.filter((o) => o.status === "pending");

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Kitchen Dashboard</h1>
      <p className="mt-2 text-gray-600">Staff-only — pending orders.</p>

      {pending.length === 0 && (
        <p className="mt-6 text-gray-500">No pending orders.</p>
      )}

      <ul className="mt-6 space-y-3">
        {pending.map((order) => (
          <li key={order.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">#{order.id}</span>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{order.name} · {order.phone}</p>
            <p className="text-sm text-gray-500">{order.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { orders } from "@/app/Data/orders";
import { aggregateOrders } from "@/lib/aggregateOrders";
import RevenueChart from "@/app/components/RevenueChart";
import OrdersLineChart from "@/app/components/OrdersLineChart";
import OrdersTable from "@/app/components/OrdersTable";

export const metadata = { title: "Kitchen Dashboard" };

export default async function DashboardPage({ searchParams }) {
  const session = await getSession();
  if (!session || session.role !== "staff") redirect("/");

  // Ex 1: aggregate server-side — only the summary goes to the client
  const { revenueData, countData, totalRevenue, totalOrders } =
    aggregateOrders(orders);

  const { sort, dir, page } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Kitchen Dashboard</h1>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Orders", value: totalOrders },
          { label: "Total Revenue", value: `${totalRevenue.toLocaleString()} ETB` },
          { label: "Pending", value: orders.filter((o) => o.status === "pending").length },
          { label: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length },
        ].map((card) => (
          <div key={card.label} className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Ex 2: Revenue bar chart */}
      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Revenue by Day (ETB)</h2>
        <div className="rounded-xl bg-white p-4 shadow-sm" style={{ height: 260 }}>
          <RevenueChart data={revenueData} />
        </div>
      </section>

      {/* Ex 3 & 4: Orders per day line chart + accessible table */}
      <section className="mt-8">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <OrdersLineChart data={countData} />
        </div>
      </section>

      {/* Ex 5, 6, 7: sortable, paginated orders table */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
        <OrdersTable orders={orders} sort={sort} dir={dir} page={page} />
      </section>
    </div>
  );
}

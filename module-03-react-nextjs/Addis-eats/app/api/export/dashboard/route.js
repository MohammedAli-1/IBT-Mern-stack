/**
 * GET /api/export/dashboard
 * Staff-only: export revenue and orders-over-time data as CSV.
 */
import { getSession } from '../../../../lib/session';
import { getAllOrders } from '../../../../lib/orders';
import { getDishById } from '../../../../lib/dishes';
import { revenueToCSV } from '../../../../lib/csv';

function aggregateData(orders) {
  const revenueByNeighbourhood = {};
  const ordersByDate = {};

  for (const order of orders) {
    if (order.status === 'cancelled') continue;

    for (const item of order.items) {
      const dish = getDishById(item.dishId);
      const neighbourhood = dish?.neighbourhood || 'Other';
      revenueByNeighbourhood[neighbourhood] =
        (revenueByNeighbourhood[neighbourhood] || 0) + item.price * item.quantity;
    }

    const date = order.createdAt.slice(0, 10);
    if (!ordersByDate[date]) ordersByDate[date] = { date, orders: 0, revenue: 0 };
    ordersByDate[date].orders += 1;
    ordersByDate[date].revenue += order.total;
  }

  return {
    revenueData: Object.entries(revenueByNeighbourhood).map(([name, revenue]) => ({ name, revenue })),
    timeData: Object.values(ordersByDate).sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorised.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (session.role !== 'staff') {
    return new Response(JSON.stringify({ error: 'Forbidden.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const orders = getAllOrders();
  const { revenueData, timeData } = aggregateData(orders);
  const csv = revenueToCSV(revenueData, timeData);
  const filename = `addiseats-dashboard-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

/**
 * GET /api/export/orders
 * Export the authenticated user's orders as a CSV file.
 * Staff export all orders; customers export only their own.
 */
import { getSession } from '../../../../lib/session';
import { getOrdersForUser, getAllOrders } from '../../../../lib/orders';
import { ordersToCSV } from '../../../../lib/csv';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorised.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const orders = session.role === 'staff'
    ? getAllOrders()
    : getOrdersForUser(session.sub);

  const csv = ordersToCSV(orders);
  const filename = session.role === 'staff'
    ? `addiseats-all-orders-${new Date().toISOString().slice(0, 10)}.csv`
    : `addiseats-my-orders-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

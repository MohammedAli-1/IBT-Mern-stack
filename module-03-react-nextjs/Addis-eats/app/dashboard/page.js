import { redirect } from 'next/navigation';
import { getSession } from '../../lib/session';
import { getAllOrders } from '../../lib/orders';
import { getDishById } from '../../lib/dishes';
import RevenueChart from './RevenueChart';
import ExportButton from '../../components/ExportButton';

export const metadata = {
  title: 'Dashboard',
  description: 'Addis Eats sales analytics and revenue overview.',
};

function aggregateData(orders) {
  const revenueByNeighbourhood = {};
  const ordersByDate = {};

  for (const order of orders) {
    if (order.status === 'cancelled') continue; // don't count cancelled orders

    // Revenue by neighbourhood (derived from dish data)
    for (const item of order.items) {
      const dish = getDishById(item.dishId);
      const neighbourhood = dish?.neighbourhood || 'Other';
      revenueByNeighbourhood[neighbourhood] =
        (revenueByNeighbourhood[neighbourhood] || 0) + item.price * item.quantity;
    }

    // Orders over time (by date)
    const date = order.createdAt.slice(0, 10); // YYYY-MM-DD
    if (!ordersByDate[date]) ordersByDate[date] = { date, orders: 0, revenue: 0 };
    ordersByDate[date].orders += 1;
    ordersByDate[date].revenue += order.total;
  }

  const revenueData = Object.entries(revenueByNeighbourhood).map(([name, revenue]) => ({
    name,
    revenue,
  }));

  const timeData = Object.values(ordersByDate).sort((a, b) => a.date.localeCompare(b.date));

  return { revenueData, timeData };
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/signin?next=/dashboard');
  if (session.role !== 'staff') redirect('/');

  const orders = getAllOrders();
  const { revenueData, timeData } = aggregateData(orders);

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length;

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Dashboard</h1>
          <p>Analytics overview for Addis Eats.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <ExportButton href="/api/export/orders" label="Export Orders CSV" />
          <ExportButton href="/api/export/dashboard" label="Export Dashboard CSV" />
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Total Revenue', value: `ETB ${totalRevenue.toLocaleString()}`, color: 'var(--color-primary)' },
          { label: 'Total Orders', value: totalOrders, color: '#1565c0' },
          { label: 'Active Orders', value: activeOrders, color: '#e65100' },
        ].map((kpi) => (
          <div key={kpi.label} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: kpi.color }}>{kpi.value}</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      <RevenueChart revenueData={revenueData} timeData={timeData} />

      {/* Accessible table fallback */}
      <details style={{ marginTop: '2rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--color-primary-dark)', padding: '0.5rem 0' }}>
          View data as tables
        </summary>
        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <h3 style={{ marginBottom: '0.75rem' }}>Revenue by Neighbourhood</h3>
            <div className="table-wrapper">
              <table aria-label="Revenue by neighbourhood">
                <thead><tr><th>Neighbourhood</th><th>Revenue (ETB)</th></tr></thead>
                <tbody>
                  {revenueData.length === 0
                    ? <tr><td colSpan={2} style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No data</td></tr>
                    : revenueData.map((r) => (
                      <tr key={r.name}><td>{r.name}</td><td>{r.revenue.toLocaleString()}</td></tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.75rem' }}>Orders Over Time</h3>
            <div className="table-wrapper">
              <table aria-label="Orders over time">
                <thead><tr><th>Date</th><th>Orders</th><th>Revenue (ETB)</th></tr></thead>
                <tbody>
                  {timeData.length === 0
                    ? <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No data</td></tr>
                    : timeData.map((t) => (
                      <tr key={t.date}><td>{t.date}</td><td>{t.orders}</td><td>{t.revenue.toLocaleString()}</td></tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { getSession } from '../../lib/session';
import { getOrdersForUser } from '../../lib/orders';
import OrderTable from './OrderTable';
import ExportButton from '../../components/ExportButton';

export const metadata = {
  title: 'My Orders',
  description: 'View and track your Addis Eats orders.',
};

export default async function OrdersPage({ searchParams }) {
  // Layer 2: server-side session check
  const session = await getSession();
  if (!session) redirect('/signin?next=/orders');

  const sp = await searchParams;
  const sort = ['createdAt', 'total', 'status'].includes(sp?.sort) ? sp.sort : 'createdAt';
  const dir = ['asc', 'desc'].includes(sp?.dir) ? sp.dir : 'desc';
  const page = Math.max(1, Number(sp?.page) || 1);
  const pageSize = 5;

  // Layer 3: ownership — only this user's orders
  const allOrders = getOrdersForUser(session.sub);

  // Sort
  const sorted = [...allOrders].sort((a, b) => {
    const va = a[sort]; const vb = b[sort];
    if (dir === 'asc') return va > vb ? 1 : -1;
    return va < vb ? 1 : -1;
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const orders = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>My Orders</h1>
          <p>Hello, {session.name} — here are your orders.</p>
        </div>
        {allOrders.length > 0 && (
          <ExportButton href="/api/export/orders" label="Export CSV" />
        )}
      </div>
      <OrderTable
        orders={orders}
        total={total}
        page={safePage}
        totalPages={totalPages}
        sort={sort}
        dir={dir}
      />
    </div>
  );
}

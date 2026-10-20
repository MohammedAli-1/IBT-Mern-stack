import { redirect } from 'next/navigation';
import { getSession } from '../../lib/session';
import { getAllOrders } from '../../lib/orders';
import KitchenClient from './KitchenClient';

export const metadata = {
  title: 'Kitchen',
  description: 'Staff kitchen order management.',
};

export default async function KitchenPage() {
  // Layer 2 + role check — staff only
  const session = await getSession();
  if (!session) redirect('/signin?next=/kitchen');
  if (session.role !== 'staff') redirect('/');

  const orders = getAllOrders().filter((o) => !['delivered', 'cancelled'].includes(o.status));

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <div className="page-header">
        <h1>🍳 Kitchen Board</h1>
        <p>Welcome, {session.name}. Active orders below.</p>
      </div>
      <KitchenClient initialOrders={orders} />
    </div>
  );
}

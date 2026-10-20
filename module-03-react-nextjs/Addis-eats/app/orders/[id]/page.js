import { redirect } from 'next/navigation';
import { getSession } from '../../../lib/session';
import { getOrderById } from '../../../lib/orders';
import OrderDetail from './OrderDetail';

export const metadata = {
  title: 'Order Details',
  description: 'Track your Addis Eats order status in real time.',
};

export default async function OrderPage({ params, searchParams }) {
  // Layer 2: server-side session check
  const session = await getSession();
  if (!session) redirect('/signin?next=/orders');

  const { id } = await params;
  const sp = await searchParams;

  // Layer 3: ownership — only this user's order
  const order = getOrderById(id, session.sub);
  if (!order) redirect('/orders');

  const confirmed = sp?.confirmed === '1';

  return (
    <OrderDetail
      initialOrder={order}
      confirmed={confirmed}
      orderId={id}
    />
  );
}

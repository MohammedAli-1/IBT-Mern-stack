import { redirect } from 'next/navigation';
import { getSession } from '../../lib/session';
import CheckoutClient from './CheckoutClient';

export const metadata = {
  title: 'Checkout',
  description: 'Complete your Addis Eats order.',
};

export default async function CheckoutPage() {
  // Layer 2: server-side session check (middleware is Layer 1)
  const session = await getSession();
  if (!session) redirect('/signin?next=/checkout');

  return <CheckoutClient user={{ name: session.name, email: session.email }} />;
}

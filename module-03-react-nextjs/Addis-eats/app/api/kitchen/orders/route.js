import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/session';
import { getAllOrders } from '../../../../lib/orders';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  if (session.role !== 'staff') return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const orders = getAllOrders().filter((o) => !['delivered', 'cancelled'].includes(o.status));
  return NextResponse.json({ orders });
}

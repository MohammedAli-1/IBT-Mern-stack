import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/session';
import { getOrderById, updateOrderStatus, ORDER_STATUSES } from '../../../../lib/orders';
import { z } from 'zod';

const UpdateSchema = z.object({
  status: z.enum(ORDER_STATUSES),
});

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { id } = await params;
  // Staff can see any order; customers only their own
  const userId = session.role === 'staff' ? null : session.sub;
  const order = getOrderById(id, userId);

  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  return NextResponse.json({ order });
}

export async function PATCH(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { id } = await params;

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
  }

  const { status } = parsed.data;

  // Customers may only cancel their own orders
  if (session.role === 'customer') {
    if (status !== 'cancelled') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }
    const order = updateOrderStatus(id, status, session.sub);
    if (!order) return NextResponse.json({ error: 'Order not found or access denied.' }, { status: 404 });
    return NextResponse.json({ order });
  }

  // Staff can set any status
  const order = updateOrderStatus(id, status, null);
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  return NextResponse.json({ order });
}

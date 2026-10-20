import { NextResponse } from 'next/server';
import { getSession } from '../../../lib/session';
import { createOrder, getOrdersForUser } from '../../../lib/orders';
import { z } from 'zod';

const OrderItemSchema = z.object({
  dishId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(20),
});

const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1).max(30),
  deliveryAddress: z.string().min(5).max(200),
  phone: z.string().min(7).max(20),
});

export async function GET(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const sort = searchParams.get('sort') || 'createdAt';
  const dir = searchParams.get('dir') || 'desc';

  // Allowlist sort fields and directions
  const allowedSort = ['createdAt', 'total', 'status'];
  const allowedDir = ['asc', 'desc'];
  const safeSort = allowedSort.includes(sort) ? sort : 'createdAt';
  const safeDir = allowedDir.includes(dir) ? dir : 'desc';

  let orders = getOrdersForUser(session.sub);
  orders = orders.sort((a, b) => {
    const va = a[safeSort];
    const vb = b[safeSort];
    if (safeDir === 'asc') return va > vb ? 1 : -1;
    return va < vb ? 1 : -1;
  });

  return NextResponse.json({ orders });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = CreateOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid order data.', details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    // userId ALWAYS comes from the verified session — never from the client
    const order = createOrder({ userId: session.sub, ...parsed.data });
    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 422 });
  }
}

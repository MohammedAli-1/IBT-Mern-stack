import { NextResponse } from 'next/server';
import { queryDishes } from '../../../lib/dishes';
import { z } from 'zod';

const QuerySchema = z.object({
  search: z.string().max(100).optional().default(''),
  category: z.string().max(50).optional().default(''),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).optional().default(8),
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const parsed = QuerySchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query parameters.' }, { status: 400 });
  }

  const result = queryDishes(parsed.data);
  return NextResponse.json(result);
}

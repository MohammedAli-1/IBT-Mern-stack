import { NextResponse } from "next/server";
import { createOrder, orders } from "@/app/Data/orders";

// Validation schema matching Day 33 shape
function validate(body) {
  const fieldErrors = {};

  if (!body.name || body.name.trim().length < 2) {
    fieldErrors.name = "Name must be at least 2 characters.";
  }
  if (!body.address || body.address.trim().length < 5) {
    fieldErrors.address = "Address must be at least 5 characters.";
  }
  if (!body.phone || !/^\+?[\d\s\-]{7,15}$/.test(body.phone.trim())) {
    fieldErrors.phone = "Enter a valid phone number.";
  }
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    fieldErrors.items = "Order must contain at least one item.";
  }

  return fieldErrors;
}

// GET /api/orders — returns orders, supports ?search and ?page
export function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const PAGE_SIZE = 5;

  const filtered = search
    ? orders.filter(
        (o) =>
          o.name?.toLowerCase().includes(search) ||
          o.address?.toLowerCase().includes(search)
      )
    : orders;

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return NextResponse.json(paged, {
    headers: { "x-total-count": String(filtered.length) },
  });
}

// POST /api/orders — validates body, returns 422 with fieldErrors or 201 with order
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fieldErrors = validate(body);

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Validation failed", fieldErrors }, { status: 422 });
  }

  const order = createOrder(body);
  return NextResponse.json(order, { status: 201 });
}

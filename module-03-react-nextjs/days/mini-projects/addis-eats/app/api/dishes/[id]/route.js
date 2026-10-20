import { NextResponse } from "next/server";
import foods from "@/app/Data/foods";

// GET /api/dishes/[id] — returns a single dish or 404
export function GET(request, { params }) {
  const id = Number(params.id);
  const dish = foods.find((f) => f.id === id);

  if (!dish) {
    return NextResponse.json(
      { error: "Not found", message: `No dish with id ${id}` },
      { status: 404 }
    );
  }

  return NextResponse.json(dish);
}

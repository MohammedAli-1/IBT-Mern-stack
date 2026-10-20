import { NextResponse } from "next/server";
import foods from "@/app/Data/foods";

// GET /api/dishes — returns the full menu as JSON
export function GET() {
  return NextResponse.json(foods);
}

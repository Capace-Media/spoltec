import { getPositions } from "@lib/data/employment";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after") || undefined;
  const first = searchParams.get("first") || undefined;
  const positions = await getPositions(after, parseInt(first || "9"));
  return NextResponse.json(positions);
}

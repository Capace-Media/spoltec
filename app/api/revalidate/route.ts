import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

async function handle(request: NextRequest) {
  const token =
    request.headers.get("secret") ?? request.nextUrl.searchParams.get("secret");
  const path =
    request.headers.get("path") ?? request.nextUrl.searchParams.get("path");

  if (token !== process.env.REVALIDATE_CACHE_SECRET) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  if (!path) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const tagMap = {
    post: "kunskapsbank",
    page: "page",
    tjanster: "tjanster",
    "lediga-tjanster": "lediga-tjanster",
  } as const;

  const tag = tagMap[path as keyof typeof tagMap];
  if (tag) revalidateTag(tag, "max");
  revalidateTag(path, "max");

  return NextResponse.json({ revalidated: true, path });
}

export async function GET(request: NextRequest) {
  return handle(request);
}
export async function POST(request: NextRequest) {
  return handle(request);
}

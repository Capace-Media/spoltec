import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { REVALIDATE_ALIASES } from "@lib/wp/tags";

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

  const tags = new Set(REVALIDATE_ALIASES[path] ?? []);
  // Keep honouring the raw value so bespoke webhook configs keep working.
  tags.add(path as never);

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, path, tags: [...tags] });
}

export async function GET(request: NextRequest) {
  return handle(request);
}
export async function POST(request: NextRequest) {
  return handle(request);
}

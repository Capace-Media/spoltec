import { getPosts } from "@lib/data/post";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after") || undefined;
  const first = searchParams.get("first") || undefined;
  const posts = await getPosts(
    after as string,
    parseInt((first as string) || "9")
  );
  return NextResponse.json(posts);
}

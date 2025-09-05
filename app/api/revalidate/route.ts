import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("secret");
  const path = request.headers.get("path");

  if (token !== process.env.REVALIDATE_CACHE_SECRET) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    // Parse the request body
    const body = await request.json();

    // Perform your revalidation logic here
    // For example, you might want to revalidate a specific path
    const pathToRevalidate = path;

    if (!pathToRevalidate) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const tagMap = {
      post: "kunskapsbank",
      page: "page",
      tjanster: "services",
      "lediga-tjanster": "lediga-tjanster",
    };

    const tag = tagMap[pathToRevalidate as keyof typeof tagMap];
    if (tag) {
      revalidateTag(tag);
    }

    revalidateTag(pathToRevalidate);

    return NextResponse.json({ revalidated: true, path: pathToRevalidate });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

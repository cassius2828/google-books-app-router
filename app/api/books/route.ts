import { NextRequest, NextResponse } from "next/server";
import { getBooksByTitle } from "@/app/_lib/service";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ items: [] });
  }

  const startIndex = parseInt(
    request.nextUrl.searchParams.get("startIndex") || "0",
    10
  );
  const maxResults = parseInt(
    request.nextUrl.searchParams.get("maxResults") || "24",
    10
  );

  try {
    const data = await getBooksByTitle(q, startIndex, maxResults);
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/books error:", err);
    return NextResponse.json(
      { error: "Failed to fetch books", items: [] },
      { status: 500 }
    );
  }
}

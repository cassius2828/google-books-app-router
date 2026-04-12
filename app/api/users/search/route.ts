import { NextRequest, NextResponse } from "next/server";
import { searchPublicUsers } from "@/app/_lib/service";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const users = await searchPublicUsers(q);
    return NextResponse.json(users);
  } catch (err) {
    console.error("GET /api/users/search error:", err);
    return NextResponse.json(
      { error: "Failed to search users" },
      { status: 500 }
    );
  }
}

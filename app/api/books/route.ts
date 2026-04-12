import { NextRequest, NextResponse } from "next/server";
import { getBooksByTitle } from "@/app/_lib/service";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ items: [] });
  }

  try {
    const data = await getBooksByTitle(q);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

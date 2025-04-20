import { getBooksByTitle } from "@/app/_lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json(
      { error: 'Missing "q" paramter' },
      { status: 400 }
    );
  }

  try {
    const data = await getBooksByTitle(q);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 502 }
    );
  }
}

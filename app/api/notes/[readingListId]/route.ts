import { getNote } from "@/app/_lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ readingListId: string }> }
) {
  const readingListId = (await params).readingListId;

  try {
    const data = await getNote(readingListId);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 502 }
    );
  }
}

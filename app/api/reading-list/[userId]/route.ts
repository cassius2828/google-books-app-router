import { getUserReadingList } from "@/app/_lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId")?.trim() ?? "";

  try {
    if (userId) {
      const data = await getUserReadingList(userId);
      return NextResponse.json(data);
    } else return NextResponse.json([]);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) throw new Error(String(err));
  }
}

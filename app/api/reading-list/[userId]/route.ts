import { auth } from "@/app/_lib/auth";
import { getPublicUserID } from "@/app/_lib/service";
import { getUserReadingList } from "@/app/_lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const currentUserId = await getPublicUserID(session.user.email);
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId")?.trim() ?? "";

  if (userId && userId !== currentUserId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const data = await getUserReadingList(userId || currentUserId);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch reading list" },
      { status: 500 }
    );
  }
}

import { auth } from "@/app/_lib/auth";
import { getIsBookInUsersList, getPublicUserID } from "@/app/_lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (session?.user?.email && bookId) {
    const userId = await getPublicUserID(session?.user?.email);
    if (userId) {
      const data = await getIsBookInUsersList(userId, bookId);
      return NextResponse.json(data);
    } else {
      return NextResponse.json({
        error:
          "Cannot find userId, therefore cannot find book in list. Make sure you are signed in to view your book",
      });
    }
  }
}

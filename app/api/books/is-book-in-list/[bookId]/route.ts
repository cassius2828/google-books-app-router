import { auth } from "@/app/_lib/auth";
import { getIsBookInUsersList, getPublicUserID } from "@/app/_lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  console.log(bookId, ' \n\n\n <-- book id from slug \n\n\n')
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (session?.user?.email && bookId) {
    const userId = await getPublicUserID(session?.user?.email);
    const data = await getIsBookInUsersList(userId, bookId);
    return NextResponse.json(data);
  }
}

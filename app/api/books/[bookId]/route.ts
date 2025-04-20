import { getBookById } from "@/app/_lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const array = request.url.split("/");
  const array2 = array[array.length - 1].split("?");
  const id = array2[0];
  console.log(id, ' <-- ID')
  if (!id) {
    return NextResponse.json(
      { error: 'Missing "id" paramter' },
      { status: 400 }
    );
  }

  try {
    const data = await getBookById(id);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 502 }
    );
  }
}

// app/api/books/volumes/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const BASE_VOL_URL = process.env.BASE_VOL_URL!;
// TODO: FInd a way to ensure the ? at the beginning of the search param is not present for the volumeId
// TODO: or send it to a different URL
export async function GET(request: NextRequest) {
  const fullUrl = request.url;

  // 2) Extract just the query string (everything after '?')
  const { search } = new URL(fullUrl);

  const googleUrl = `${BASE_VOL_URL}${search}&key=${GOOGLE_API_KEY}`;

  try {
    const { data } = await axios.get(googleUrl);
    return NextResponse.json({
      items: data.items ?? [],
      totalItems: data.totalItems ?? 0,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to proxy to Google Books", items: [], totalItems: 0 },
      { status: 502 }
    );
  }
}

// app/api/books/volumes/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const BASE_VOL_URL = process.env.BASE_VOL_URL!;

export async function GET(request: NextRequest) {
  const fullUrl = request.url;

  // 2) Extract just the query string (everything after '?')
  const { search } = new URL(fullUrl);
console.log(search , ' \n\n<-- search url \n\n')
  const googleUrl = `${BASE_VOL_URL}${search}&key=${GOOGLE_API_KEY}`;
console.log(googleUrl, ' \n-- google url \n')
  try {
    const { data } = await axios.get(googleUrl);
    console.log(data, '\n\n <-- data\n\n')
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to proxy to Google Books" },
      { status: 502 }
    );
  }
}

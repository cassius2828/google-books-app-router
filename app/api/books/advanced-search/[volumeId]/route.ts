// app/api/books/volumes/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const BASE_VOL_URL = process.env.BASE_VOL_URL!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<string> }
) {
const {volumeId} = await params

  const googleUrl = `${BASE_VOL_URL}/${volumeId}?key=${GOOGLE_API_KEY}`;
  console.log(googleUrl, " \n-- google url \n");
  try {
    const { data } = await axios.get(googleUrl);
    console.log(data, "\n\n <-- data\n\n");
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to proxy to Google Books" },
      { status: 502 }
    );
  }
}

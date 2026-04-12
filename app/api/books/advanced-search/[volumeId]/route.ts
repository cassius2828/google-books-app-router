import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { GoogleBooksVolume } from "@/app/_lib/types";
import { GOOGLE_API_KEY, BASE_VOL_URL } from "@/app/_lib/google-books";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ volumeId: string }> }
) {
  const { volumeId } = await params;

  const googleUrl = `${BASE_VOL_URL}/${volumeId}?key=${GOOGLE_API_KEY}`;

  try {
    const { data } = await axios.get<GoogleBooksVolume>(googleUrl);
    return NextResponse.json([data]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to proxy to Google Books" },
      { status: 502 }
    );
  }
}

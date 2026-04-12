import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  GoogleBooksVolumesResponse,
  GoogleBooksVolume,
} from "@/app/_lib/types";
import {
  GOOGLE_API_KEY,
  BASE_VOL_URL,
  API_MAX_RESULTS,
} from "@/app/_lib/google-books";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const MAX_ALLOWED = 100;
  const requestedMax = Math.min(
    parseInt(params.get("maxResults") || "10", 10),
    MAX_ALLOWED
  );
  const startIndex = parseInt(params.get("startIndex") || "0", 10);

  try {
    if (requestedMax <= API_MAX_RESULTS) {
      const googleUrl = `${BASE_VOL_URL}${url.search}&key=${GOOGLE_API_KEY}`;
      const { data } =
        await axios.get<GoogleBooksVolumesResponse>(googleUrl);
      return NextResponse.json({
        items: data.items ?? [],
        totalItems: data.totalItems ?? 0,
      });
    }

    const allItems: GoogleBooksVolume[] = [];
    let totalItems = 0;
    let currentIndex = startIndex;
    let remaining = requestedMax;

    while (remaining > 0) {
      const batchSize = Math.min(remaining, API_MAX_RESULTS);
      const batchParams = new URLSearchParams(params);
      batchParams.set("maxResults", String(batchSize));
      batchParams.set("startIndex", String(currentIndex));

      const googleUrl = `${BASE_VOL_URL}?${batchParams.toString()}&key=${GOOGLE_API_KEY}`;
      const { data } =
        await axios.get<GoogleBooksVolumesResponse>(googleUrl);

      totalItems = data.totalItems ?? 0;
      const items = data.items ?? [];
      allItems.push(...items);

      if (items.length < batchSize || allItems.length >= totalItems) break;

      currentIndex += items.length;
      remaining -= items.length;
    }

    return NextResponse.json({ items: allItems, totalItems });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to proxy to Google Books", items: [], totalItems: 0 },
      { status: 502 }
    );
  }
}

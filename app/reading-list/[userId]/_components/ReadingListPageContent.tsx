"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Filter from "@/app/_components/ReadingList/Filter";
import ReadingListView from "@/app/_components/ReadingList/ReadingListView";
import { ReadingListDBRow } from "@/app/_lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCache,
  setCache,
  readingListCacheKey,
  READING_LIST_TTL_MS,
} from "@/app/_lib/cache";

const VALID_STATUSES = new Set<string>([
  "to_read",
  "reading",
  "completed",
  "all",
]);

function filterByStatus(
  list: ReadingListDBRow[],
  status: string | null
): ReadingListDBRow[] {
  if (!status || status === "all" || !VALID_STATUSES.has(status)) return list;
  return list.filter((item) => item.status === status);
}

export default function ReadingListPageContent({
  userId,
  isOwner,
  profileName,
  favoriteBookIds,
  initialData,
}: {
  userId: string;
  isOwner: boolean;
  profileName: string;
  favoriteBookIds: string[];
  initialData?: ReadingListDBRow[];
}) {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status");

  const [readingList, setReadingList] = useState<ReadingListDBRow[] | null>(
    initialData ?? null
  );
  const [isLoading, setIsLoading] = useState(!initialData);

  const refetchReadingList = useCallback(async () => {
    if (!isOwner) return;
    try {
      const cacheKey = readingListCacheKey(userId);
      const { data } = await axios.get<ReadingListDBRow[]>(
        `/api/reading-list/${userId}`
      );
      setCache(cacheKey, data);
      setReadingList(data);
    } catch (err) {
      console.error("Failed to refresh reading list", err);
    }
  }, [userId, isOwner]);

  useEffect(() => {
    if (!isOwner) return;

    const cacheKey = readingListCacheKey(userId);
    const cached = getCache<ReadingListDBRow[]>(cacheKey, READING_LIST_TTL_MS);

    if (cached) {
      setReadingList(cached);
      setIsLoading(false);
      return;
    }

    async function fetchList() {
      try {
        const { data } = await axios.get<ReadingListDBRow[]>(
          `/api/reading-list/${userId}`
        );
        setCache(cacheKey, data);
        setReadingList(data);
      } catch (err) {
        console.error("Failed to fetch reading list", err);
        setReadingList([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchList();
  }, [userId, isOwner]);

  const filtered =
    isLoading || !readingList
      ? []
      : filterByStatus(readingList, statusFilter);

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="heading-section text-foreground">
            {isOwner
              ? "My Reading List"
              : `${profileName}'s Reading List`}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isOwner
              ? "Track your reading progress and manage your collection."
              : "Viewing a public reading list."}
          </p>
        </div>
        {isOwner && <Filter />}
      </div>

      {isLoading || !readingList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass-card-solid rounded-2xl overflow-hidden"
            >
              <div className="flex gap-4 p-5">
                <Skeleton className="w-20 h-[120px] rounded-lg flex-shrink-0 bg-muted-foreground/20" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4 bg-muted-foreground/20" />
                    <Skeleton className="h-3 w-1/2 bg-muted-foreground/20" />
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <Skeleton className="h-8 w-28 rounded-md bg-muted-foreground/20" />
                    <Skeleton className="h-7 w-12 rounded-md bg-muted-foreground/20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ReadingListView
          readingList={filtered}
          favoriteBookIds={favoriteBookIds}
          onStatusChangeSuccess={isOwner ? refetchReadingList : undefined}
        />
      )}
    </div>
  );
}

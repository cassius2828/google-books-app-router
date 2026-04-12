"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReadingListCards from "../ReadingListTableBody";
import { ReadingListDBRow } from "@/app/_lib/types";

export default function ReadingListView({
  readingList,
  favoriteBookIds,
}: {
  readingList: ReadingListDBRow[];
  favoriteBookIds: string[];
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const showToggle = readingList.length > 0;

  return (
    <>
      {showToggle && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {readingList.length}
            </span>{" "}
            {readingList.length === 1 ? "book" : "books"}
          </p>
          <div className="inline-flex rounded-full p-1 bg-secondary/80 backdrop-blur-sm">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon-xs"
              onClick={() => setViewMode("grid")}
              className="rounded-full"
              aria-label="Grid view"
            >
              <LayoutGrid className="size-3.5" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon-xs"
              onClick={() => setViewMode("list")}
              className="rounded-full"
              aria-label="List view"
            >
              <List className="size-3.5" />
            </Button>
          </div>
        </div>
      )}
      <ReadingListCards
        readingList={readingList}
        favoriteBookIds={favoriteBookIds}
        viewMode={viewMode}
      />
    </>
  );
}

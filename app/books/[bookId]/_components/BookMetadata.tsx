"use client";

import { Book, ReadingListStatus, ReadingListStatusAndId } from "@/app/_lib/types";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookMetadataProps {
  book: Book | null;
  isLoading: boolean;
  readingListObj: ReadingListStatusAndId;
  onChangeStatus: (status: ReadingListStatus) => void;
}

export default function BookMetadata({
  book,
  isLoading,
  readingListObj,
  onChangeStatus,
}: BookMetadataProps) {
  const { publisher, publishedDate, pageCount } = book?.volumeInfo ?? {};

  return (
    <section className="container mx-auto px-6 -mt-6 relative z-10">
      <div className="glass-card-solid max-w-4xl mx-auto rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">
              Publisher
            </p>
            {isLoading ? (
              <Skeleton className="h-4 w-20 mx-auto mt-1" />
            ) : publisher ? (
              <p className="font-medium text-foreground">{publisher}</p>
            ) : (
              <p className="font-medium text-muted-foreground/50">—</p>
            )}
          </div>

          <Separator orientation="vertical" className="h-8 hidden sm:block" />

          <div className="text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">
              Published
            </p>
            {isLoading ? (
              <Skeleton className="h-4 w-16 mx-auto mt-1" />
            ) : publishedDate ? (
              <p className="font-medium text-foreground">{publishedDate}</p>
            ) : (
              <p className="font-medium text-muted-foreground/50">—</p>
            )}
          </div>

          <Separator orientation="vertical" className="h-8 hidden sm:block" />

          <div className="text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">
              Pages
            </p>
            {isLoading ? (
              <Skeleton className="h-4 w-10 mx-auto mt-1" />
            ) : pageCount && pageCount > 0 ? (
              <p className="font-medium text-foreground">{pageCount}</p>
            ) : (
              <p className="font-medium text-muted-foreground/50">—</p>
            )}
          </div>

          <Separator orientation="vertical" className="h-8 hidden sm:block" />

          <div className="text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
              Status
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-32 mx-auto" />
            ) : readingListObj.id ? (
              <Select
                value={readingListObj.status}
                onValueChange={(v) =>
                  onChangeStatus(v as ReadingListStatus)
                }
              >
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to_read">To Read</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="font-medium text-muted-foreground/50">—</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

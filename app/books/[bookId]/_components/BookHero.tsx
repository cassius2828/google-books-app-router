"use client";

import { Book, ReadingListStatusAndId } from "@/app/_lib/types";
import { resolveCoverImageSrc } from "@/app/_lib/coverImage";
import BookCoverImage from "@/app/_components/BookCoverImage";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BookHeroProps {
  book: Book | null;
  isLoading: boolean;
  readingListObj: ReadingListStatusAndId;
  onAddBook: () => void;
  onRemoveBook: () => void;
  isPendingAddBook: boolean;
  isPendingRemoveBook: boolean;
}

export default function BookHero({
  book,
  isLoading,
  readingListObj,
  onAddBook,
  onRemoveBook,
  isPendingAddBook,
  isPendingRemoveBook,
}: BookHeroProps) {
  const coverSrc = book
    ? resolveCoverImageSrc(
        book.volumeInfo.imageLinks,
        process.env.NEXT_PUBLIC_IMG_NOT_FOUND!
      )
    : "";

  const { title, authors, categories, previewLink } = book?.volumeInfo ?? {};

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 mt-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl mx-auto">
          <div className="w-56 md:w-64 flex-shrink-0">
            {isLoading ? (
              <Skeleton className="w-full aspect-[2/3] rounded-2xl bg-white/10" />
            ) : (
              <BookCoverImage
                src={coverSrc}
                alt={title ?? "Book cover"}
                width={280}
                height={420}
                className="w-full h-auto rounded-2xl shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-[1.03]"
              />
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            {isLoading ? (
              <div className="space-y-3 mb-4">
                <Skeleton className="h-8 w-3/4 bg-white/20 mx-auto md:mx-0" />
                <Skeleton className="h-8 w-1/2 bg-white/20 mx-auto md:mx-0" />
              </div>
            ) : (
              <h1 className="heading-display text-white mb-4">{title}</h1>
            )}

            {isLoading ? (
              <Skeleton className="h-5 w-1/3 bg-white/10 mb-6 mx-auto md:mx-0" />
            ) : (
              authors && (
                <p className="text-lg text-blue-200/80 mb-6">
                  by {authors.join(", ")}
                </p>
              )
            )}

            {!isLoading && categories && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="bg-white/10 text-white/90 border-white/10 hover:bg-white/20"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              {isLoading ? (
                <>
                  <Skeleton className="h-9 w-32 rounded-full bg-white/10" />
                  <Skeleton className="h-9 w-32 rounded-full bg-white/10" />
                </>
              ) : (
                <>
                  <Button asChild className="rounded-full px-6">
                    <Link
                      href={previewLink ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Preview Book
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </Button>

                  {readingListObj.id ? (
                    <Button
                      variant="destructive"
                      className="rounded-full px-6"
                      onClick={onRemoveBook}
                      disabled={isPendingRemoveBook}
                    >
                      {isPendingRemoveBook
                        ? "Removing..."
                        : "Remove From List"}
                    </Button>
                  ) : (
                    <button
                      disabled={isPendingAddBook}
                      onClick={onAddBook}
                      className="inline-flex items-center justify-center rounded-full px-6 h-9 text-sm font-medium text-white border border-white/25 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isPendingAddBook ? "Adding..." : "Add To My List"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

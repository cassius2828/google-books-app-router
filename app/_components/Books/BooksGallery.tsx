"use client";
import { useSearchParams } from "next/navigation";
import BookCard from "./BookCard";
import { useBooksContext } from "@/app/_context/BooksContext";
import { Book } from "@/app/_lib/types";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { ArrowUp, LayoutGrid, List, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 24;

const BooksGallery = () => {
  const { books, setBooks, breakpointColumnsObj } = useBooksContext();
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = params.get("q");

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    setShowScrollTop(scrollRef.current.scrollTop > 300);
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!query) return;
    let cancelled = false;
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/books?q=${encodeURIComponent(query)}&startIndex=0&maxResults=${PAGE_SIZE}`
        );
        if (cancelled) return;
        const data = response.data;
        const items = data?.items || [];
        const total = data?.totalItems || 0;
        setBooks(items);
        setTotalItems(total);
        setHasMore(items.length > 0 && items.length < total);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchBooks();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const handleLoadMore = async () => {
    if (!query || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const response = await axios.get(
        `/api/books?q=${encodeURIComponent(query)}&startIndex=${books.length}&maxResults=${PAGE_SIZE}`
      );
      const data = response.data;
      const newItems: Book[] = data?.items || [];

      const existingIds = new Set(books.map((b) => b.id));
      const uniqueNew = newItems.filter((b) => !existingIds.has(b.id));

      if (uniqueNew.length > 0) {
        const merged = [...books, ...uniqueNew];
        setBooks(merged);
        setHasMore(newItems.length > 0 && merged.length < totalItems);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const viewToggle = (
    <div className="flex items-center justify-between mb-6">
      {books.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{books.length}</span>
          {totalItems > 0 && (
            <span className="text-muted-foreground/70">
              {" "}
              of {totalItems.toLocaleString()} found
            </span>
          )}
        </p>
      )}
      <div className="inline-flex rounded-full p-1 bg-secondary/80 backdrop-blur-sm ml-auto">
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
  );

  const renderBook = (book: Book) => {
    const {
      title,
      authors,
      description,
      categories,
      pageCount,
      previewLink,
      publishedDate,
      imageLinks,
    } = book.volumeInfo;
    return (
      <BookCard
        key={book.id}
        id={book.id}
        title={title || "N/A"}
        authors={authors || ["N/A"]}
        description={description || "N/A"}
        categories={categories || ["N/A"]}
        pageCount={pageCount}
        imageLinks={imageLinks}
        previewLink={previewLink || ""}
        publishedDate={publishedDate || "N/A"}
        variant={viewMode}
      />
    );
  };

  const scrollTopButton = showScrollTop && (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4" />
    </Button>
  );

  if (isLoading) {
    return (
      <div className="relative mt-10 w-full max-w-7xl mx-auto px-6">
        {viewToggle}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="max-h-[75vh] overflow-y-auto pr-2"
        >
          {viewMode === "grid" ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-card border border-border overflow-hidden mb-4"
                >
                  <div className="aspect-square bg-muted-foreground/20 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-3/4 bg-muted-foreground/20 animate-pulse rounded" />
                    <div className="h-3 w-1/2 bg-muted-foreground/20 animate-pulse rounded" />
                    <div className="space-y-1.5">
                      <div className="h-3 w-full bg-muted-foreground/20 animate-pulse rounded" />
                      <div className="h-3 w-4/5 bg-muted-foreground/20 animate-pulse rounded" />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="h-5 w-14 bg-muted-foreground/20 animate-pulse rounded-full" />
                      <div className="h-5 w-16 bg-muted-foreground/20 animate-pulse rounded-full" />
                    </div>
                    <div className="h-3 w-1/3 bg-muted-foreground/20 animate-pulse rounded" />
                  </div>
                  <div className="flex gap-3 px-4 pb-4">
                    <div className="h-8 flex-1 bg-muted-foreground/20 animate-pulse rounded-md" />
                    <div className="h-8 flex-1 bg-muted-foreground/20 animate-pulse rounded-md" />
                  </div>
                </div>
              ))}
            </Masonry>
          ) : (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-card border border-border overflow-hidden flex gap-4 p-4"
                >
                  <div className="w-24 min-h-36 flex-shrink-0 rounded-xl bg-muted-foreground/20 animate-pulse" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-3/5 bg-muted-foreground/20 animate-pulse rounded" />
                      <div className="h-3 w-2/5 bg-muted-foreground/20 animate-pulse rounded" />
                      <div className="space-y-1.5">
                        <div className="h-3 w-full bg-muted-foreground/20 animate-pulse rounded" />
                        <div className="h-3 w-4/5 bg-muted-foreground/20 animate-pulse rounded" />
                      </div>
                      <div className="flex gap-1.5">
                        <div className="h-5 w-14 bg-muted-foreground/20 animate-pulse rounded-full" />
                        <div className="h-5 w-16 bg-muted-foreground/20 animate-pulse rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="h-3 w-24 bg-muted-foreground/20 animate-pulse rounded" />
                      <div className="flex gap-2">
                        <div className="h-7 w-16 bg-muted-foreground/20 animate-pulse rounded-md" />
                        <div className="h-7 w-16 bg-muted-foreground/20 animate-pulse rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {scrollTopButton}
      </div>
    );
  }

  return (
    <div className="relative mt-10 w-full max-w-7xl mx-auto px-6">
      {viewToggle}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="max-h-[75vh] overflow-y-auto pr-2"
      >
        {viewMode === "grid" ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {books.map(renderBook)}
          </Masonry>
        ) : (
          <div className="flex flex-col gap-4">
            {books.map(renderBook)}
          </div>
        )}

        <div className="w-full flex justify-center">
          {books.length > 0 && (
            <Button
              variant="outline"
              disabled={!hasMore || isLoadingMore}
              onClick={handleLoadMore}
              className="rounded-full px-8 mt-10 mb-6"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Loading...
                </>
              ) : hasMore ? (
                "Load More"
              ) : (
                "All Results Loaded"
              )}
            </Button>
          )}
        </div>
      </div>
      {scrollTopButton}
    </div>
  );
};
export default BooksGallery;

"use client";
import { useSearchParams } from "next/navigation";
import BookCard from "./BookCard";
import { useBooksContext } from "@/app/_context/BooksContext";
import { Book } from "@/app/_lib/types";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { ArrowUp, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

const BooksGallery = () => {
  const { books, setBooks, breakpointColumnsObj } = useBooksContext();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showScrollTop, setShowScrollTop] = useState(false);
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
          `/api/books?q=${encodeURIComponent(query)}`
        );
        if (cancelled) return;
        const data = response.data;
        if (data) {
          setBooks(data.items || []);
          setTotalItems(data.totalItems || 0);
          setVisibleCount(PAGE_SIZE);
        } else {
          setBooks([]);
          setTotalItems(0);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchBooks();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const displayBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, books.length));
  };

  const viewToggle = (
    <div className="flex items-center justify-between mb-6">
      {books.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {displayBooks.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{books.length}</span>
          {" "}loaded
          {totalItems > books.length && (
            <span className="text-muted-foreground/70">
              {" "}
              ({totalItems.toLocaleString()} found)
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
                  className="rounded-2xl bg-secondary animate-pulse mb-4"
                  style={{ height: `${200 + (i % 3) * 80}px` }}
                />
              ))}
            </Masonry>
          ) : (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-secondary animate-pulse h-40"
                />
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
            {displayBooks?.map(renderBook)}
          </Masonry>
        ) : (
          <div className="flex flex-col gap-4">
            {displayBooks?.map(renderBook)}
          </div>
        )}

        <div className="w-full flex justify-center">
          {displayBooks.length > 0 && (
            <Button
              variant="outline"
              disabled={!hasMore}
              onClick={handleLoadMore}
              className="rounded-full px-8 mt-10 mb-6"
            >
              {hasMore ? "Load More" : "All Results Loaded"}
            </Button>
          )}
        </div>
      </div>
      {scrollTopButton}
    </div>
  );
};
export default BooksGallery;

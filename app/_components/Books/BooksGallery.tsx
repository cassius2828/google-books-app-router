"use client";
import { useSearchParams } from "next/navigation";
import BookCard from "./BookCard";
import { useBooksContext } from "@/app/_context/BooksContext";
import { Book } from "@/app/_lib/types";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { ArrowUp, LayoutGrid, List } from "lucide-react";

const BooksGallery = () => {
  const { books, setBooks, breakpointColumnsObj } = useBooksContext();
  const [paginationIndex, setPaginiationIndex] = useState<number>(1);
  const [displayBooks, setDisplayBooks] = useState<Book[]>([]);
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
          setBooks(data.items);
          setDisplayBooks(data.items.slice(0, 12));
        } else {
          setBooks([]);
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

  const calculatePagination = (index: number, array: Book[]) => {
    const num = index * 12;
    const num2 = num + 12;
    setDisplayBooks(array.slice(0, num2));
  };
  useEffect(() => {
    calculatePagination(paginationIndex, books);
  }, []);
  const viewToggle = (
    <div className="flex justify-end mb-4">
      <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 transition ${
            viewMode === "grid"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
          aria-label="Grid view"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 transition ${
            viewMode === "list"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
          aria-label="List view"
        >
          <List className="h-4 w-4" />
        </button>
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
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
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
                  className="rounded-xl bg-gray-200 animate-pulse mb-4"
                  style={{ height: `${200 + (i % 3) * 80}px` }}
                />
              ))}
            </Masonry>
          ) : (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-gray-200 animate-pulse h-40"
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
          {!!displayBooks.length && (
            <button
              disabled={displayBooks.length === 40}
              onClick={() => {
                setPaginiationIndex((prev: number) => {
                  const next = prev + 1;
                  calculatePagination(next, books);
                  return next;
                });
              }}
              className={`${
                displayBooks.length === 40
                  ? "opacity-50 pointer-events-none"
                  : "hover:bg-gray-700 hover:text-gray-50"
              } border border-gray-700 rounded-md px-3 py-2 mt-12 mb-6 transition-colors duration-200`}
            >
              {displayBooks.length === 40 ? "Max Results" : "Load More"}
            </button>
          )}
        </div>
      </div>
      {scrollTopButton}
    </div>
  );
};
export default BooksGallery;

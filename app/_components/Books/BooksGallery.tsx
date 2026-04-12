"use client";
import { useSearchParams } from "next/navigation";
import BookCard from "./BookCard";
// somewhere in your code (e.g. data/tempBooks.ts)
import { useBooksContext } from "@/app/_context/BooksContext";
import { Book } from "@/app/_lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

const BooksGallery = () => {
  const { books, setBooks, breakpointColumnsObj } = useBooksContext();
  const [paginationIndex, setPaginiationIndex] = useState<number>(1);
  const [displayBooks, setDisplayBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = params.get("q");

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
  if (isLoading) {
    return (
      <div className="mt-20 w-full max-w-7xl mx-auto px-6">
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
      </div>
    );
  }

  return (
    <div className="mt-20 w-full max-w-7xl mx-auto px-6">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {displayBooks?.map((book: Book) => {
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
            />
          );
        })}
      </Masonry>

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
            } border border-gray-700 rounded-md px-3 py-2 mt-12  transition-colors duration-200`}
          >
            {displayBooks.length === 40 ? "Max Results" : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};
export default BooksGallery;

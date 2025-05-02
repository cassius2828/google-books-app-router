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
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = params.get("q");

  useEffect(() => {
    const fetchBooks = async () => {
      if (query) {
        const response = await axios.get(
          `/api/books?q=${encodeURIComponent(query)}`
        );
        const data = response.data;
        if (data) {
          setBooks(data.items);
          setDisplayBooks(data.items.slice(0, 10));
        } else {
          setBooks([]);
        }
      }
    };
    fetchBooks();
  }, [query]);

  const calculatePagination = (index: number, array: Book[]) => {
    const num = index * 10;
    const num2 = num + 10;
    setDisplayBooks(array.slice(0, num2));
  };
  useEffect(() => {
    calculatePagination(paginationIndex, books);
  }, []);
  return (
    <div className="mt-20 w-full">
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
                if (prev < 4) {
                  return prev + 1;
                } else return prev;
              });
              calculatePagination(paginationIndex, books);
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

"use client";
import { useSearchParams } from "next/navigation";
import BookCard from "./BookCard";
// somewhere in your code (e.g. data/tempBooks.ts)
import { useBooksContext } from "@/app/_context/BooksContext";
import { Book } from "@/app/_lib/types";
import axios from "axios";
import { useEffect } from "react";

const BooksGallery = () => {
  const { books, setBooks } = useBooksContext();

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
        console.log(data);
        if (data) {
          setBooks(data);
        } else {
          setBooks([]);
        }
      }
    };
    fetchBooks();
  }, [query]);
  console.log(query);
  return (
    <div className="mt-20 w-full">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center max-w-7xl mx-auto">
        {books?.map((book: Book) => {
          const {
            title,
            authors,
            description,
            categories,
            pageCount,
            previewLink,
            publishedDate,
          } = book.volumeInfo;
          // const { thumbnail } = book?.volumeInfo?.imageLinks;
          return (
            <BookCard
              key={book.id}
              id={book.id}
              title={title || "N/A"}
              authors={authors || ["N/A"]}
              description={description || "N/A"}
              categories={categories || ["N/A"]}
              pageCount={pageCount}
              thumbnail={
                book.volumeInfo.imageLinks?.thumbnail ||
                book.volumeInfo.imageLinks?.smallThumbnail ||
                process.env.NEXT_PUBLIC_IMG_NOT_FOUND ||
                ""
              }
              previewLink={previewLink || ""}
              publishedDate={publishedDate || "N/A"}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default BooksGallery;

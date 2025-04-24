import { Book } from "@/app/_lib/types";
import Loader from "@/app/loading";
import BookCard from "../Books/BookCard";
import { useEffect } from "react";

const AdvancedSearchResults = ({ books }: { books: Book[] }) => {
    useEffect(() => {
        console.log(books, ' \n <-- BOOKS PROP\n')
    },[books])
  return (
    <section className="p-3 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>

      {books === null ? (
        <Loader />
      ) : books.length === 0 ? (
        <p className="text-gray-600">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {books.length === 1 ? (
            <BookCard
              key={books[0].id}
              id={books[0].id}
              title={books[0].volumeInfo?.title}
              authors={books[0].volumeInfo?.authors || []}
              description={books[0].volumeInfo?.description || ""}
              categories={books[0].volumeInfo?.categories || []}
              pageCount={books[0].volumeInfo?.pageCount}
              publishedDate={books[0].volumeInfo?.publishedDate}
              previewLink={books[0].volumeInfo?.previewLink || ""}
              imageLinks={books[0].volumeInfo?.imageLinks}
            />
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors || []}
                description={book.volumeInfo.description || ""}
                categories={book.volumeInfo.categories || []}
                pageCount={book.volumeInfo.pageCount}
                publishedDate={book.volumeInfo.publishedDate}
                previewLink={book.volumeInfo.previewLink}
                imageLinks={book.volumeInfo.imageLinks}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};
export default AdvancedSearchResults;

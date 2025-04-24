import { Book } from "@/app/_lib/types";
import Loader from "@/app/loading";
import BookCard from "../Books/BookCard";

const AdvancedSearchResults = ({ books }: { books: Book[] }) => {

  return (
    <section className="p-3 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>

      {books === null ? (
        <Loader />
      ) : books.length === 0 ? (
        <p className="text-gray-600">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {books.map((book) => (
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
          ))}
        </div>
      )}
    </section>
  );
};
export default AdvancedSearchResults;

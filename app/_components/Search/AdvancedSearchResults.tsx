import { Book } from "@/app/_lib/types";
import Loader from "@/app/loading";
import BookCard from "../Books/BookCard";
import Masonry from "react-masonry-css";
import { useBooksContext } from "@/app/_context/BooksContext";

const AdvancedSearchResults = ({ books }: { books: Book[] }) => {
  const { breakpointColumnsObj, advancedSearchResultsRef } = useBooksContext();
  return (
    <section
      ref={advancedSearchResultsRef}
      className="p-3 mt-6 max-w-7xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>

      {books === null ? (
        <Loader />
      ) : books.length === 0 ? (
        <div className="h-screen">
          <p className="text-gray-600">No results found.</p>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
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
        </Masonry>
      )}
      <div></div>
    </section>
  );
};
export default AdvancedSearchResults;

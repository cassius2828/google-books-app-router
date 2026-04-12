import { useState, useCallback } from "react";
import { Book } from "@/app/_lib/types";
import BookCard from "../Books/BookCard";
import Masonry from "react-masonry-css";
import { useBooksContext } from "@/app/_context/BooksContext";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const AdvancedSearchResults = ({ books }: { books: Book[] }) => {
  const {
    breakpointColumnsObj,
    advancedSearchResultsRef,
    advancedSearchTotalItems,
    advancedSearchLastQuery,
    setBooks,
    advancedSearchFormData,
  } = useBooksContext();

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = books.length > 0 && books.length < advancedSearchTotalItems;

  const handleLoadMore = useCallback(async () => {
    if (!advancedSearchLastQuery || isLoadingMore) return;
    setIsLoadingMore(true);

    const isVolumeIDSearch = Boolean(advancedSearchFormData.volumeId.value);
    const separator = advancedSearchLastQuery.includes("?") ? "&" : isVolumeIDSearch ? "?" : "&";

    try {
      const { data: resp } = await axios.get(
        `/api/books/advanced-search${isVolumeIDSearch ? "/" : "?"}${advancedSearchLastQuery}${separator}startIndex=${books.length}`
      );
      const newItems: Book[] = resp.items ?? resp;
      const existingIds = new Set(books.map((b) => b.id));
      const uniqueNew = newItems.filter((b) => !existingIds.has(b.id));

      if (uniqueNew.length > 0) {
        setBooks((prev) => [...prev, ...uniqueNew]);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoadingMore(false);
    }
  }, [advancedSearchLastQuery, isLoadingMore, books, setBooks, advancedSearchFormData]);

  return (
    <section
      ref={advancedSearchResultsRef}
      className="max-w-7xl mx-auto mt-12 px-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="heading-section text-foreground">Results</h2>
      </div>

      {books === null ? (
        <div className="flex justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : books.length === 0 ? (
        <p className="text-muted-foreground">No results found.</p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-6">
            Showing{" "}
            <span className="font-medium text-foreground">{books.length}</span>
            {advancedSearchTotalItems > 0 && (
              <span className="text-muted-foreground/70">
                {" "}
                of {advancedSearchTotalItems.toLocaleString()} found
              </span>
            )}
          </p>

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

          <div className="w-full flex justify-center">
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
          </div>
        </>
      )}
    </section>
  );
};
export default AdvancedSearchResults;

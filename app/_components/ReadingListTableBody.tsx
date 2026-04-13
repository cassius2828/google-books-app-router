import BookCoverImage from "@/app/_components/BookCoverImage";
import Link from "next/link";
import { ReadingListDBRow, Book } from "../_lib/types";
import { resolveCoverFromRecord } from "../_lib/coverImage";
import FavoriteStarButton from "./Profile/FavoriteStarButton";
import StatusSelect from "./ReadingList/StatusSelect";
import { Button } from "@/components/ui/button";

function toBook(books: ReadingListDBRow["books"]): Book {
  return {
    id: books.google_book_id,
    volumeInfo: {
      title: books.title,
      authors: books.authors,
      publisher: books.publisher ?? "",
      publishedDate: books.published_date ?? "",
      description: books.description ?? "",
      pageCount: books.page_count ?? 0,
      categories: books.categories ?? [],
      previewLink: books.preview_link ?? "",
      google_book_id: books.google_book_id,
      imageLinks: {
        thumbnail: books.thumbnail,
        cover_image: books.cover_image,
      },
    },
  };
}

const ReadingListCards = ({
  readingList,
  favoriteBookIds = [],
  viewMode = "grid",
  onStatusChangeSuccess,
}: {
  readingList: ReadingListDBRow[];
  favoriteBookIds?: string[];
  viewMode?: "grid" | "list";
  onStatusChangeSuccess?: () => void | Promise<void>;
}) => {
  if (readingList.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium mb-1">No books yet</p>
        <p className="text-sm">
          Search for books and add them to your reading list.
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-3">
        {readingList.map((item: ReadingListDBRow) => {
          const { books, status } = item;
          const isFavorite = favoriteBookIds.includes(books?.id);
          const bookForAction = toBook(books);

          return (
            <div
              key={books?.id}
              className="group glass-card-solid rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4 p-4">
                <Link
                  href={`/books/${books.google_book_id}`}
                  className="flex-shrink-0"
                >
                  <BookCoverImage
                    src={resolveCoverFromRecord(books?.cover_image, books?.thumbnail)}
                    alt={books?.title}
                    width={48}
                    height={72}
                    className="rounded-lg object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {books?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {books?.authors?.join(", ")}
                  </p>
                </div>

                <div className="flex-shrink-0 hidden sm:block">
                  <StatusSelect
                    readingListId={item.readingListId}
                    currentStatus={status}
                    googleBookId={books.google_book_id}
                    onStatusUpdated={onStatusChangeSuccess}
                  />
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <FavoriteStarButton
                    book={bookForAction}
                    isFavorite={isFavorite}
                  />
                  <Button asChild variant="ghost" size="xs">
                    <Link href={`/books/${books.google_book_id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {readingList.map((item: ReadingListDBRow) => {
        const { books, status } = item;
        const isFavorite = favoriteBookIds.includes(books?.id);
        const bookForAction = toBook(books);

        return (
          <div
            key={books?.id}
            className="group glass-card-solid rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex gap-4 p-5">
              <Link
                href={`/books/${books.google_book_id}`}
                className="flex-shrink-0"
              >
                <BookCoverImage
                  src={resolveCoverFromRecord(books?.cover_image, books?.thumbnail)}
                  alt={books?.title}
                  width={80}
                  height={120}
                  className="rounded-lg object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {books?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {books?.authors?.join(", ")}
                    </p>
                  </div>
                  <FavoriteStarButton
                    book={bookForAction}
                    isFavorite={isFavorite}
                  />
                </div>

                <div className="mt-auto pt-3 flex items-center justify-between">
                  <StatusSelect
                    readingListId={item.readingListId}
                    currentStatus={status}
                    googleBookId={books.google_book_id}
                    onStatusUpdated={onStatusChangeSuccess}
                  />
                  <Button asChild variant="ghost" size="xs">
                    <Link href={`/books/${books.google_book_id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ReadingListCards;

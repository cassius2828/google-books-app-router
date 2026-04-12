import Image from "next/image";
import Link from "next/link";
import { ReadingListDBRow, Book } from "../_lib/types";
import FavoriteStarButton from "./Profile/FavoriteStarButton";

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

const ReadingListTableBody = async ({
  readingList,
  favoriteBookIds = [],
}: {
  readingList: ReadingListDBRow[] | { data: []; error: unknown } | { data: [] };
  favoriteBookIds?: string[];
}) => {
  if (!Array.isArray(readingList)) {
    console.error("Invalid reading list format:", readingList);
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
            Unable to load reading list.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {readingList?.map((item: ReadingListDBRow) => {
        const { books, status } = item;
        let statusTextColor: string = "";
        switch (status) {
          case "to_read":
            statusTextColor = "bg-blue-100 text-blue-800";
            break;
          case "reading":
            statusTextColor = "bg-yellow-100 text-yellow-800";
            break;
          case "completed":
            statusTextColor = "bg-green-100 text-green-800";
            break;
          default:
            statusTextColor = "bg-blue-100 text-blue-800";
        }

        const isFavorite = favoriteBookIds.includes(books?.id);
        const bookForAction = toBook(books);

        return (
          <tr key={books?.id} className="hover:bg-gray-50">
            <td className="px-3 py-4 whitespace-nowrap text-center">
              <FavoriteStarButton
                book={bookForAction}
                isFavorite={isFavorite}
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Image
                src={
                  books?.thumbnail ||
                  process.env.NEXT_PUBLIC_IMG_NOT_FOUND ||
                  ""
                }
                alt={books?.title}
                width={50}
                height={75}
                className="object-cover rounded"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {books?.title}
              </div>
              <div className="text-sm text-gray-500">
                {books?.authors?.join(", ")}
              </div>
            </td>
            <td className="hidden lg:block px-6 py-4 text-sm text-gray-500 line-clamp-2">
              {books?.description.length > 200
                ? books.description.slice(0, 200) + "..."
                : books.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 py-1 capitalize inline-flex text-xs leading-5 font-semibold rounded-md ${statusTextColor}`}
              >
                {status === "to_read" ? "To Read" : status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Link
                href={`/books/${books.google_book_id}`}
                className="text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Book
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
export default ReadingListTableBody;

import Image from "next/image";
import Link from "next/link";
import { ReadingListDBRow } from "../_lib/types";

const ReadingListTableBody = async ({
  readingList,
}: {
  readingList: ReadingListDBRow[] | { data: []; error: unknown } | { data: [] };
}) => {
  if (!Array.isArray(readingList)) {
    console.error("Invalid reading list format:", readingList);
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
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
        return (
          <tr key={books?.id} className="hover:bg-gray-50">
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
                {books?.authors.join(", ")}
              </div>
            </td>
            <td className="hidden lg:block px-6 py-4 text-sm text-gray-500 line-clamp-2">
              {books?.description.length > 200
                ? books.description.slice(0, 200) + "..."
                : books.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 py-1 capitalize inline-flex text-xs leading-5 font-semibold rounded-md bg-blue-100 text-blue-800">
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

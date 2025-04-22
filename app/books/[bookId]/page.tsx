// components/BookDetails.tsx
"use client";
import { Book, ReadingListStatusAndId } from "@/app/_lib/types";
import { convert } from "html-to-text";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import {
  addBookToListAction,
  addNotesToBook,
  putChangeBookStatusAction,
  removeBookFromListAction,
} from "@/app/_lib/actions";
import Loader from "@/app/loading";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function BookDetails() {
  const { bookId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [book, setBook] = useState<Book | null>(null);
  const [note, setNote] = useState<string>("");
  const [readingListObj, setReadingListObj] = useState<ReadingListStatusAndId>({
    id: "",
    user_id: "",
    status: "to_read",
  });

  const [isPendingAddBook, startTransitionAddBook] = useTransition();
  const [isPendingRemoveBook, startTransitionRemoveBook] = useTransition();
  const [isPendingNotes, startTransitionNotes] = useTransition();
  useEffect(() => {
    if (!bookId) return;
    async function load() {
      try {
        // get book data
        const { data: bookData } = await axios.get(`/api/books/${bookId}`);
        console.log(bookData, " ,_- book data");
        setBook(bookData);
        // does book exist in user reading list
        const { data: exists } = await axios.get(
          `/api/books/is-book-in-list/${bookData?.volumeInfo?.id}`
        );
        console.log(exists);
        // set validator for reading list obj ONLY IF book exisits in users list
        setReadingListObj(exists);
        const { data: noteData } = await axios.get(`/api/notes/${exists.id}`);
        setNote(noteData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [bookId]);

  if (!book || isLoading) {
    return <Loader />;
  }

  const {
    volumeInfo: {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      previewLink,
      imageLinks,
    },
  } = book;
  const formattedDescription = convert(description);

  const handleRemoveBookFromMyList = () => {
    try {
      startTransitionRemoveBook(async () => {
        if (bookId) {
          const result = await removeBookFromListAction(String(bookId));
          if (result.error) {
            toast.error(result.error, { icon: "🤕" });
          } else {
            toast.success(`Removed ${title} from your reading list`);
          }
        }
        toast.error("Cannot remove book since no book id was found");
      });
    } catch (err) {
      // guide for type safety with errors
      // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
      let message;
      if (err instanceof Error) message = err.name;
      else message = String(err);
      toast.error(message);
    }
  };

  const handleAddBookToMyList = () => {
    console.log(readingListObj.user_id);
    try {
      startTransitionAddBook(async () => {
        const result = await addBookToListAction(book);
        if (result.noUserError) {
          toast.error(result.noUserError, { icon: "🚫👤" });
        } else if (result.existingEntry) {
          toast.error(result.existingEntry, { icon: "📖📖" });
        } else if (result.insertError) {
          toast.error(result.insertError, { icon: "🚫➕📖" });
        } else {
          toast.success("Book added to your reading list");
          setTimeout(() => {
            console.log(readingListObj, "\n<-- reading list obj\n");
            router.push(`/reading-list/${readingListObj.user_id}`);
          }, 1000);
        }
      });
    } catch (err) {
      // guide for type safety with errors
      // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
      let message;
      if (err instanceof Error) message = err.name;
      else message = String(err);
      toast.error(message);
    }
  };

  const handleAddNotesToBook = (formData: FormData) => {
    startTransitionNotes(async () => {
      const result = await addNotesToBook(formData);
      if (result?.newNoteError) {
        toast.error(result.newNoteError);
      } else toast.success("saved note!");
    });
  };
  const handleChangeBookStatus = async (status: string) => {
    const result = await putChangeBookStatusAction(status, readingListObj.id);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("updated book status!");
      setReadingListObj((prev) => ({ ...prev, status }));
    }
  };

  const coverSrc =
    imageLinks.cover_image ??
    imageLinks.extraLarge ??
    imageLinks.large ??
    imageLinks.medium ??
    imageLinks.small ??
    imageLinks.thumbnail ??
    imageLinks.smallThumbnail ??
    process.env.NEXT_PUBLIC_IMG_NOT_FOUND!;
  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-12 items-center justify-center bg-gray-50 p-6 relative">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src={coverSrc}
          alt={title}
          width={320}
          height={480}
          className="w-full h-auto rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Authors:</span>{" "}
            {authors?.join(", ")}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Publisher:</span> {publisher}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Published Date:</span>{" "}
            {publishedDate}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Pages:</span> {pageCount}
          </p>
          <div className="mb-4">
            <span className="font-semibold text-gray-800">Categories:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {categories?.map((cat) => (
                <span
                  key={cat}
                  className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-800 mb-4 line-clamp-6">
            {formattedDescription}
          </p>
          {readingListObj.id && (
            <select
              value={readingListObj.status}
              onChange={(e) => {
                const { value } = e.target;
                handleChangeBookStatus(value);
              }}
              className="px-2 py-1 mb-4 w-32 text-xs font-semibold rounded-md bg-blue-100 text-blue-800 capitalize focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="to_read">To Read</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
            </select>
          )}

          <div className="flex gap-4 justify-content-between">
            <Link
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition text-center"
            >
              Preview Book
            </Link>
            {readingListObj.id ? (
              <button
                onClick={handleRemoveBookFromMyList}
                disabled={isPendingRemoveBook}
                className="mt-auto inline-block bg-red-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-red-700 transition text-center"
              >
                {isPendingRemoveBook ? "Removing book..." : "Remove From List"}
              </button>
            ) : (
              <button
                disabled={isPendingAddBook}
                onClick={handleAddBookToMyList}
                className="mt-auto inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition text-center"
              >
                {isPendingAddBook ? "Adding book..." : "Add To My List"}
              </button>
            )}

            <Toaster />
          </div>
        </div>
      </div>
      {readingListObj.id && (
        <form
          action={handleAddNotesToBook}
          className="bg-white p-6 pb-4 rounded-lg shadow-md mb-6 w-full md:w-[40rem]"
        >
          <input type="hidden" name="readingListId" value={readingListObj.id} />
          <label
            htmlFor="content"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Notes
          </label>
          <textarea
            name="content"
            id="content"
            rows={12}
            onChange={(e) => setNote(e.target.value)}
            value={note}
            placeholder="Write your notes here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex justify-end gap-4 mt-2">
            {/* add logic where if no notes are written then btn is disabled */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setNote("");
              }}
              className="mt-auto inline-block bg-red-600 text-white font-medium rounded-lg px-3 py-2 hover:bg-red-700 transition text-center"
            >
              Clear
            </button>
            <button className="mt-auto inline-block bg-blue-600 text-white font-medium rounded-lg px-3 py-2 hover:bg-blue-700 transition text-center">
              {isPendingNotes ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
      <button
        onClick={() => router.back()}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 border border-gray-700 rounded-md px-3 py-2 mt-12  transition-colors duration-200 hover:bg-gray-700 hover:text-gray-50"
      >
        back
      </button>
    </div>
  );
}

// components/BookDetails.tsx
"use client";
import { Book } from "@/app/_lib/types";
import { convert } from "html-to-text";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import {
  addBookToListAction,
  addNotesToBook,
  removeBookFromListAction,
} from "@/app/_lib/actions";
import Loader from "@/app/loading";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function BookDetails() {
  const { bookId } = useParams();

  const [book, setBook] = useState<Book | null>(null);
  const [note, setNote] = useState<string>("");
  const [readingListId, setReadingListId] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (!bookId) return;
    async function load() {
      try {
        // get book data
        const { data: bookData } = await axios.get(`/api/books/${bookId}`);
        setBook(bookData);
        // does book exist in user reading list
        const { data: exists } = await axios.get(
          `/api/books/is-book-in-list/${bookData?.volumeInfo?.id}`
        );
        setReadingListId(exists.id);
        const { data: noteData } = await axios.get(`/api/notes/${exists.id}`);
        setNote(noteData);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [bookId]);

  if (!book) {
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
      startTransition(async () => {
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
    try {
      startTransition(async () => {
        const result = await addBookToListAction(book);
        if (result.noUserError) {
          toast.error(result.noUserError, { icon: "🚫👤" });
        } else if (result.existingEntry) {
          toast.error(result.existingEntry, { icon: "📖📖" });
        } else if (result.insertError) {
          toast.error(result.insertError, { icon: "🚫➕📖" });
        } else {
          toast.success("Book added to your reading list");
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
    startTransition(async () => {
      const result = await addNotesToBook(formData);
      if (result?.newNoteError) {
        toast.error(result.newNoteError);
      } else toast.success("saved note!");
    });
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
    <div className="min-h-screen flex flex-col md:flex-row gap-12 items-center justify-center bg-gray-50 p-6">
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
          <div className="flex gap-4 justify-content-between">
            <Link
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition text-center"
            >
              Preview Book
            </Link>
            {readingListId ? (
              <button
                onClick={handleRemoveBookFromMyList}
                disabled={isPending}
                className="mt-auto inline-block bg-red-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-red-700 transition text-center"
              >
                {isPending ? "Removing book..." : "Remove From List"}
              </button>
            ) : (
              <button
                disabled={isPending}
                onClick={handleAddBookToMyList}
                className="mt-auto inline-block bg-blue-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-blue-700 transition text-center"
              >
                {isPending ? "Adding book..." : "Add To My List"}
              </button>
            )}

            <Toaster />
          </div>
        </div>
      </div>
      <form
        action={handleAddNotesToBook}
        className="bg-white p-6 pb-4 rounded-lg shadow-md mb-6 w-full md:w-[40rem]"
      >
        <input type="hidden" name="readingListId" value={readingListId} />
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
          defaultValue={note}
          onChange={(e) => setNote(e.target.value)}
          value={note}
          placeholder="Write your notes here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="flex justify-end gap-4 mt-2">
          {/* add logic where if no notes are written then btn is disabled */}
          <button className="mt-auto inline-block bg-red-600 text-white font-medium rounded-lg px-3 py-2 hover:bg-red-700 transition text-center">
            Clear
          </button>
          <button className="mt-auto inline-block bg-blue-600 text-white font-medium rounded-lg px-3 py-2 hover:bg-blue-700 transition text-center">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

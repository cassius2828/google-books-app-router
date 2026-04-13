"use client";

import {
  Book,
  ReadingListStatusAndId,
  ReadingListStatus,
} from "@/app/_lib/types";
import { convert } from "html-to-text";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  addBookToListAction,
  addNotesToBook,
  putChangeBookStatusAction,
  removeBookFromListAction,
} from "@/app/_lib/actions";
import {
  getCache,
  setCache,
  invalidateCache,
  invalidateCacheByPrefix,
  bookCacheKey,
  BOOK_TTL_MS,
  READING_LIST_KEY_PREFIX,
} from "@/app/_lib/cache";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import BackButton from "./BackButton";
import BookHero from "./BookHero";
import BookMetadata from "./BookMetadata";
import BookDescription from "./BookDescription";
import BookNotes from "./BookNotes";

export default function BookDetailsContent() {
  const { bookId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState<Book | null>(null);
  const [note, setNote] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [readingListObj, setReadingListObj] = useState<ReadingListStatusAndId>({
    id: "",
    user_id: "",
    book_id: "",
    status: "to_read",
  });

  const [isPendingAddBook, startTransitionAddBook] = useTransition();
  const [isPendingRemoveBook, startTransitionRemoveBook] = useTransition();
  const [isPendingNotes, startTransitionNotes] = useTransition();

  useEffect(() => {
    if (!bookId) return;
    async function load() {
      try {
        const cacheKey = bookCacheKey(String(bookId));
        let bookData = getCache<Book>(cacheKey, BOOK_TTL_MS);

        if (!bookData) {
          const res = await axios.get<Book>(`/api/books/${bookId}`);
          bookData = res.data;
          setCache(cacheKey, bookData);
        }

        setBook(bookData);
        const bookDbId = bookData?.volumeInfo?.id;
        if (bookDbId) {
          const { data: exists } = await axios.get(
            `/api/books/is-book-in-list/${bookDbId}`
          );
          if (exists?.id) {
            setReadingListObj(exists);
            const { data: noteData } = await axios.get(
              `/api/notes/${exists.id}`
            );
            setNote(noteData);
            setDraftNote(noteData);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [bookId]);

  const handleRemoveBookFromMyList = () => {
    try {
      startTransitionRemoveBook(async () => {
        if (readingListObj.book_id) {
          const result = await removeBookFromListAction(
            String(readingListObj.book_id)
          );
          if (result.error) {
            toast.error(result.error);
            return;
          }
          invalidateCacheByPrefix(READING_LIST_KEY_PREFIX);
          toast.success(
            `Removed ${book?.volumeInfo?.title} from your reading list`
          );
          if ("userId" in result && result.userId) {
            router.push(`/reading-list/${result.userId}`);
          }
          return;
        }
        toast.error("Cannot remove book since no book id was found");
      });
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.name;
      else message = String(err);
      toast.error(message);
    }
  };

  const handleAddBookToMyList = () => {
    try {
      startTransitionAddBook(async () => {
        const result = await addBookToListAction(book!);
        if ("noUserError" in result) {
          toast.error(result.noUserError);
        } else if ("existingEntry" in result) {
          toast.error(result.existingEntry);
        } else if ("insertError" in result) {
          toast.error(result.insertError);
        } else {
          invalidateCacheByPrefix(READING_LIST_KEY_PREFIX);
          toast.success("Book added to your reading list");
          setTimeout(() => {
            router.push(`/reading-list/${readingListObj.user_id}`);
          }, 1000);
        }
      });
    } catch (err) {
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
      } else {
        const saved = formData.get("content")?.toString() ?? "";
        setNote(saved);
        setDraftNote(saved);
        setIsEditingNote(false);
        toast.success("Note saved");
      }
    });
  };

  const handleChangeBookStatus = async (status: ReadingListStatus) => {
    const result = await putChangeBookStatusAction(status, readingListObj.id);
    if (result?.error) {
      toast.error(result.error);
    } else {
      invalidateCacheByPrefix(READING_LIST_KEY_PREFIX);
      invalidateCache(bookCacheKey(String(bookId)));
      toast.success("Status updated");
      setReadingListObj((prev) => ({ ...prev, status }));
    }
  };

  const formattedDescription = book?.volumeInfo?.description
    ? convert(book.volumeInfo.description)
    : null;

  return (
    <div className="min-h-screen pb-20">
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "0.75rem",
            fontSize: "0.875rem",
            fontWeight: 500,
          },
        }}
      />

      <BackButton />

      <BookHero
        book={book}
        isLoading={isLoading}
        readingListObj={readingListObj}
        onAddBook={handleAddBookToMyList}
        onRemoveBook={handleRemoveBookFromMyList}
        isPendingAddBook={isPendingAddBook}
        isPendingRemoveBook={isPendingRemoveBook}
      />

      <BookMetadata
        book={book}
        isLoading={isLoading}
        readingListObj={readingListObj}
        onChangeStatus={handleChangeBookStatus}
      />

      <BookDescription
        description={formattedDescription}
        isLoading={isLoading}
      />

      <BookNotes
        readingListObj={readingListObj}
        note={note}
        draftNote={draftNote}
        isEditingNote={isEditingNote}
        isPendingNotes={isPendingNotes}
        isLoading={isLoading}
        onSetDraftNote={setDraftNote}
        onSetIsEditingNote={setIsEditingNote}
        onSaveNotes={handleAddNotesToBook}
        onCancelEdit={() => {
          setDraftNote(note);
          setIsEditingNote(false);
        }}
      />
    </div>
  );
}

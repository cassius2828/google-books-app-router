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
import { resolveCoverImageSrc } from "@/app/_lib/coverImage";
import Loader from "@/app/loading";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft, ExternalLink, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookDetails() {
  const { bookId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [book, setBook] = useState<Book | null>(null);
  const [note, setNote] = useState<string>("");
  const [draftNote, setDraftNote] = useState<string>("");
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
        const { data: bookData } = await axios.get(`/api/books/${bookId}`);
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
        if (readingListObj.book_id) {
          const result = await removeBookFromListAction(
            String(readingListObj.book_id)
          );
          if (result.error) {
            toast.error(result.error);
            return;
          } else {
            toast.success(`Removed ${title} from your reading list`);
            return;
          }
        }
        toast.error("Cannot remove book since no book id was found");
        return;
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
        const result = await addBookToListAction(book);
        if ("noUserError" in result) {
          toast.error(result.noUserError);
        } else if ("existingEntry" in result) {
          toast.error(result.existingEntry);
        } else if ("insertError" in result) {
          toast.error(result.insertError);
        } else {
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
        const saved = formData.get("content") as string;
        setNote(saved);
        setDraftNote(saved);
        setIsEditingNote(false);
        toast.success("Note saved");
      }
    });
  };

  const handleChangeBookStatus = async (status: string) => {
    const result = await putChangeBookStatusAction(status, readingListObj.id);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Status updated");
      setReadingListObj((prev) => ({ ...prev, status }));
    }
  };

  const coverSrc = resolveCoverImageSrc(
    imageLinks,
    process.env.NEXT_PUBLIC_IMG_NOT_FOUND!
  );

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

      {/* Back navigation */}
      <div className="container mx-auto px-6 pt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>

      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 mt-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl mx-auto">
            <div className="w-56 md:w-64 flex-shrink-0">
              <Image
                src={coverSrc}
                alt={title}
                width={280}
                height={420}
                className="w-full h-auto rounded-2xl shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="heading-display text-white mb-4">{title}</h1>
              {authors && (
                <p className="text-lg text-blue-200/80 mb-6">
                  by {authors.join(", ")}
                </p>
              )}

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                {categories?.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="bg-white/10 text-white/90 border-white/10 hover:bg-white/20"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <Button asChild className="rounded-full px-6">
                  <Link
                    href={previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preview Book
                    <ExternalLink className="size-3.5" />
                  </Link>
                </Button>

                {readingListObj.id ? (
                  <Button
                    variant="destructive"
                    className="rounded-full px-6"
                    onClick={handleRemoveBookFromMyList}
                    disabled={isPendingRemoveBook}
                  >
                    {isPendingRemoveBook ? "Removing..." : "Remove From List"}
                  </Button>
                ) : (
                  <button
                    disabled={isPendingAddBook}
                    onClick={handleAddBookToMyList}
                    className="inline-flex items-center justify-center rounded-full px-6 h-9 text-sm font-medium text-white border border-white/25 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isPendingAddBook ? "Adding..." : "Add To My List"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book metadata */}
      <section className="container mx-auto px-6 -mt-6 relative z-10">
        <div className="glass-card-solid max-w-4xl mx-auto rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            {publisher && (
              <div className="text-center">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">
                  Publisher
                </p>
                <p className="font-medium text-foreground">{publisher}</p>
              </div>
            )}
            {publisher && (publishedDate || pageCount) && (
              <Separator orientation="vertical" className="h-8 hidden sm:block" />
            )}
            {publishedDate && (
              <div className="text-center">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">
                  Published
                </p>
                <p className="font-medium text-foreground">{publishedDate}</p>
              </div>
            )}
            {publishedDate && pageCount && (
              <Separator orientation="vertical" className="h-8 hidden sm:block" />
            )}
            {pageCount > 0 && (
              <div className="text-center">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">
                  Pages
                </p>
                <p className="font-medium text-foreground">{pageCount}</p>
              </div>
            )}
            {readingListObj.id && (
              <>
                <Separator
                  orientation="vertical"
                  className="h-8 hidden sm:block"
                />
                <div className="text-center">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <Select
                    value={readingListObj.status}
                    onValueChange={handleChangeBookStatus}
                  >
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to_read">To Read</SelectItem>
                      <SelectItem value="reading">Reading</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      {formattedDescription && (
        <section className="container mx-auto px-6 mt-12 md:mt-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-section text-foreground mb-6">About this book</h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {formattedDescription}
            </p>
          </div>
        </section>
      )}

      {/* Notes */}
      {readingListObj.id && (
        <section className="container mx-auto px-6 mt-12 md:mt-16">
          <div className="max-w-3xl mx-auto">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg">Your Notes</CardTitle>
                {!isEditingNote && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setDraftNote(note); setIsEditingNote(true); }}
                    className="text-muted-foreground hover:text-foreground gap-1.5"
                  >
                    <Pencil className="size-3.5" />
                    {note ? "Edit" : "Add note"}
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isEditingNote ? (
                  <form action={handleAddNotesToBook}>
                    <input
                      type="hidden"
                      name="readingListId"
                      value={readingListObj.id}
                    />
                    <Textarea
                      name="content"
                      id="content"
                      rows={6}
                      onChange={(e) => setDraftNote(e.target.value)}
                      value={draftNote}
                      placeholder="Write your thoughts, quotes, or reflections..."
                      className="resize-none mb-4"
                      autoFocus
                    />
                    <div className="flex items-center justify-end gap-3">
                      {draftNote !== note && (
                        <span className="text-xs text-muted-foreground mr-auto">
                          Unsaved changes
                        </span>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDraftNote(note);
                          setIsEditingNote(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={isPendingNotes || draftNote === note}
                      >
                        {isPendingNotes ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </form>
                ) : note ? (
                  <p
                    className="text-muted-foreground leading-relaxed whitespace-pre-wrap cursor-pointer rounded-lg p-3 -m-3 transition-colors hover:bg-accent/50"
                    onClick={() => { setDraftNote(note); setIsEditingNote(true); }}
                  >
                    {note}
                  </p>
                ) : (
                  <p
                    className="text-muted-foreground/50 italic cursor-pointer rounded-lg p-3 -m-3 transition-colors hover:bg-accent/50"
                    onClick={() => { setDraftNote(""); setIsEditingNote(true); }}
                  >
                    Click to add your thoughts, quotes, or reflections...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}

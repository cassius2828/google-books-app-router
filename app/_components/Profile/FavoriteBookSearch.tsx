"use client";

import { useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import BookCoverImage from "@/app/_components/BookCoverImage";
import { Book } from "@/app/_lib/types";
import { resolveCoverImageSrc } from "@/app/_lib/coverImage";
import { toggleFavoriteBook } from "@/app/_lib/actions";
import toast, { Toaster } from "react-hot-toast";
import { Search, Plus, X } from "lucide-react";
import { useEffect } from "react";

export default function FavoriteBookSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 200);
  const [results, setResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    const search = async () => {
      setIsSearching(true);
      try {
        const { data } = await axios.get(
          `/api/books?q=${encodeURIComponent(debouncedQuery)}`
        );
        if (!cancelled) setResults(data.items?.slice(0, 8) ?? []);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    };
    search();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const handleAdd = (book: Book) => {
    setAddingId(book.id);
    startTransition(async () => {
      const result = await toggleFavoriteBook(book);
      if (result.error) toast.error(result.error);
      else toast.success(result.added ? "Added to favorites!" : "Removed from favorites");
      setAddingId(null);
    });
  };

  return (
    <div className="mb-2">
      <Toaster />
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books to add to favorites..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {(isSearching || results.length > 0) && (
        <div className="mt-2 rounded-xl border border-blue-100/40 glass-card-solid shadow-lg max-h-80 overflow-y-auto">
          {isSearching && results.length === 0 && (
            <p className="text-sm text-gray-400 p-4 text-center">
              Searching...
            </p>
          )}
          {results.map((book) => {
            const thumb = resolveCoverImageSrc(book.volumeInfo.imageLinks);
            return (
              <div
                key={book.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                {thumb ? (
                  <BookCoverImage
                    src={thumb}
                    alt={book.volumeInfo.title}
                    width={36}
                    height={54}
                    className="rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-9 h-[54px] bg-gray-200 rounded flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {book.volumeInfo.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {book.volumeInfo.authors?.join(", ") || "Unknown author"}
                  </p>
                </div>
                <button
                  onClick={() => handleAdd(book)}
                  disabled={isPending && addingId === book.id}
                  className="flex-shrink-0 p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

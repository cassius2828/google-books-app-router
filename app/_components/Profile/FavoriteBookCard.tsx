"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { removeFavoriteBook } from "@/app/_lib/actions";
import { FavoriteBook } from "@/app/_lib/types";
import toast from "react-hot-toast";
import { X } from "lucide-react";

interface FavoriteBookCardProps {
  book: FavoriteBook;
  isOwner: boolean;
}

export default function FavoriteBookCard({
  book,
  isOwner,
}: FavoriteBookCardProps) {
  const [isPending, startTransition] = useTransition();
  const imgSrc =
    book.cover_image || book.thumbnail || process.env.NEXT_PUBLIC_IMG_NOT_FOUND || "";

  const handleRemove = () => {
    startTransition(async () => {
      const result = await removeFavoriteBook(book.id);
      if (result.error) toast.error(result.error);
      else toast.success(`Removed "${book.title}"`);
    });
  };

  return (
    <div className="group relative rounded-xl border border-blue-100/30 glass-card-solid shadow-sm hover:shadow-md transition overflow-hidden">
      {isOwner && (
        <button
          onClick={handleRemove}
          disabled={isPending}
          className="absolute top-1.5 right-1.5 z-10 p-1 rounded-full bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
          aria-label={`Remove ${book.title} from favorites`}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
      <Link href={`/books/${book.google_book_id}`}>
        <div className="aspect-[2/3] relative bg-gray-100">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-xs">
              No Cover
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
            {book.title}
          </p>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {book.authors?.join(", ") || "Unknown"}
          </p>
        </div>
      </Link>
    </div>
  );
}

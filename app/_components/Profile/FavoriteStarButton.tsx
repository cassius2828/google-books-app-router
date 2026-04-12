"use client";

import { useTransition } from "react";
import { toggleFavoriteBook } from "@/app/_lib/actions";
import { Book } from "@/app/_lib/types";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

interface FavoriteStarButtonProps {
  book: Book;
  isFavorite: boolean;
}

export default function FavoriteStarButton({
  book,
  isFavorite: initialFav,
}: FavoriteStarButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleFavoriteBook(book);
      if (result.error) toast.error(result.error);
      else
        toast.success(
          result.added ? "Added to favorites!" : "Removed from favorites"
        );
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="p-1.5 rounded-full hover:bg-pink-50 transition disabled:opacity-50"
      aria-label={initialFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`h-4 w-4 transition ${
          initialFav
            ? "fill-pink-500 text-pink-500"
            : "text-gray-300 hover:text-pink-400"
        }`}
      />
    </button>
  );
}

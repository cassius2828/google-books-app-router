"use client";

import { useState, useTransition } from "react";
import { GENRES } from "@/app/_lib/genres";
import { updateFavoriteGenres } from "@/app/_lib/actions";
import toast, { Toaster } from "react-hot-toast";

interface GenrePickerProps {
  selectedGenres: string[];
}

export default function GenrePicker({ selectedGenres }: GenrePickerProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(selectedGenres)
  );
  const [isPending, startTransition] = useTransition();
  const hasChanges =
    selected.size !== selectedGenres.length ||
    [...selected].some((g) => !selectedGenres.includes(g));

  const toggle = (genre: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(genre)) next.delete(genre);
      else next.add(genre);
      return next;
    });
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateFavoriteGenres([...selected]);
      if (result.error) toast.error(result.error);
      else toast.success("Genres updated!");
    });
  };

  return (
    <div>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        {GENRES.map((genre) => {
          const active = selected.has(genre);
          return (
            <button
              key={genre}
              type="button"
              onClick={() => toggle(genre)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                active
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
      {hasChanges && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Genres"}
          </button>
        </div>
      )}
    </div>
  );
}

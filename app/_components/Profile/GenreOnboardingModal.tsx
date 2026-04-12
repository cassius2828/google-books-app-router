"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { GENRES } from "@/app/_lib/genres";
import { updateFavoriteGenres } from "@/app/_lib/actions";
import { BookOpen, Check } from "lucide-react";

interface GenreOnboardingModalProps {
  profileId: string;
}

export default function GenreOnboardingModal({
  profileId,
}: GenreOnboardingModalProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [dismissed, setDismissed] = useState(false);
  const router = useRouter();

  if (dismissed) return null;

  const toggle = (genre: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(genre)) next.delete(genre);
      else next.add(genre);
      return next;
    });
  };

  const handleSave = () => {
    if (selected.size === 0) return;
    startTransition(async () => {
      await updateFavoriteGenres([...selected]);
      setDismissed(true);
      router.refresh();
    });
  };

  const handleSkip = () => setDismissed(true);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-90" />
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome to LibrisList!
          </h2>
          <p className="text-blue-100 text-sm mt-2 max-w-md mx-auto">
            Tell us what you like to read. Pick your favorite genres and
            we&apos;ll recommend books you&apos;ll love.
          </p>
        </div>

        {/* Genre grid */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <p className="text-sm text-gray-500 mb-4">
            Select at least one genre to get started.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {GENRES.map((genre) => {
              const active = selected.has(genre);
              return (
                <label
                  key={genre}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all text-sm ${
                    active
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all ${
                      active
                        ? "bg-blue-600 text-white"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggle(genre)}
                    className="sr-only"
                  />
                  <span className="font-medium">{genre}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Skip for now
          </button>
          <div className="flex items-center gap-3">
            {selected.size > 0 && (
              <span className="text-xs text-gray-400">
                {selected.size} selected
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={selected.size === 0 || isPending}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : `Save & Continue`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

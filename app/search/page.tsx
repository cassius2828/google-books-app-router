import BooksGallery from "@/app/_components/Books/BooksGallery";
import SearchInput from "../_components/SearchInput";
import { Suspense } from "react";
import BooksGalleryProviderWrapper from "../_components/Books/BooksProviderWrapper";
import SearchResultsSkeleton from "../_components/Books/SearchResultsSkeleton";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

export const metadata = {
  title: "Search Books",
  description: `Search books with LibrisList`,
};

export default function SearchPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 py-20 md:py-28 px-4">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          <h1 className="heading-display text-white mb-3 text-center">
            Find Your Next Read
          </h1>
          <p className="text-blue-200/70 text-lg mb-10 text-center">
            Search millions of books instantly
          </p>

          <div className="w-full max-w-xl space-y-3">
            <Suspense
              fallback={
                <div className="h-12 rounded-full bg-white/10 animate-pulse" />
              }
            >
              <SearchInput />
            </Suspense>

            <Link
              href="/search/advanced"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10 backdrop-blur-sm transition-colors"
            >
              <SlidersHorizontal className="size-4" />
              Advanced Search
            </Link>
          </div>
        </div>
      </section>

      <BooksGalleryProviderWrapper>
        <Suspense fallback={<SearchResultsSkeleton />}>
          <BooksGallery />
        </Suspense>
      </BooksGalleryProviderWrapper>
    </>
  );
}

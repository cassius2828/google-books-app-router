import BooksGallery from "@/app/_components/Books/BooksGallery";
import SearchInput from "../_components/SearchInput";
import { Suspense } from "react";
import BooksGalleryProviderWrapper from "../_components/Books/BooksProviderWrapper";
import Loader from "../loading";
import Link from "next/link";

export const metadata = {
  title: "Search Books",
  description: `Search books with LibrisList`,
};

export default function SearchPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 text-center tracking-tight">
            Find Your Next Read
          </h1>
          <p className="text-blue-100 text-lg mb-8 text-center max-w-lg">
            Search millions of books instantly
          </p>

          <div className="w-full max-w-xl space-y-3">
            <Suspense fallback={<div className="text-white">Loading search…</div>}>
              <SearchInput />
            </Suspense>

            <Link
              href="/search/advanced"
              className="flex items-center justify-center gap-2 w-full border-2 border-white/30 text-white py-3 rounded-lg font-medium hover:bg-white/10 backdrop-blur-sm transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Advanced Search
            </Link>
          </div>
        </div>
      </section>

      <BooksGalleryProviderWrapper>
        <Suspense fallback={<Loader />}>
          <BooksGallery />
        </Suspense>
      </BooksGalleryProviderWrapper>
    </>
  );
}

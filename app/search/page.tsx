// pages/search.tsx
import BooksGallery from "@/app/_components/Books/BooksGallery";
import SearchInput from "../_components/SearchInput";
import { Suspense } from "react";
import BooksGalleryProviderWrapper from "../_components/Books/BooksGalleryProviderWrapper";

export const metadata = {
  title: "Search Books",
  description: `Search books with LibrisList`,
};

export default function SearchPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-start py-20 px-4 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Find Your Next Read
        </h1>
        <div className="w-full max-w-xl">
          <Suspense fallback={<div>Loading search…</div>}>
            <SearchInput />
          </Suspense>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Search
          </button>
        </div>
        {/* wraps with client component so we can use the provider to wrap the books gallery
        -- must wrap them while in a client component, it would not allow us directly in a server component
        */}
        <BooksGalleryProviderWrapper>
          <BooksGallery />
        </BooksGalleryProviderWrapper>
      </main>
    </>
  );
}

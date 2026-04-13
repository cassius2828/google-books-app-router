"use client";

import { useBooksContext } from "@/app/_context/BooksContext";
import SearchResultsSkeleton from "@/app/_components/Books/SearchResultsSkeleton";
import { lazy, Suspense, useEffect } from "react";
import AdvancedSearchForm from "./AdvancedSearchForm";
const AdvancedSearchResults = lazy(() => import("./AdvancedSearchResults"));

export default function AdvancedSearch() {
  const { books, setBooks } = useBooksContext();

  useEffect(() => {
    setBooks([]);
  }, []);

  return (
    <div className="section-padding">
      <AdvancedSearchForm />
      <Suspense fallback={<SearchResultsSkeleton />}>
        <AdvancedSearchResults books={books} />
      </Suspense>
    </div>
  );
}

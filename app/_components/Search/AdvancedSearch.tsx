"use client";

import { useBooksContext } from "@/app/_context/BooksContext";
import Loader from "@/app/loading";
import { lazy, Suspense, useEffect } from "react";
import AdvancedSearchForm from "./AdvancedSearchForm";
const AdvancedSearchResults = lazy(() => import("./AdvancedSearchResults"));

export default function AdvancedSearch() {
  const { books, setBooks, advancedSearchFormData, setAdvancedSearchFormData } =
    useBooksContext();

  // reset books when user navigates to this page
  useEffect(() => {
    setBooks([]);
  }, []);
  return (
    <>
      <AdvancedSearchForm />
      <Suspense fallback={<Loader />}>
        <AdvancedSearchResults books={books} />
      </Suspense>
    </>
  );
}

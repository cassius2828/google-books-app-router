"use client";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useBooksContext } from "@/app/_context/BooksContext";
import { AdvancedSearchParams, Book } from "@/app/_lib/types";
import { buildAdvancedSearchUrl } from "@/app/_lib/utils";

import AuthorInput from "./Inputs/AuthorInput";
import ContentRadios from "./Inputs/ContentRadios";
import FilterContentSelect from "./Inputs/FilterContentSelect";
import InputQueriesContainer from "./Inputs/InputQueriesContainer";
import IsbnInput from "./Inputs/IsbnInput";
import LanguageSelect from "./Inputs/LanguageSelect";
import MaxResultsSelect from "./Inputs/MaxResultsSelect";
import OrderByRadios from "./Inputs/OrderByRadios";
import PublisherInput from "./Inputs/PublisherInput";
import SubjectInputContainer from "./Inputs/Subjects/SubjectInputContainer";
import TitleInput from "./Inputs/TitleInput";
import VolumeIdInput from "./Inputs/VolumeIdInput";

import { useState, useTransition } from "react";
import BtnContainer from "./Buttons/BtnContainer";
import { Separator } from "@/components/ui/separator";

const hasAnyQueryValue = (params: AdvancedSearchParams): boolean => {
  const queryFields: (keyof AdvancedSearchParams)[] = [
    "fullText",
    "exactPhrase",
    "includesText",
    "excludeText",
    "author",
    "title",
    "publisher",
    "isbn",
    "allSubjects",
    "eitherSubject",
    "volumeId",
  ];
  return queryFields.some((key) => params[key].value.trim() !== "");
};

export default function AdvancedSearchForm() {
  const {
    setBooks,
    advancedSearchFormData,
    setAdvancedSearchFormData,
    scrollToSection,
    advancedSearchResultsRef,
    setAdvancedSearchTotalItems,
    setAdvancedSearchLastQuery,
  } = useBooksContext();
  const [isPendingBooks, startBooksTransition] = useTransition();
  const [validationError, setValidationError] = useState("");

  const fetchBooks = async () => {
    const { volumeId } = advancedSearchFormData;
    const isVolumeIDSearch = Boolean(volumeId.value);

    const query = buildAdvancedSearchUrl(advancedSearchFormData);

    try {
      const { data: resp } = await axios.get(
        `/api/books/advanced-search${isVolumeIDSearch ? "/" : "?"}${query}`
      );
      const items: Book[] = resp.items ?? resp;
      const totalItems: number = resp.totalItems ?? items.length;
      setBooks(items);
      setAdvancedSearchTotalItems(totalItems);
      setAdvancedSearchLastQuery(query);
      scrollToSection(advancedSearchResultsRef);
    } catch (err) {
      console.error(err);
      setBooks([]);
      setAdvancedSearchTotalItems(0);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValidationError("");
    setAdvancedSearchFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAnyQueryValue(advancedSearchFormData)) {
      setValidationError("Please fill in at least one search field.");
      return;
    }
    setValidationError("");
    startBooksTransition(async () => await fetchBooks());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto mt-8 md:mt-12 space-y-8"
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="heading-section text-foreground">Advanced Search</h1>
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Search
        </Link>
      </div>

      {/* Find results section */}
      <div className="glass-card-solid rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Find results
          </h2>
          <MaxResultsSelect
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
        </div>

        <InputQueriesContainer
          params={advancedSearchFormData}
          handleChange={handleChange}
        />
      </div>

      {/* Narrow your results section */}
      <div className="glass-card-solid rounded-2xl p-6 md:p-8 space-y-6">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Narrow your results by
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TitleInput
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
          <AuthorInput
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
          <PublisherInput
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
          <IsbnInput
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
          <LanguageSelect
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
        </div>

        <Separator />

        <SubjectInputContainer
          handleChange={handleChange}
          params={advancedSearchFormData}
          setParams={setAdvancedSearchFormData}
        />
      </div>

      {/* Search options section */}
      <div className="glass-card-solid rounded-2xl p-6 md:p-8 space-y-6">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Search options
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ContentRadios
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
          <OrderByRadios
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
          <FilterContentSelect
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
        </div>
      </div>

      {/* Volume ID lookup section */}
      <div className="glass-card-solid rounded-2xl p-6 md:p-8 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Direct volume lookup
        </h2>
        <p className="text-sm text-muted-foreground">
          Search by a specific Google Books volume ID. This bypasses all other
          search fields above.
        </p>
        <div className="max-w-sm">
          <VolumeIdInput
            params={advancedSearchFormData}
            handleChange={handleChange}
          />
        </div>
      </div>

      {validationError && (
        <p className="text-sm text-destructive text-center font-medium">
          {validationError}
        </p>
      )}

      <BtnContainer isPending={isPendingBooks} />
    </form>
  );
}

"use client";
import axios from "axios";

import { useBooksContext } from "@/app/_context/BooksContext";
import { Book } from "@/app/_lib/types";
import { buildAdvancedSearchUrl } from "@/app/_lib/utils";

import AuthorInput from "./Inputs/AuthorInput";
import ContentRadios from "./Inputs/ContentRadios";
import FilterContentSelect from "./Inputs/FilterContentSelect";
import InputQueriesContainer from "./Inputs/InputQueriesContainer";
import LanguageSelect from "./Inputs/LanguageSelect";
import MaxResultsSelect from "./Inputs/MaxResultsSelect";
import OrderByRadios from "./Inputs/OrderByRadios";
import PublisherInput from "./Inputs/PublisherInput";
import SubjectInputContainer from "./Inputs/Subjects/SubjectInputContainer";
import TitleInput from "./Inputs/TitleInput";
import VolumeIdInput from "./Inputs/VolumeIdInput";

import { useTransition } from "react";
import BtnContainer from "./Buttons/BtnContainer";

export default function AdvancedSearchForm() {
  // books context
  const {
    setBooks,
    advancedSearchFormData,
    setAdvancedSearchFormData,
    scrollToSection,
    advancedSearchResultsRef,
  } = useBooksContext();
  // transition
  const [isPendingBooks, startBooksTransition] = useTransition();

  const fetchBooks = async () => {
    const { volumeId } = advancedSearchFormData;
    const isVolumeIDSearch = Boolean(volumeId.value);

    const query = buildAdvancedSearchUrl(advancedSearchFormData);

    try {
      const { data: resp } = await axios.get<Book[]>(
        // solves issue of leading "?" when searching for vol by id
        `/api/books/advanced-search${isVolumeIDSearch ? "/" : "?"}${query}`
      );
      setBooks(resp);
      // scroll to results
      scrollToSection(advancedSearchResultsRef);
    } catch (err) {
      console.error(err);
      setBooks([]);
    }
  };

  ///////////////////////////
  // Handlers
  ///////////////////////////

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAdvancedSearchFormData((prev) => ({
      ...prev,
      [name]: {
        // take whatever was in prev[name] (the whole SearchParam)
        ...prev[name as keyof typeof prev],
        value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startBooksTransition(async () => await fetchBooks());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 text-xs mt-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        LibrisList | Advanced Search 🔎
      </h2>
      {/* top section */}
      <div className="flex flex-col md:flex-row items-start max-w-4xl">
        <span className="md:mx-5 mb-5 text-sm w-32 font-bold mt-3">
          Find results
        </span>

        <InputQueriesContainer
          params={advancedSearchFormData}
          handleChange={handleChange}
        />

        <MaxResultsSelect
          params={advancedSearchFormData}
          handleChange={handleChange}
        />
      </div>
      {/* bottom section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl gap-4">
        <ContentRadios
          params={advancedSearchFormData}
          handleChange={handleChange}
        />

        <LanguageSelect
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

        <VolumeIdInput
          params={advancedSearchFormData}
          handleChange={handleChange}
        />

        <AuthorInput
          params={advancedSearchFormData}
          handleChange={handleChange}
        />

        <TitleInput
          params={advancedSearchFormData}
          handleChange={handleChange}
        />

        <PublisherInput
          params={advancedSearchFormData}
          handleChange={handleChange}
        />
        <SubjectInputContainer
          handleChange={handleChange}
          params={advancedSearchFormData}
          setParams={setAdvancedSearchFormData}
        />
      </div>
      <BtnContainer isPending={isPendingBooks} />
    </form>
  );
}

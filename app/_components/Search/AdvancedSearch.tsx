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
import AllSubjectsInput from "./Inputs/Subjects/AllSubjectsInput";
import EitherSubjectInput from "./Inputs/Subjects/EitherSubjectInput";
import TitleInput from "./Inputs/TitleInput";
import VolumeIdInput from "./Inputs/VolumeIdInput";

import SearchBtn from "./SearchBtn";
import { useState } from "react";
import SubjectInputContainer from "./Inputs/Subjects/SubjectInputContainer";

export default function AdvancedSearch() {
  const { setBooks, advancedSearchFormData, setAdvancedSearchFormData } =
    useBooksContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(advancedSearchFormData);
    setAdvancedSearchFormData((prev) => ({
      ...prev,
      [name]: {
        // take whatever was in prev[name] (the whole SearchParam)
        ...prev[name as keyof typeof prev],
        // then set just its `value`
        value,
      },
    }));
  };

  // be used for "filter" part of url
  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAdvancedSearchFormData((prev) => ({
      ...prev,
      [name]: { ...[name], value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // solves issue of leading "?" when searching for vol by id
    const isVolumeIDSearch = !!advancedSearchFormData.volumeId.value;
    e.preventDefault();
    const query = buildAdvancedSearchUrl(advancedSearchFormData);
    console.log(query, " <-- result of build query");
    const books: Book[] = await axios.get(
      `/api/books/advanced-search${isVolumeIDSearch ? "/" : "?"}${query}`
    );
    console.log(books, "<-- BOOKS FORM PROXY");
    setBooks(books);
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
          handleChange={handleRadioChange}
        />

        <LanguageSelect
          params={advancedSearchFormData}
          handleChange={handleChange}
        />

        <OrderByRadios
          params={advancedSearchFormData}
          handleChange={handleRadioChange}
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
          advancedSearchFormData={advancedSearchFormData}
          setAdvancedSearchFormData={setAdvancedSearchFormData}
        />
      </div>

      <SearchBtn />
    </form>
  );
}

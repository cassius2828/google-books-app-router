"use client";

import { useBooksContext } from "@/app/_context/BooksContext";
import { AdvancedSearchParams, Book } from "@/app/_lib/types";

import axios from "axios";
import { useState } from "react";
import AuthorInput from "./Inputs/AuthorInput";
import ContentRadios from "./Inputs/ContentRadios";
import FilterContentSelect from "./Inputs/FilterContentSelect";
import InputQueriesContainer from "./Inputs/InputQueriesContainer";
import LanguageSelect from "./Inputs/LanguageSelect";
import MaxResultsSelect from "./Inputs/MaxResultsSelect";
import OrderByRadios from "./Inputs/OrderByRadios";
import PublisherInput from "./Inputs/PublisherInput";

import TitleInput from "./Inputs/TitleInput";
import VolumeIdInput from "./Inputs/VolumeIdInput";
import SearchBtn from "./SearchBtn";
import { buildAdvancedSearchUrl } from "@/app/_lib/utils";
import AllSubjectsInput from "./Inputs/AllSubjectsInput";
import EitherSubjectInput from "./Inputs/EitherSubjectInput";

const exampleObj: AdvancedSearchParams = {
  // replace spaces with + -- q=example+here+you+go
  fullText: {
    value: "",
    type: "query",
  },
  // add " " around words for eact phrase q="example"
  exactPhrase: {
    value: "",
    type: "query",
  },
  // excludes text from search results -- q=-badguys
  excludeText: {
    value: "Cookie",
    type: "query",
  },
  // separate words by pipe q=example|here
  includesText: {
    value: "brownie",
    type: "query",
  },
  // max value of results
  maxResults: {
    value: "",
    type: "independent",
  },
  // langRestrict=en
  langRestrict: {
    value: "en",
    type: "independent",
  },
  // orderBy=relevance
  orderBy: {
    value: "relevance",
    type: "independent",
  },
  // printType=all
  printType: {
    value: "all",
    type: "independent",
  },
  // will query by itself, replaces finalStr in fn
  volumeId: {
    value: "",
    type: "independent",
  },
  // q=inauthor:Lemony+Snicket
  author: {
    value: "Laura Numeroff",
    type: "query",
  },
  // &filter=ebooks
  filter: {
    value: "ebooks",
    type: "independent",
  },
  // q=intitle:Series+of+unfortunate+events
  title: {
    value: "",
    type: "query",
  },
  // q=inpublisher:Tin+House
  publisher: {
    value: "",
    type: "query",
  },
  // q=subject:finance|self-help
  eitherSubject: {
    value: "",
    type: "query",
  },
  // q=subject:finance+subject:self-help
  allSubjects: {
    value: "",
    type: "query",
  },
};

export default function AdvancedSearch() {
  const { setBooks } = useBooksContext();
  const [params, setParams] = useState<AdvancedSearchParams>(exampleObj);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  // be used for "filter" part of url
  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = buildAdvancedSearchUrl(params);
    console.log(query, " <-- result of build query");
    const books: Book[] = await axios.get(
      `/api/books/advanced-search?${query}`
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

        <InputQueriesContainer params={params} handleChange={handleChange} />

        <MaxResultsSelect params={params} handleChange={handleChange} />
      </div>
      {/* bottom section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl gap-4">
        <ContentRadios params={params} handleChange={handleRadioChange} />

        <LanguageSelect params={params} handleChange={handleChange} />

        <OrderByRadios />

        <FilterContentSelect params={params} handleChange={handleChange} />

        <VolumeIdInput params={params} handleChange={handleChange} />

        <AuthorInput params={params} handleChange={handleChange} />

        <TitleInput params={params} handleChange={handleChange} />

        <PublisherInput params={params} handleChange={handleChange} />

        {true ? (
          <AllSubjectsInput params={params} handleChange={handleChange} />
        ) : (
          <EitherSubjectInput params={params} handleChange={handleChange} />
        )}
      </div>

      <SearchBtn />
    </form>
  );
}

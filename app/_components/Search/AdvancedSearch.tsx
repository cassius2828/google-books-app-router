"use client";

import { useBooksContext } from "@/app/_context/BooksContext";
import { advancedSearchAction } from "@/app/_lib/actions";
import { AdvancedSearchParams, Book } from "@/app/_lib/types";
import { buildAdvancedSearchParamsQuery } from "@/app/_lib/utils";
import axios from "axios";
import { useState } from "react";
import InputQueriesContainer from "./Inputs/InputQueriesContainer";
import LanguageSelect from "./Inputs/LanguageSelect";
import ContentRadios from "./Inputs/ContentRadios";
import OrderByRadios from "./Inputs/OrderByRadios";
import FilterContentSelect from "./Inputs/FilterContentSelect";
import VolumeIdInput from "./Inputs/VolumeIdInput";
import AuthorInput from "./Inputs/AuthorInput";
import TitleInput from "./Inputs/TitleInput";
import PublisherInput from "./Inputs/PublisherInput";
import SubjectInput from "./Inputs/SubjectInput";
import SearchBtn from "./SearchBtn";
import MaxResultsSelect from "./Inputs/MaxResultsSelect";
import PublicationDateInput from "./Inputs/PublicationDateInput";

const exampleObj: AdvancedSearchParams = {
  // replace spaces with + -- q=example+here+you+go
  fullText: {
    value: "if you give a mouse a",
    type: "query",
  },
  // add " " around words for eact phrase q="example"
  exactPhrase: {
    value: "cookie",
    type: "query",
  },
  // excludes text from search results -- q=-badguys
  excludeText: {
    value: "pig bacon",
    type: "query",
  },
  // separate words by pipe q=example|here
  includesText: {
    value: "",
    type: "query",
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
  // q=intitle:Series+of+unfortunate+events
  title: {
    value: "if you give a mouse a",
    type: "query",
  },
  // q=inpublisher:Tin+House
  publisher: {
    value: "HarperCollins",
    type: "query",
  },
  // q=subject:finance|self-help
  subject: {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const builtParams = buildAdvancedSearchParamsQuery(params);
    console.log(builtParams, ' <-- result of build params')
    const books: Book[] = await axios.get(
      `/api/books/advanced-search?${builtParams}`
    );
    console.log(books, '<-- BOOKS FORM PROXY')
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
        <ContentRadios />

        <LanguageSelect params={params} handleChange={handleChange} />

        <OrderByRadios />

        <FilterContentSelect params={params} handleChange={handleChange} />

        <VolumeIdInput params={params} handleChange={handleChange} />

        <AuthorInput params={params} handleChange={handleChange} />

        <TitleInput params={params} handleChange={handleChange} />

        <PublisherInput params={params} handleChange={handleChange} />

        <SubjectInput params={params} handleChange={handleChange} />

        <PublicationDateInput />
      </div>

      <SearchBtn />
    </form>
  );
}

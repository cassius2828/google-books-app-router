// app/_lib/context/BooksContext.tsx
import { AdvancedSearchParams, Book, BookContextType } from "@/app/_lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

const BooksContext = createContext<BookContextType | undefined>(undefined);
const initialSearchObj: AdvancedSearchParams = {
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
export const BooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [advancedSearchFormData, setAdvancedSearchFormData] =
    useState<AdvancedSearchParams>(initialSearchObj);
  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        advancedSearchFormData,
        setAdvancedSearchFormData,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = (): BookContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }
  return context;
};

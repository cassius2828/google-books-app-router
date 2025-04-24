// app/_lib/context/BooksContext.tsx
import { AdvancedSearchParams, Book, BookContextType } from "@/app/_lib/types";
import React, {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";

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
    value: "",
    type: "query",
  },
  // separate words by pipe q=example|here
  includesText: {
    value: "",
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
    value: "",
    type: "query",
  },
  // &filter=ebooks
  filter: {
    value: "full",
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
  const advancedSearchResultsRef = useRef(null);
  const [advancedSearchFormData, setAdvancedSearchFormData] =
    useState<AdvancedSearchParams>(initialSearchObj);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
    console.log(ref, ' <-- REF ')
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        advancedSearchFormData,
        setAdvancedSearchFormData,
        breakpointColumnsObj,
        initialSearchObj,
        advancedSearchResultsRef,
        scrollToSection,
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

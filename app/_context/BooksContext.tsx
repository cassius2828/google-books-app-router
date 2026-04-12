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
  fullText: { value: "", type: "query" },
  exactPhrase: { value: "", type: "query" },
  excludeText: { value: "", type: "query" },
  includesText: { value: "", type: "query" },
  maxResults: { value: "", type: "independent" },
  langRestrict: { value: "en", type: "independent" },
  orderBy: { value: "relevance", type: "independent" },
  printType: { value: "all", type: "independent" },
  filter: { value: "", type: "independent" },
  volumeId: { value: "", type: "independent" },
  author: { value: "", type: "query" },
  title: { value: "", type: "query" },
  publisher: { value: "", type: "query" },
  isbn: { value: "", type: "query" },
  eitherSubject: { value: "", type: "query" },
  allSubjects: { value: "", type: "query" },
};
export const BooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [advancedSearchTotalItems, setAdvancedSearchTotalItems] = useState(0);
  const [advancedSearchLastQuery, setAdvancedSearchLastQuery] = useState("");
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
        advancedSearchTotalItems,
        setAdvancedSearchTotalItems,
        advancedSearchLastQuery,
        setAdvancedSearchLastQuery,
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

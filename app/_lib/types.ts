import { Dispatch, SetStateAction } from "react";

///////////////////////////
// Books
///////////////////////////
export type Book = {
  id: string;
  volumeInfo: VolumeInfo;
};
export type BookContextType = {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
  advancedSearchFormData: AdvancedSearchParams;
  setAdvancedSearchFormData: Dispatch<SetStateAction<AdvancedSearchParams>>;
  breakpointColumnsObj: BreakpointColumns;
  initialSearchObj: AdvancedSearchParams;
};

export type GoogleBooksAPIResponse = Book[];

// single‐volume case
interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string[];
  previewLink: string;
  google_book_id?: string;
  imageLinks: {
    cover_image?: string;
    extraLarge?: string;
    large?: string;
    medium?: string;
    small?: string;
    thumbnail?: string;
    smallThumbnail?: string;
  };
}
export interface BookRecord {
  id: string;
  google_book_id: string;
  title: string;
  authors: string[];
  publisher: string;
  published_date: string;
  description: string;
  page_count: number;
  categories: string[];
  thumbnail: string;
  cover_image: string;
  preview_link: string;
  created_at: string; // ISO timestamp from Postgres
}
export type GalleryBookCardProps = {
  id: string;
  authors: string[];
  categories: string[];
  description: string;
  pageCount: number;
  previewLink: string;
  publishedDate: string;
  imageLinks: ImageLinks;
  title: string;
};

///////////////////////////
// Reading List
///////////////////////////

export interface ReadingListDBRow {
  status: "to_read" | "reading" | "completed";
  books: BookRecord; // nested under the `books` key by PostgREST
}
export interface ReadingListStatusAndId {
  id: string;
  user_id: string;
  book_id: string;
  status: string;
}

///////////////////////////
// Advanced Search
///////////////////////////
export type ParamType = "query" | "independent";

export interface SearchParam {
  value: string;
  type: ParamType;
}

export interface AdvancedSearchParams {
  fullText: SearchParam;
  exactPhrase: SearchParam;
  excludeText: SearchParam;
  maxResults: SearchParam;
  includesText: SearchParam;
  langRestrict: SearchParam;
  filter: SearchParam;
  orderBy: SearchParam;
  printType: SearchParam;
  volumeId: SearchParam;
  author: SearchParam;
  title: SearchParam;
  publisher: SearchParam;
  allSubjects: SearchParam;
  eitherSubject: SearchParam;
}

export interface AdvancedSearchInputParams {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  params: AdvancedSearchParams;
}

export interface AdvancedSearchInputParamsWithSetter {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  params: AdvancedSearchParams;
  setParams: Dispatch<SetStateAction<AdvancedSearchParams>>;
}

///////////////////////////
// Misc
///////////////////////////
interface BreakpointColumns {
  /** Fallback column count when no other breakpoint matches */
  default: number;
  /** Any other numeric breakpoint → column count */
  [minWidth: number]: number;
}

interface ImageLinks {
  cover_image?: string;
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

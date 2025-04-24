import { Dispatch, SetStateAction } from "react";

// types.ts
export type Book = {
  id: string;
  volumeInfo: VolumeInfo;
};

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

export type BookContextType = {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
  advancedSearchFormData: AdvancedSearchParams;
  setAdvancedSearchFormData: Dispatch<SetStateAction<AdvancedSearchParams>>;
  breakpointColumnsObj: BreakpointColumns;
};
interface BreakpointColumns {
  /** Fallback column count when no other breakpoint matches */
  default: number;
  /** Any other numeric breakpoint → column count */
  [minWidth: number]: number;
}
export interface ReadingListItem {
  books: {
    id: string;
    google_book_id: string;
    title: string;
    thumbnail: string;
    cover_image: string;
    description: string;
    authors: string[];
  };
  status: "to_read" | "reading" | "completed";
}

export type ReadingListDBItem = {
  id: string;
  user_id: string;
  book_id: string;
  status: "to_read" | "reading" | "completed";
  updated_at: Date;
  created_at: Date;
};

// types.ts

/**
 * The raw “books” row you get back from the DB
 */
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

/**
 * One row of the joined reading_list ⇄ books query
 */
export interface ReadingListDBRow {
  status: "to_read" | "reading" | "completed";
  books: BookRecord; // nested under the `books` key by PostgREST
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

export interface ReadingListStatusAndId {
  id: string;
  user_id: string;
  book_id: string;
  status: string;
}

// types.ts

/**
 * Distinguishes parameters that build up the `q=` string vs.
 * those sent independently (e.g. langRestrict, orderBy).
 */
export type ParamType = "query" | "independent";

/**
 * Configuration for a single search parameter.
 */
export interface SearchParam {
  value: string;
  type: ParamType;
}

/**
 * All possible parameters for the advanced Google Books search.
 */
export interface AdvancedSearchParams {
  /** Space-separated full text terms (spaces → '+') */
  fullText: SearchParam; // type: "query"

  /** Exact phrase search (enclose in quotes) */
  exactPhrase: SearchParam; // type: "query"

  /** Terms to exclude (prefix with '-') */
  excludeText: SearchParam; // type: "query"

  maxResults: SearchParam;

  /** Terms to include as alternates (pipe-separated) */
  includesText: SearchParam; // type: "query"

  /** Restrict results to a specific language (ISO code) */
  langRestrict: SearchParam; // type: "independent"

  filter: SearchParam; // type: "independent"

  /** Order results by 'relevance' or 'newest' */
  orderBy: SearchParam; // type: "independent"

  /** Filter by print type: 'all' | 'books' | 'magazines' */
  printType: SearchParam; // type: "independent"

  /** Volume ID to fetch a single book directly */
  volumeId: SearchParam; // type: "independent"

  /** Author-specific filter (prefix with 'inauthor:') */
  author: SearchParam; // type: "query"

  /** Title-specific filter (prefix with 'intitle:') */
  title: SearchParam; // type: "query"

  /** Publisher-specific filter (prefix with 'inpublisher:') */
  publisher: SearchParam; // type: "query"

  /** Subject-specific filter (prefix with 'subject:', pipe-delimited) */
  allSubjects: SearchParam; // type: "query"

  eitherSubject: SearchParam; // type: "query"
}

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

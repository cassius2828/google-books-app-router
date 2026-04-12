import { Dispatch, RefObject, SetStateAction } from "react";

///////////////////////////
// Google Books API
///////////////////////////
export interface GoogleBooksVolumesResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBooksVolume[];
}

export interface GoogleBooksVolume {
  id: string;
  volumeInfo: VolumeInfo;
}

///////////////////////////
// Books
///////////////////////////
export type Book = {
  id: string;
  volumeInfo: VolumeInfo;
};

export interface VolumeInfo {
  id?: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string[];
  previewLink: string;
  google_book_id?: string;
  imageLinks: ImageLinks;
}

export interface ImageLinks {
  cover_image?: string;
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
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
  created_at: string;
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

export interface FavoriteBook {
  id: string;
  google_book_id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  cover_image: string;
}

///////////////////////////
// Reading List
///////////////////////////
export type ReadingListStatus = "to_read" | "reading" | "completed";

export interface ReadingListDBRow {
  readingListId: string;
  status: ReadingListStatus;
  books: BookRecord;
  notes: Array<{ id: string; content: string }>;
}

export interface ReadingListStatusAndId {
  id: string;
  user_id: string;
  book_id: string;
  status: ReadingListStatus;
}

///////////////////////////
// Users
///////////////////////////
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  favoriteGenres: string[];
  favoriteBooks: FavoriteBook[];
  isProfilePublic: boolean;
  createdAt: string;
}

export interface PublicUserResult {
  id: string;
  name: string;
  image: string | null;
  favoriteGenres: string[];
  bookCount: number;
}

///////////////////////////
// Pages
///////////////////////////
export type UserPageParams = { params: Promise<{ userId: string }> };

///////////////////////////
// Context
///////////////////////////
export type BookContextType = {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
  advancedSearchFormData: AdvancedSearchParams;
  setAdvancedSearchFormData: Dispatch<SetStateAction<AdvancedSearchParams>>;
  breakpointColumnsObj: BreakpointColumns;
  initialSearchObj: AdvancedSearchParams;
  advancedSearchResultsRef: RefObject<HTMLElement | null>;
  scrollToSection: (ref: RefObject<HTMLElement | null>) => void;
  advancedSearchTotalItems: number;
  setAdvancedSearchTotalItems: Dispatch<SetStateAction<number>>;
  advancedSearchLastQuery: string;
  setAdvancedSearchLastQuery: Dispatch<SetStateAction<string>>;
};

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
  isbn: SearchParam;
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
  default: number;
  [minWidth: number]: number;
}

import { Dispatch, SetStateAction } from "react";

// types.ts
export type Book = {
  id: string;
  volumeInfo: {
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
      smallThumbnail: string;
      thumbnail: string;
    };
  };
};

export type GalleryBookCardProps = {
  id: string;
  authors: string[];
  categories: string[];
  description: string;
  pageCount: number;
  previewLink: string;
  publishedDate: string;
  thumbnail: string;
  title: string;
};

export type DatabaseBook = {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  published_date: string;
  description: string;
  page_count: number;
  categories: string[];
  language: string;
  avg_rating: number;
  preview_link: string;
  thumbnail_url: string;
  created_at: Date;
};

export type BookContextType = {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
};

export interface ReadingListItem {
  books: {
    id: string;
    google_book_id: string;
    title: string;
    thumbnail: string;
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

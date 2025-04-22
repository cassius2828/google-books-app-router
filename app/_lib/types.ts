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
      cover_image?: string;
      extraLarge?: string;
      large?: string;
      medium?: string;
      small?: string;
      thumbnail?: string;
      smallThumbnail?: string;
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
  imageLinks: ImageLinks;
  title: string;
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
  status: string;
}

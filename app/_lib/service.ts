import { supabase } from "@/supabase/supabase";
import axios from "axios";
import { Book } from "./types";
import { convert } from "html-to-text";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_VOL_URL = `https://www.googleapis.com/books/v1/volumes?q=`;
const BASE_VOL_URL_BY_ID = `https://www.googleapis.com/books/v1/volumes/`;

export const getBooksByTitle = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_VOL_URL}${query}&key=${GOOGLE_API_KEY}`
    );
    return response.data.items;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getBookById = async (id: string) => {
  try {
    const response = await axios.get(
      `${BASE_VOL_URL_BY_ID}${id}?key=${GOOGLE_API_KEY}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPublicUserID = async (email: string) => {
  const { data: publicUser, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching public user ID:", error);
    // handle error…
  } else {
    return publicUser.id;
  }
};

export const postAddBookToDB = async (book: Book) => {
  debugger;
  if (!book) {
    throw new Error("Missing Book");
  }
  const {
    volumeInfo: {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      previewLink,
      imageLinks,
    },
  } = book;
  const formattedDescription = convert(description);

  const existingBook = await getBookFromDB(book.id);
  if (existingBook) return existingBook;

  // insert book if it does not exist in our db
  const { data, error } = await supabase
    .from("books")
    .insert([
      {
        title,
        authors,
        publisher,
        published_date: publishedDate,
        description: formattedDescription,
        page_count: pageCount,
        categories,
        preview_link: previewLink,
        thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail,
        google_book_id: book.id
      },
    ])
    .select()
    .single();
  if (error) throw new Error(`Unable to add book to database: ${error.message}`);
  return data;
};

export const getBookFromDB = async (bookId: string) => {
  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("google_book_id", bookId)
    .maybeSingle();
  if (error) throw new Error("could not get book from database");
  else return data;
};

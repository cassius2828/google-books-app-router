import { supabase } from "@/supabase/supabase";
import axios from "axios";
import { convert } from "html-to-text";
import { Book, ReadingListDBRow } from "./types";
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
    // look in DB for book first
    const existingBook = await getBookFromDB(id);
    // using google id to find the book
    console.log(id, "\n\n\n <-- id to find book \n\n\n");
    console.log(existingBook, "\n\n\n <-- existing book \n\n\n");
    if (existingBook) {
      return {
        volumeInfo: {
          title: existingBook.title,
          authors: existingBook.authors,
          publisher: existingBook.publisher,
          publishedDate: existingBook.published_date,
          description: existingBook.description,
          pageCount: existingBook.page_count,
          categories: existingBook.categories,
          previewLink: existingBook.preview_link,
          google_book_id: existingBook.google_book_id,
          imageLinks: {
            thumbnail: existingBook.thumbnail,
            smallThumbnail: "",
          },
        },
      };
    }

    // fetch book from google if not in db
    const response = await axios.get(
      `${BASE_VOL_URL_BY_ID}${id}?key=${GOOGLE_API_KEY}`
    );

    console.log(response.data, "\n\n\n <-- new book \n\n\n");

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
    throw new Error(
      `Could not get a user_id by the email provided. \nEmail: ${email}`
    );
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

  if (book.volumeInfo.google_book_id) {
    const existingBook = await getBookFromDB(book.volumeInfo.google_book_id);
    if (existingBook) return existingBook;
  }

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
        google_book_id: book.id,
      },
    ])
    .select()
    .single();
  if (error)
    throw new Error(`Unable to add book to database: ${error.message}`);
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

export const getUserReadingList = async (
  userId: string
): Promise<
  ReadingListDBRow[] | { data: []; error: unknown } | { data: [] }
> => {
  if (!userId) {
    return [];
  }
  try {
    const { data, error } = await supabase
      .from("reading_list")
      .select<string, ReadingListDBRow>(`status, books(*)`)
      .eq("user_id", userId);
    if (error) {
      return { data: [], error };
    }

    return data;
  } catch (err) {
    console.error(err);
    return { data: [] };
  }
};

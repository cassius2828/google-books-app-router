import { supabase } from "@/supabase/supabase";
import axios from "axios";
import { convert } from "html-to-text";
import { Book, ReadingListDBRow } from "./types";
import { auth } from "./auth";
import { randomUUID } from "crypto";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_VOL_URL = process.env.BASE_VOL_URL;
const BASE_VOL_URL_BY_ID = `https://www.googleapis.com/books/v1/volumes/`;

export const getBooksByTitle = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_VOL_URL}?q=${query}&key=${GOOGLE_API_KEY}&maxResults=40`
    );
    return response.data;
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
    if (existingBook) {
      return {
        volumeInfo: {
          id: existingBook.id,
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
            cover_image: existingBook.cover_image,
          },
        },
      };
    }

    // fetch book from google if not in db
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
    .select<string>("id")
    .eq("email", email)
    .maybeSingle<{ id: string }>();

  if (error) {
    console.error("Error fetching public user ID:", error);
    throw new Error(
      `Could not get a user_id by the email provided. \nEmail: ${email}`
    );
  } else {
    if (!publicUser) {
      const session = await auth();
      const { data: newUserInsert, error } = await supabase
        .from("users")
        .insert([
          {
            id: randomUUID(),
            username: session?.user?.name,
            email: session?.user?.email,
            avatar: session?.user?.image,
          },
        ])
        .select<string>("id")
        .single<{ id: string }>();
      if (error) {
        console.error("Error creating new user in public DB:", error);
        throw new Error(`Could not create a new user in the public database`);
      }
      if (newUserInsert.id) return newUserInsert.id;
    } else return publicUser.id;
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
        cover_image:
          imageLinks.extraLarge ||
          imageLinks.large ||
          imageLinks.medium ||
          imageLinks.small,
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
  userId: string,
  statusFilter?: string
): Promise<
  ReadingListDBRow[] | { data: []; error: unknown } | { data: [] }
> => {
  if (!userId) {
    return [];
  }
  try {
    if (statusFilter && statusFilter !== "all") {
      const { data, error } = await supabase
        .from("reading_list")
        .select<string, ReadingListDBRow>(`status, books(*), notes(*)`)
        .eq("user_id", userId)
        .eq("status", statusFilter);
      if (error) {
        return { data: [], error };
      }

      return data;
    } else {
      const { data, error } = await supabase
        .from("reading_list")
        .select<string, ReadingListDBRow>(`status, books(*), notes(*)`)
        .eq("user_id", userId);
      if (error) {
        return { data: [], error };
      }

      return data;
    }
  } catch (err) {
    console.error(err);
    return { data: [] };
  }
};

export const getIsBookInUsersList = async (
  userId: string,
  bookId: string
): Promise<{ id?: string; user_id?: string } | null> => {
  const { data, error } = await supabase
    .from("reading_list")
    .select()
    .eq("user_id", userId)
    .eq("book_id", bookId)
    .maybeSingle();

  if (error) {
    return { user_id: userId };
  }

  return data ?? null;
};

export const getNote = async (readingListId: string) => {
  const { data, error } = await supabase
    .from("notes")
    .select("content")
    .eq("reading_list_id", readingListId)
    .maybeSingle();
  if (error) {
    console.error(error);
    throw error;
  }
  return data?.content || "";
};

import axios from "axios";
import { convert } from "html-to-text";
import { Book, ReadingListDBRow } from "./types";
import { auth } from "./auth";
import { connectDB } from "./db";
import {
  UserModel,
  BookModel,
  ReadingListModel,
  NoteModel,
  type BookDoc,
} from "./models";
import { isValidReadingListLookupId } from "./readingListIds";

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
    const existingBook = await getBookFromDB(id);
    if (existingBook) {
      return {
        volumeInfo: {
          id: existingBook._id.toString(),
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

    const response = await axios.get(
      `${BASE_VOL_URL_BY_ID}${id}?key=${GOOGLE_API_KEY}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPublicUserID = async (email: string): Promise<string> => {
  await connectDB();

  const publicUser = await UserModel.findOne({ email }).lean();

  if (publicUser) {
    return publicUser._id.toString();
  }

  const session = await auth();
  const sessionEmail = session?.user?.email;
  if (!sessionEmail) {
    throw new Error("No email found in session");
  }
  const newUser = await UserModel.create({
    username: session?.user?.name ?? "Unknown",
    email: sessionEmail,
    avatar: session?.user?.image ?? null,
  });

  return newUser._id.toString();
};

export const postAddBookToDB = async (book: Book) => {
  if (!book) {
    throw new Error("Missing Book");
  }

  await connectDB();

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

  const newBook = await BookModel.create({
    google_book_id: book.id,
    title,
    authors,
    publisher,
    published_date: publishedDate,
    description: formattedDescription,
    page_count: pageCount,
    categories,
    cover_image:
      imageLinks.extraLarge ||
      imageLinks.large ||
      imageLinks.medium ||
      imageLinks.small ||
      "",
    thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || "",
    preview_link: previewLink,
  });

  return newBook.toObject();
};

export const getBookFromDB = async (
  bookId: string
): Promise<BookDoc | null> => {
  await connectDB();
  return BookModel.findOne({ google_book_id: bookId }).lean<BookDoc>();
};

export const getUserReadingList = async (
  userId: string,
  statusFilter?: string
): Promise<ReadingListDBRow[] | { data: []; error?: unknown }> => {
  if (!userId) {
    return [];
  }
  try {
    await connectDB();

    const query: Record<string, string> = { user_id: userId };
    if (statusFilter && statusFilter !== "all") {
      query.status = statusFilter;
    }

    const entries = await ReadingListModel.find(query)
      .populate("book_id")
      .lean();

    const result: ReadingListDBRow[] = await Promise.all(
      entries.map(async (entry) => {
        const note = await NoteModel.findOne({
          reading_list_id: entry._id,
        }).lean();

        const book = entry.book_id as unknown as BookDoc;
        return {
          status: entry.status,
          books: {
            id: book._id.toString(),
            google_book_id: book.google_book_id,
            title: book.title,
            authors: book.authors,
            publisher: book.publisher,
            published_date: book.published_date,
            description: book.description,
            page_count: book.page_count,
            categories: book.categories,
            thumbnail: book.thumbnail,
            cover_image: book.cover_image,
            preview_link: book.preview_link,
            created_at: (book as unknown as { createdAt?: Date }).createdAt
              ?.toISOString() ?? "",
          },
          notes: note ? [{ id: note._id.toString(), content: note.content }] : [],
        } as unknown as ReadingListDBRow;
      })
    );

    return result;
  } catch (err) {
    console.error(err);
    return { data: [] };
  }
};

export const getIsBookInUsersList = async (
  userId: string,
  bookId: string
): Promise<{
  id?: string;
  user_id?: string;
  book_id?: string;
  status?: string;
} | null> => {
  if (!bookId || !userId) return null;

  if (!isValidReadingListLookupId(bookId)) return null;

  await connectDB();

  const entry = await ReadingListModel.findOne({
    user_id: userId,
    book_id: bookId,
  }).lean();

  if (!entry) return null;

  return {
    id: entry._id.toString(),
    user_id: entry.user_id.toString(),
    book_id: entry.book_id.toString(),
    status: entry.status,
  };
};

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  favoriteGenres: string[];
  favoriteBooks: Array<{
    id: string;
    google_book_id: string;
    title: string;
    authors: string[];
    thumbnail: string;
    cover_image: string;
  }>;
  isProfilePublic: boolean;
  createdAt: string;
}

export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  await connectDB();

  const user = await UserModel.findById(userId)
    .populate("favoriteBooks")
    .lean();

  if (!user) return null;

  const books = (user.favoriteBooks ?? []) as unknown as BookDoc[];

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    favoriteGenres: user.favoriteGenres ?? [],
    favoriteBooks: books.map((b) => ({
      id: b._id.toString(),
      google_book_id: b.google_book_id,
      title: b.title,
      authors: b.authors,
      thumbnail: b.thumbnail,
      cover_image: b.cover_image,
    })),
    isProfilePublic: user.isProfilePublic ?? true,
    createdAt: (user as unknown as { createdAt?: Date }).createdAt?.toISOString() ?? "",
  };
};

export const checkNeedsOnboarding = async (
  userId: string
): Promise<boolean> => {
  await connectDB();
  const user = await UserModel.findById(userId).lean();
  if (!user) return false;
  if ((user.favoriteGenres ?? []).length > 0) return false;

  const readingListCount = await ReadingListModel.countDocuments({
    user_id: userId,
  });
  return readingListCount === 0;
};

export const getRecommendedBooks = async (
  genres: string[],
  maxPerGenre = 4
): Promise<
  Array<{
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
    genre: string;
  }>
> => {
  if (genres.length === 0) return [];

  const results = await Promise.all(
    genres.slice(0, 5).map(async (genre) => {
      try {
        const response = await axios.get(
          `${BASE_VOL_URL}?q=subject:${encodeURIComponent(genre)}&orderBy=relevance&maxResults=${maxPerGenre}&key=${GOOGLE_API_KEY}`
        );
        const items = response.data.items ?? [];
        return items.map(
          (item: { id: string; volumeInfo: { title?: string; authors?: string[]; imageLinks?: { thumbnail?: string } } }) => ({
            id: item.id,
            title: item.volumeInfo?.title ?? "Untitled",
            authors: item.volumeInfo?.authors ?? [],
            thumbnail: item.volumeInfo?.imageLinks?.thumbnail ?? "",
            genre,
          })
        );
      } catch {
        return [];
      }
    })
  );

  return results.flat();
};

export const getNote = async (readingListId: string) => {
  await connectDB();

  const note = await NoteModel.findOne({
    reading_list_id: readingListId,
  }).lean();

  return note?.content || "";
};

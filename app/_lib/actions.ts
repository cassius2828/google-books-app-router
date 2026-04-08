"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getPublicUserID, postAddBookToDB } from "./service";
import { Book } from "./types";
import { connectDB } from "./db";
import { ReadingListModel, NoteModel } from "./models";

export const signInWithGoogle = async () => await signIn("google");
export const signOutAction = async () => await signOut();

type AddBookResult =
  | { noUserError: string }
  | { existingEntry: string }
  | { insertError: string }
  | { success: true };

export const addBookToListAction = async (
  book: Book
): Promise<AddBookResult> => {
  const session = await auth();
  if (!session?.user?.email) {
    return {
      noUserError:
        "No signed\u2011in user was found. Please sign in to continue.",
    };
  }

  const publicUserID = await getPublicUserID(session.user.email);
  const bookFromDB = await postAddBookToDB(book);

  await connectDB();

  const existingEntry = await ReadingListModel.findOne({
    book_id: bookFromDB._id,
    user_id: publicUserID,
  }).lean();

  if (existingEntry) {
    const label = bookFromDB.title || "This book";
    return {
      existingEntry: `"${label}" is already in your list`,
    };
  }

  const newEntry = await ReadingListModel.create({
    user_id: publicUserID,
    book_id: bookFromDB._id,
    status: "reading",
  });

  if (!newEntry) {
    return {
      insertError: `Unable to add ${book.volumeInfo.title || " book"} to reading list`,
    };
  }

  return { success: true };
};

export const removeBookFromListAction = async (bookId: string) => {
  const session = await auth();

  if (!session)
    return {
      statusCode: 403,
      error: "User not authorized to perform this action",
    };

  const userId = await getPublicUserID(session?.user?.email || "");

  await connectDB();

  const result = await ReadingListModel.deleteOne({
    user_id: userId,
    book_id: bookId,
  });

  if (result.deletedCount === 0) {
    return { error: "Unable to remove book from users list", status: 500 };
  }

  redirect(`/reading-list/${userId}`);
};

export const addNotesToBook = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error("Must be signed in to add notes to a book");

  const content = formData.get("content") as string;
  const readingListId = formData.get("readingListId") as string;

  await connectDB();

  const existingNote = await NoteModel.findOne({
    reading_list_id: readingListId,
  });

  if (existingNote) {
    existingNote.content = content;
    await existingNote.save();
  } else {
    const result = await NoteModel.create({
      reading_list_id: readingListId,
      content,
    });

    if (!result) {
      return {
        statusCode: 500,
        newNoteError: `Unable to create new note`,
      };
    }
  }

  revalidatePath("/books/*");
};

export const putChangeBookStatusAction = async (
  status: string,
  id: string
) => {
  const session = await auth();

  await connectDB();

  const result = await ReadingListModel.findByIdAndUpdate(id, { status });

  if (!result) {
    return {
      statusCode: 500,
      error: `Unable to update status for this book`,
    };
  }

  revalidatePath(`/reading-list/${session?.user?.id}`);
};

"use server";
import { supabase } from "@/supabase/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getPublicUserID, postAddBookToDB } from "./service";
import { Book } from "./types";

export const signInWithGoogle = async () => await signIn("google");
export const singOutAction = async () => await signOut();

// docs say to avoid try catch and throwing errors in action fns
export const addBookToListAction = async (book: Book) => {
  const session = await auth();
  if (session?.user?.email) {
    // get public user
    const publicUserID = await getPublicUserID(session?.user?.email);
    // add book to db
    // this causes a mismatch between google id and book id since they are structured differently form db to api call

    const bookFromDB = await postAddBookToDB(book);
    // check for duplicate entry in reading list
    const { data: existingEntry, error: selectErr } = await supabase
      .from("reading_list")
      .select()
      .eq("book_id", bookFromDB.id)
      .eq("user_id", publicUserID)
      .maybeSingle();

    // ? suppose i keep this since this would be an unexpected error imo
    if (selectErr) throw new Error(selectErr.message);

    // handle duplicate entry
    if (existingEntry) {
      const label = bookFromDB.title || "This book";
      return {
        existingEntry: `"${label}" is already in your list`,
      };
    }

    // insert and select new entry in reading list
    const { data, error: insertError } = await supabase
      .from("reading_list")
      .insert([
        {
          user_id: publicUserID,
          book_id: bookFromDB.id,
          status: "reading",
        },
      ])
      .select()
      .single();

    // handle insert error in reading list
    if (insertError) {
      return {
        insertError: `Unable to add ${
          book.volumeInfo.title || " book"
        } to reading list`,
      };
    }

    // return new entry in reading list
    return data;
  } else {
    // handle no user error
    return {
      noUserError: "No signed‑in user was found. Please sign in to continue.",
    };
  }
};

export const removeBookFromListAction = async (bookId: string) => {
  const session = await auth();
  const userId = await getPublicUserID(session?.user?.email || "");
  console.log(userId, " \n\n<-- USER ID \n\n");
  if (!session)
    return {
      statusCode: 403,
      error: "User not authorized to perform this action",
    };

  const { error } = await supabase
    .from("reading_list")
    .delete()
    .eq("user_id", userId)
    .eq("book_id", bookId);

  if (error) {
    console.error(error);
    return { error: "Unable to remove book from users list", status: 500 };
  } else redirect(`/reading-list/${userId}`);
};

// export const getUserReadingListAction = async (params:type) => {

// }
export const addNotesToBook = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error("Must be signed in to add notes to a book");

  const content = formData.get("content");
  const readingListId = formData.get("readingListId");
  const { data: existingNote, error: existingError } = await supabase
    .from("notes")
    .select()
    .eq("reading_list_id", readingListId)
    .maybeSingle();

  if (existingError) {
    throw new Error(`unexpected error when looking for existing user.`);
  }

  if (existingNote) {
    // 2️⃣ update the existing note
    const { error: updateError } = await supabase
      .from("notes")
      .update({ content })
      .eq("id", existingNote.id);

    if (updateError) {
      throw new Error("Unable to update note");
    }
  } else {
    const { error: newNoteError } = await supabase.from("notes").insert([
      {
        reading_list_id: readingListId,
        content,
      },
    ]);

    // can return this value since we have a handle function that does not return a value in the
    // action handler on the client
    if (newNoteError) {
      return {
        statusCode: 500,
        newNoteError: `Unable to create new note`,
      };
    }
  }
  revalidatePath("/books/*");
};

export const putChangeBookStatusAction = async (status: string, id: string) => {
  const session = await auth();
  console.log(status, " \n\n <-- status \n\n");
  const { error } = await supabase
    .from("reading_list")
    .update([
      {
        status,
      },
    ])
    .eq("id", id);

  if (error) {
    return {
      statusCode: 500,
      error: `Unable to update status for this book`,
    };
  }

  revalidatePath(`/reading-list/${session?.user?.id}`);
};

"use server";
import { supabase } from "@/supabase/supabase";
import { auth, signIn, signOut } from "./auth";
import { Book } from "./types";
import { getPublicUserID, postAddBookToDB } from "./service";

export const signInWithGoogle = async () => await signIn("google");
export const singOutAction = async () => await signOut();

export const addBookToListAction = async (book: Book) => {
  const session = await auth();
  if (session?.user?.email) {
    // get public user
    const publicUserID = await getPublicUserID(session?.user?.email);
    // add book to db
    const bookFromDB = await postAddBookToDB(book);
    const { data: existingEntry, error: selectErr } = await supabase
      .from("reading_list")
      .select()
      .eq("book_id", bookFromDB.id)
      .eq("user_id", publicUserID)
      .maybeSingle();

    if (selectErr) throw new Error(selectErr.message);

    if (existingEntry)
      throw new Error("This user already has this book in their reading list");

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
    if (insertError) {
      console.error(insertError);
      throw new Error(
        `Unable to add ${book.volumeInfo.title || " book"} to reading list\n ${
          insertError.message
        }`
      );
    }
    return data;
  } else {
    throw new Error(
      "No signed in user email was found. Please sign in to add a book to your reading list."
    );
  }
};

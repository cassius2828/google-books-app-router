"use server";
import { supabase } from "@/supabase/supabase";
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
      const label = bookFromDB.title || 'This book';
      return {
        existingEntry: `"${label}" is already in your list`
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

// export const getUserReadingListAction = async (params:type) => {
  
// }
import { supabase } from "@/supabase/supabase";
import axios from "axios";
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

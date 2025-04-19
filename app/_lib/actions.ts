"use server";
const BASE_VOL_URL = `https://www.googleapis.com/books/v1/volumes?q=`;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
import axios from "axios";
import { signIn, signOut } from "./auth";

export const signInWithGoogle = async () => await signIn("google");
export const singOutAction = async () => await signOut();

export const searchByTitleAction = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_VOL_URL}${query}&key=${GOOGLE_API_KEY}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

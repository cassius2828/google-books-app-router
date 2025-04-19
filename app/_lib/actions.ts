"use server";
const BASE_VOL_URL = `https://www.googleapis.com/books/v1/volumes?q=`

import { signIn, signOut } from "./auth";

export const signInWithGoogle = async () => await signIn("google");
export const singOutAction = async () => await signOut();

export const searchByTitle = async () => {
try {
    
} catch (err) {
    console.error(err);
}
}
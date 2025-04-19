"use server";

import { signIn, signOut } from "./auth";

export const signInWithGoogle = async () => await signIn("google");
export const singOutAction = async () => await signOut();

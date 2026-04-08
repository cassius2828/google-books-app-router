import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import { getMongoClient } from "./db";
import { authConfig } from "./auth.config";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(getMongoClient()),
});

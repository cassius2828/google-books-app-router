import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Edge-compatible auth config (no Node.js-only imports like MongoDB).
 * Used by middleware and as the base for the full server-side config.
 */
export const authConfig = {
  /** NextAuth v5 prefers AUTH_SECRET; NEXTAUTH_SECRET kept for older env files */
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [Google],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.id === "string") {
        session.user.id = token.id;
      }
      if (typeof token.email === "string") {
        session.user.email = token.email;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";
import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    supabaseAccessToken?: string;
  }
}

const authConfig = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [Google],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
    async session({ session, user }: { session: Session; user: User }) {
      const signingSecret = process.env.SUPABASE_JWT;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },
};
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

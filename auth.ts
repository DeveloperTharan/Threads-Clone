import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { AccountType } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.type && session.user) {
        session.user.type = token.role as AccountType;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.type = token.type as AccountType;
        session.user.image = token.image as unknown as string | null;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) return token;

      token.name = existingUser.user_name;
      token.email = existingUser.email;
      token.type = existingUser.accountType;
      token.image = existingUser.image;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

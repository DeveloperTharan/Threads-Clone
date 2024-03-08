import { AccountType } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  type: AccountType;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

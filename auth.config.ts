import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { signInSchema } from "@/schema/auth-schema";
import { getUserByName } from "./data/user";

export default {
  trustHost: true,
  providers: [
    credentials({
      async authorize(credentials) {
        const validateFields = signInSchema.safeParse(credentials);

        if (validateFields.success) {
          const { user_name, password } = validateFields.data;

          const user = await getUserByName(user_name);

          if (!user) return null;

          const passwordMatche = await bcrypt.compare(password, user.password);

          if (passwordMatche) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

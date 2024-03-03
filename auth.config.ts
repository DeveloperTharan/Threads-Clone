import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signInSchema } from "@/components/auth/schema";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validateFields = signInSchema.safeParse(credentials);

        if (validateFields.success) {
          const { user_name, password } = validateFields.data;

          const user = await db.user.findUnique({
            where: {
              user_name,
            },
          });

          if (!user) return null;

          const passwordMatche = await bcrypt.compare(password, user.password);

          if (passwordMatche) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
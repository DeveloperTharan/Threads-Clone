"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { SignUpSchema } from "@/components/auth/schema";
import { AuthError } from "next-auth";

export const SignUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, user_name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUserByUser_Name = await db.user.findUnique({
    where: {
      user_name,
    },
  });

  if (existingUserByUser_Name) {
    return { error: "user_name already taken!" };
  }

  const existingUserByEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUserByEmail) {
    return { error: "email is already in use!" };
  }

  await db.user.create({
    data: {
      user_name,
      email,
      password: hashedPassword,
    },
  });

  try {
    await signIn("credentials", {
      user_name,
      password,
      redirectTo: "/onboarding",
    });

    return { success: "Threads accound created successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went's wrong" };
      }
    }
    throw error;
  }
};

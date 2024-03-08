"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signInSchema } from "@/components/auth/schema";
import { getUserByName } from "@/data/user";
import { generateVerificationToken } from "@/data/tokens";

export const SignIn = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { user_name, password } = validatedFields.data;

  const existingUser = await getUserByName(user_name);

  if (!existingUser) {
    return { error: "No such user found!" };
  }

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    return { success: "Confirmation email sent!" }
  }

  try {
    await signIn("credentials", {
      user_name,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Your are SignIn successfully" };
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

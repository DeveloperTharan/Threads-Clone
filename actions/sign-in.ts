"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signInSchema } from "@/components/auth/schema";
import { AuthError } from "next-auth";

export const SignIn = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { user_name, password } = validatedFields.data;

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

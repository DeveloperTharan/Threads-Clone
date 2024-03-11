"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByName } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signInSchema } from "@/schema/schema";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const SignIn = async (
  values: z.infer<typeof signInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { user_name, password } = validatedFields.data;

  const existingUser = await getUserByName(user_name);

  if (!existingUser) {
    return { error: "No such user found!" };
  }
  const passwordMatche = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatche) return { error: "Invalid Password" };

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      user_name,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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

"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SignUpSchema } from "@/components/auth/schema";
import { generateVerificationToken } from "@/data/tokens";
import { getUserByEmail, getUserByName } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const SignUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, user_name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUserByUser_Name = await getUserByName(user_name);

  if (existingUserByUser_Name) {
    return { error: "user_name already taken!" };
  }

  const existingUserByEmail = await getUserByEmail(email);

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

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );

  return { success: "Confirmation email sent!" };
};

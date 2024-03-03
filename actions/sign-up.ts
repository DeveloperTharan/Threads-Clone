"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SignUpSchema } from "@/components/auth/schema";

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

  return { success: "Threads accound created successfully" };
};

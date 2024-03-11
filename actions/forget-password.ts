"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/data/tokens";
import { forgetPasswordSchema } from "@/schema/schema";

export const forgetPassword = async (
  values: z.infer<typeof forgetPasswordSchema>
) => {
  const validatedFields = forgetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "No such user exist on this email!" };
  if (existingUser.email !== email) return { error: "Email does not exist!" };

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Password reset email sent!" };
};

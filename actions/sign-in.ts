"use server";

import * as z from "zod";
import { signInSchema } from "@/components/auth/schema";

export const SignIn = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }

  return { success: "SignIn successfull" };
};

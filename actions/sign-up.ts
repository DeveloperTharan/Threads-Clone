"use server";

import * as z from "zod";
import { SignUpSchema } from "@/components/auth/schema";

export const SignUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }

  return { success: "SignUp successfull" };
};

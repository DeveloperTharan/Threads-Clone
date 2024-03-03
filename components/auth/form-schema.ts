import * as z from "zod";

export const signInSchemma = z.object({
  user_name: z
    .string()
    .min(4, {
      message: "enter valid username",
    })
    .max(10, {
      message: "max 10 characters",
    }),
  password: z
    .string()
    .min(8, {
      message: "enter valid password",
    })
    .max(16, {
      message: "max 16 characters",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "password must contain at least one number",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "password must contain at least one special character",
    }),
});

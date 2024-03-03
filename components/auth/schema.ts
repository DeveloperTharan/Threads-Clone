import * as z from "zod";

export const signInSchema = z.object({
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

export const SignUpSchema = z.object({
  user_name: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters long",
    })
    .max(10, {
      message: "Username cannot be more than 10 characters long",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(16, {
      message: "Password cannot be more than 16 characters long",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

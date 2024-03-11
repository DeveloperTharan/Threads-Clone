import * as z from "zod";

export const onboardingProfileschema = z.object({
  user_name: z
    .string()
    .min(4, {
      message: "enter valid username",
    })
    .max(10, {
      message: "max 10 characters",
    }),
  official_name: z.optional(z.string()),
  status: z.optional(z.string()),
  genderId: z.optional(z.string()),
  bio: z.optional(z.string()),
  image: z.optional(z.string()),
});

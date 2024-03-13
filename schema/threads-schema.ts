import * as z from "zod";

export const createThreadsSchema = z.object({
  body: z.optional(z.string()),
  assert: z.optional(z.string()),
});

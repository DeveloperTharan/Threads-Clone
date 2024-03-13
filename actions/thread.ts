"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createThreadsSchema } from "@/schema/threads-schema";

export const createThread = async (
  values: z.infer<typeof createThreadsSchema>
) => {
  const session = await auth();

  if (!session) return { error: "Unauthorized" };
  if (!values) return { error: "Invalid data!" };

  const { user } = session;
  const { body, assert } = values;

  await db.threads.create({
    data: {
      userId: user.id!,
      body,
      assert,
    },
  });

  return { success: "Thread posted!" };
};

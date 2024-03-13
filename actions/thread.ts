"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createThreadsSchema } from "@/schema/threads-schema";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const createThread = async (
  values: z.infer<typeof createThreadsSchema>
) => {
  const session = await auth();

  if (!session) return { error: "Unauthorized" };
  if (!values) return { error: "Invalid data!" };

  const { user } = session;
  const { body, assert } = values;

  const res = await db.threads.create({
    data: {
      userId: user.id!,
      body,
      assert,
    },
    include: {
      user: true,
    },
  });

  const threadUrl = `${domain}/threads/${res.user.id}?id=${res.id}`;

  await db.threads.update({
    where: {
      id: res.id,
    },
    data: {
      threadUrl,
    },
  });

  return { success: "Thread posted!" };
};

"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getTHreadById } from "@/data/thread";
import { Prisma, PrismaClient } from "@prisma/client";
import { createThreadsSchema } from "@/schema/threads-schema";
import { DefaultArgs } from "@prisma/client/runtime/library";

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

export const likeThread = async (id: string) => {
  const session = await auth();
  if (!session || !id) {
    return { error: { liked: false } };
  }

  const { user } = session;

  const thread = await getTHreadById(id);
  if (!thread) {
    return { error: { liked: false } };
  }

  const existingLike = await db.likes.findUnique({
    where: { threadId_userId: { threadId: id, userId: user?.id! } },
  });

  if (existingLike) {
    await db.likes.delete({ where: { id: existingLike.id } });
    const { likeCount } = await handleLikeCount(id);

    return { success: { liked: false, like_count: likeCount } };
  } else {
    await db.likes.create({ data: { threadId: id, userId: user?.id! } });
    const { likeCount } = await handleLikeCount(id);

    return { success: { liked: true, like_count: likeCount } };
  }
};

const handleLikeCount = async (threadId: string) => {
  try {
    const likeCount = await db.likes.count({ where: { threadId } });
    const res = await db.threads.update({
      where: { id: threadId },
      data: { like_count: likeCount },
    });
    return { likeCount: res.like_count };
  } catch (error) {
    return { likeCount: null };
  }
};

export const commandThread = async (
  threadId: string,
  body: string,
  parentId?: string
) => {
  const session = await auth();

  if (!session) return { error: "Unauthorized" };
  if (!body) return { error: "Invalid data!" };

  const { user } = session;

  const commandData = {
    body,
    threadId,
    userId: user.id!,
    ...(parentId && { parentId }),
  };

  await db.command.create({
    data: commandData,
  });

  return { success: "command posted!" };
};

export const deleteCommand = async (id: string) => {
  const session = await auth();

  if (!session) return { error: "Unauthorized" };
  if (!id) return { error: "Invalid data!" };

  await DeleteCommandAndChildrens(db, id);

  return { success: "Command Deleted Sucessfully" }
};

const DeleteCommandAndChildrens = async (
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  commandId: string
) => {
  // Find all children of the current command
  const children = await db.command.findMany({
    where: {
      parentId: commandId,
    },
  });

  // Recursively delete each child command
  for (const child of children) {
    await DeleteCommandAndChildrens(db, child.id);
  }

  await db.command.delete({
    where: {
      id: commandId,
    },
  });
};

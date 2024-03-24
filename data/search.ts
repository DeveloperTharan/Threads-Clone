"use server";

import { db } from "@/lib/db";

export const getThreadsBySearch = async (search: string) => {
  try {
    const threads = await db.threads.findMany({
      where: {
        OR: [
          {
            body: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            assert: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            user: {
              user_name: {
                contains: search,
                mode: "default",
              },
            },
          },
        ],
      },
      include: {
        user: true,
        likes: true,
        command: {
          include: {
            user: true,
          },
        },
      },
    });

    return threads;
  } catch (error) {
    return null;
  }
};

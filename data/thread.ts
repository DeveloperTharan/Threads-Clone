'use server'

import { db } from "@/lib/db";
import { shuffleArray } from "@/utils/suffle-array";

export const getTHreadById = async (id: string) => {
  try {
    const user = await db.threads.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getAllThreads = async ({
  page,
  perPage = 3,
}: {
  page: number;
  perPage?: number;
}) => {
  try {
    const skip = (page - 1) * perPage;
    const take = perPage;
    const threads = await db.threads.findMany({
      skip: skip,
      take: take,
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

    const shuffledThreads = shuffleArray(threads);

    return shuffledThreads;
  } catch (error) {
    return null;
  }
};

import { db } from "@/lib/db";

export const getUserBySearch = async ({
  page,
  perPage = 10,
  search,
}: {
  page: number;
  perPage?: number;
  search: string;
}) => {
  try {
    const skip = (page - 1) * perPage;
    const take = perPage;
    const user = await db.user.findMany({
      skip: skip,
      take: take,
      where: {
        user_name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getThreadsBySearch = async ({
  page,
  perPage = 3,
  search,
}: {
  page: number;
  perPage?: number;
  search: string;
}) => {
  try {
    const skip = (page - 1) * perPage;
    const take = perPage;
    const threads = await db.threads.findMany({
      skip: skip,
      take: take,
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
    });

    return threads;
  } catch (error) {
    return null;
  }
};

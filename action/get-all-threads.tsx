import { db } from "@/lib/db";

export const getAllThreads = async () => {
  try {
    const data = await db.threads.findMany({
      include: {
        user: true,
        likes: true,
        commands: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return { data };
  } catch (error) {
    console.log("GETTING_ALL_THREADS_ERROR", error);
    return { data: null };
  }
};

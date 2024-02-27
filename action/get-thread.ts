import { db } from "@/lib/db";

export const getThreadById = async (id: string) => {
  try {
    const thread = await db.threads.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        likes: true,
        commands: {
          include: {
            user: true,
          },
        },
      },
    });

    return { thread }
  } catch (error) {
    console.log("THREAD_ERROR", error);
    return { thread: null };
  }
};

import { db } from "@/lib/db";

export const getProfile = async ({ userId }: { userId: string }) => {
  try {
    const profile = await db.user.findUnique({
      where: {
        userId,
      },
      include: {
        followers: true,
        following: true,
        gender: true,
        threads: {
          include: {
            likes: true,
            commands: {
              include: {
                user: true,
              }
            },
          },
        },
      },
    });

    const gender = await db.gender.findMany({
      orderBy: {
        type: "asc",
      },
    });

    return {
      profile,
      gender,
    };
  } catch (error) {
    console.log("[GET_PROFILE]", error);
    return {
      profile: null,
      gender: null,
    };
  }
};

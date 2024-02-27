import { db } from "@/lib/db";

export const getProfile = async ({ profileId }: { profileId: string }) => {
  try {
    const [profile, gender] = await Promise.all([
      db.user.findUnique({
        where: {
          id: profileId,
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
                },
              },
            },
          },
        },
      }),

      db.gender.findMany({
        orderBy: {
          type: "asc",
        },
      }),
    ]);

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

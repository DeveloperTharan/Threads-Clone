import { db } from "@/lib/db";

export const getProfile = async ({ profileid }: { profileid: string }) => {
  try {
    const [profile, gender] = await Promise.all([
      db.user.findUnique({
        where: {
          id: profileid,
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

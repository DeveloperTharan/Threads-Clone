import { db } from "@/lib/db";

export const getProfile = async (user_name: string) => {
  try {
    const [profileData, gender] = await Promise.all([
      db.user.findUnique({
        where: {
          user_name,
        },
        include: {
          followers: true,
          following: true,
          gender: true,
          threads: {
            include: {
              likes: true,
              command: {
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
      profileData,
      gender,
    };
  } catch (error) {
    console.log("[GET_PROFILE]", error);
    return {
      profileData: null,
      gender: null,
    };
  }
};

import { db } from "@/lib/db";
import { shuffleArray } from "@/utils/suffle-array";

export const getAllUser = async ({
  page,
  perPage = 10,
}: {
  page: number;
  perPage?: number;
}) => {
  try {
    const skip = (page - 1) * perPage;
    const take = perPage;
    const user = await db.user.findMany({
      skip: skip,
      take: take,
    });

    const shuffledThreads = shuffleArray(user);

    return shuffledThreads;
  } catch (error) {
    return null;
  }
};

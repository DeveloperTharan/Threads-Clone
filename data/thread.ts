import { db } from "@/lib/db";

export const getTHreadById = async (id: string) => {
  try {
    const user = await db.threads.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserByName } from "@/data/user";
import { AccountType } from "@prisma/client";
import { userUpdateSchema } from "@/schema/user-update-schema";

export const userDataUpdate = async (
  values: z.infer<typeof userUpdateSchema>
) => {
  const session = await auth();

  if (!session) return { error: "Unauthorized" };
  if (!values) return { error: "Invalid data!" };

  const existingUser = await getUserByName(values.user_name);

  const { user } = session;

  if (existingUser?.id !== user.id) {
    if (existingUser?.user_name === values.user_name) {
      return { error: "username already exist use different" };
    }
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Profile Updated!" };
};

export const userAccountType = async (accountType: AccountType) => {
  const session = await auth();

  if (!session) return { error: "Unauthorized" };
  if (!accountType || accountType == undefined)
    return { error: "Invalid data!" };

  const { user } = session;

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      accountType,
    },
  });

  return { success: "Account Type Updated!" };
};

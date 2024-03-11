"use server";

import { z } from "zod";
import { onboardingProfileschema } from "@/schema/onboarding-schema";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserByName } from "@/data/user";

export const onBoardingProfile = async (
  values: z.infer<typeof onboardingProfileschema>
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

  const res = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  console.log(res);

  return { success: "Profile Updated!" };
};

"use server";

import { z } from "zod";
import { onboardingProfileschema } from "@/schema/onboarding-schema";

export const onBoardingProfile = async (
  values: z.infer<typeof onboardingProfileschema>,
) => {
  if (!values) return { error: "Invalid data!" };
  console.log({values});
  return { success: "Profile Updated!" };
};

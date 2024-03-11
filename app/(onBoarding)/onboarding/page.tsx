import React from "react";
import { OnboardingUserForm } from "@/components/onboarding/onboarding-user";
import { db } from "@/lib/db";
import { useCurrentUser } from "@/hooks/use-current-user";
import { auth } from "@/auth";

export default async function OnBoardingPage() {
  const session = await auth();

  if (!session) return null;

  const { user } = session;

  const [profile, gender] = await Promise.all([
    db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        gender: true,
      },
    }),

    db.gender.findMany({
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  return (
    <>
      <OnboardingUserForm initialdata={profile} gender={gender} />
    </>
  );
}

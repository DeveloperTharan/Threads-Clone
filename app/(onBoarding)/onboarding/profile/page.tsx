import React from "react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { OnboardingUserForm } from "@/components/onboarding/onboarding-user";

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
    <div className="w-full h-full flex items-center justify-center">
      <OnboardingUserForm initialdata={profile} gender={gender} />
    </div>
  );
}

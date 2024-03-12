import React from "react";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { UserDataUpdateForm } from "@/components/user-update/user-data-update";

import { Card, CardBody, CardHeader } from "@nextui-org/react";

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
      <Card className="w-full max-w-[90%] md:max-w-[75%] h-fit bg-neutral-800/20">
        <CardBody className="w-full">
          <CardHeader className="text-2xl font-bold">Profile</CardHeader>
          <UserDataUpdateForm initialdata={profile} gender={gender} />
        </CardBody>
      </Card>
    </div>
  );
}

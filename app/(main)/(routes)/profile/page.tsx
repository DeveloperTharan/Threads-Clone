import React from "react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { Spinner } from "@/components/ui/spinner";
import { UserInfo } from "./_components/user-info";
import { UserThreads } from "./_components/user-threads";

export default async function ProfilePage() {
  const { userId } = auth();

  if (!userId) return redirect("/sign-in");

  const res = await db.user.findUnique({
    where: {
      userId,
    },
    include: {
      followers: true,
      following: true,
      gender: true,
      threads: {
        include: {
          likes: true,
          commands: true,
        }
      },
    },
  });

  const gender = await db.gender.findMany({
    orderBy: {
      type: "asc",
    },
  });

  return (
    <>
      {!res || res === undefined ? (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <>
          <UserInfo userData={res} gender={gender} />
          <UserThreads userData={res} />
        </>
      )}
    </>
  );
}

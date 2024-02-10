import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { UserInfo } from "./_components/user-info";
import { UserThreads } from "./_components/user-threads";
import { Spinner } from "@/components/ui/spinner";

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
          <UserThreads />
        </>
      )}
    </>
  );
}

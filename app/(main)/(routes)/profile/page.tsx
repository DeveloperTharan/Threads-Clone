import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
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
    },
  });
  return (
    <>
      {!res || res === undefined ? (
        <p>Loadding...</p>
      ) : (
        <>
          <UserInfo userData={res} />
          <UserThreads />
        </>
      )}
    </>
  );
}

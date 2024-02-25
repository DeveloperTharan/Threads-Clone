import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { Spinner } from "@/components/ui/spinner";
import { getProfile } from "@/action/get-profile";
import { UserInfo } from "./_components/user-info";
import { UserThreads } from "./_components/user-threads";

export default async function ProfilePage() {
  const { userId } = auth();

  if (!userId) return redirect("/sign-in");

  const { profile, gender } = await getProfile({userId});

  return (
    <>
      {!profile || profile === undefined ? (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <>
          <UserInfo userData={profile} gender={gender} />
          <UserThreads userData={profile} />
        </>
      )}
    </>
  );
}

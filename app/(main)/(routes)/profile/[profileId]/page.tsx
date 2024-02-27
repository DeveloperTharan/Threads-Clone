import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { Spinner } from "@/components/ui/spinner";
import { getProfile } from "@/action/get-profile";
import { UserInfo } from "./_components/user-info";
import { UserThreads } from "./_components/user-threads";

export async function generateMetadata(params: {
  params: { profileId: string };
}): Promise<Metadata> {
  const { profileId } = params.params;

  const { profile } = await getProfile({ profileId });

  return {
    title: profile?.user_name,
    openGraph: {
      images: [
        {
          url: profile?.imageURL!,
        },
      ],
    },
  };
}

export default async function ProfilePage(params: {
  params: { profileId: string };
}) {
  const { userId } = auth();
  const { profileId } = params.params;

  if (!userId) return redirect("/sign-in");

  const { profile, gender } = await getProfile({ profileId });

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

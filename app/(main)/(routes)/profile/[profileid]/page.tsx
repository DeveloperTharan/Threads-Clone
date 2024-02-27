import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { Spinner } from "@/components/ui/spinner";
import { getProfile } from "@/action/get-profile";
import { UserInfo } from "./_components/user-info";
import { UserThreads } from "./_components/user-threads";

export async function generateMetadata(params: {
  params: { profileid: string };
}): Promise<Metadata> {
  const { profileid } = params.params;

  const { profile } = await getProfile({ profileid });

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
  params: { profileid: string };
}) {
  const { userId } = auth();
  const { profileid } = params.params;

  if (!userId) return redirect("/sign-in");

  const { profile, gender } = await getProfile({ profileid });

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

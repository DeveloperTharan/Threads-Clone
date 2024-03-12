import React from "react";
import { Metadata } from "next";
import { getUserByName } from "@/data/user";
import { getProfile } from "@/data/profile";
import { Spinner } from "@/components/ui/spinner";
import { UserInfo } from "@/components/user/user-info";

export async function generateMetadata(params: {
  params: { profile: string };
}): Promise<Metadata> {
  const { profile } = params.params;
  const user_name = `@${profile.slice(3)}`;
  const user = await getUserByName(user_name);

  return {
    title: user?.user_name,
  };
}

export default async function Profile(params: { params: { profile: string } }) {
  const { profile } = params.params;
  const user_name = `@${profile.slice(3)}`;

  const { profileData, gender } = await getProfile(user_name);

  return (
    <>
      {!profile || profile === null ? (
        <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <div className="w-full md:w-[60%] mx-auto">
          <UserInfo userData={profileData} gender={gender} />
          {/* <UserThreads userData={profile} /> */}
        </div>
      )}
    </>
  );
}

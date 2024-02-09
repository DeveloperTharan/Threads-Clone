import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import { Gender, Follows, User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { EditProfile } from "@/components/model/edit-profile";
import { Preview } from "@/components/preview";

interface UserData {
  userData: {
    gender: Gender | null;
    followers: Follows[];
    following: Follows[];
  } & User;
}

export const UserInfo = ({ userData }: UserData) => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  
  return (
    <div className="w-full h-auto min-h-44 p-5">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col justify-start items-start">
          <h2 className="text-3xl font-bold">{userData.user_name}</h2>
          <div className="flex flex-row items-baseline gap-x-2">
            <h3 className="text-lg font-medium">{userData.official_name}</h3>
            <span className="text-xs text-neutral-500 p-1 bg-neutral-800/40 rounded-full">
              {userData.gender?.type || ""}
            </span>
          </div>
          <Preview value={userData.bio || ""} />
          <div className="flex flex-row items-center gap-x-7 my-2">
            <div
              className="text-sm text-neutral-500 hover:underline"
              role="button"
            >
              {userData.followers.length} followers
            </div>
            <div
              className="text-sm text-neutral-500 hover:underline"
              role="button"
            >
              {userData.following.length} following
            </div>
          </div>
        </div>
        <div className="w-fit h-fit relative">
          <Image
            src={userData.imageURL}
            alt={userData.user_name}
            title={userData.user_name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="absolute bottom-0 right-0">
            {userData.emoje === null ? "" : userData.emoje}
          </div>
        </div>
      </div>
      <div className="my-5 w-full h-fit">
        {userData.userId !== userId ? (
          <Button className="w-full rounded-lg">Follow</Button>
        ) : (
          <EditProfile initialData={userData}>
            <div
              className="w-full rounded-xl bg-transparent border border-neutral-700 hover:bg-neutral-700/70 p-1"
              role="button"
            >
              Edit Profile
            </div>
          </EditProfile>
        )}
      </div>
    </div>
  );
};

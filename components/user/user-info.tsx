import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Gender, Follows, User } from "@prisma/client";

import { Button } from "@nextui-org/react";
import { EditProfile } from "../models/edit-profile";
import { auth } from "@/auth";

interface UserDataProps {
  userData:
    | ({
        gender: Gender | null;
        followers: Follows[];
        following: Follows[];
      } & User)
    | null;
  gender: Gender[] | null;
}

export const UserInfo = async ({ userData, gender }: UserDataProps) => {
  const session = await auth();
  if (!session) return redirect("/auth/sign-in");

  return (
    <div className="w-full h-auto min-h-44 p-5">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col justify-start items-start w-full max-w-[75%]">
          <h2 className="text-3xl font-bold">{userData?.user_name}</h2>
          <div className="flex flex-row items-baseline gap-2 my-1">
            <h3 className="text-lg font-medium">{userData?.official_name}</h3>
            <span className="text-xs text-neutral-500 p-1 bg-neutral-800/40 rounded-full">
              {userData?.gender?.type || ""}
            </span>
          </div>
          <p className="text-sm text-neutral-400 my-1">{userData?.bio}</p>
          <div className="flex flex-row items-center gap-x-7 my-2">
            <div
              className="text-sm text-neutral-500 hover:underline"
              role="button"
            >
              {userData?.followers.length} followers
            </div>
            <div
              className="text-sm text-neutral-500 hover:underline"
              role="button"
            >
              {userData?.following.length} following
            </div>
          </div>
        </div>
        <div className="w-fit h-fit relative">
          <Image
            src={userData?.image || ""}
            alt={userData?.user_name || ""}
            title={userData?.user_name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="absolute bottom-0 right-0">
            {userData?.status === null ? "" : userData?.status}
          </div>
        </div>
      </div>
      <div className="my-5 w-full h-fit">
        {userData?.id !== session.user.id ? (
          <Button className="w-full rounded-lg">Follow</Button>
        ) : (
          <EditProfile initialData={userData} gender={gender}>
            Edit Profile
          </EditProfile>
        )}
      </div>
    </div>
  );
};

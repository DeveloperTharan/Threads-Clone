"use client";

import React, { useTransition } from "react";
import { redirect, useRouter } from "next/navigation";

import { Spinner } from "../ui/spinner";
import { Avatar, Button } from "@nextui-org/react";
import { EditProfile } from "../models/edit-profile";
import { Gender, Follows, User } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toggleFollow } from "@/actions/follow";
import toast from "react-hot-toast";

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

export const UserInfo = ({ userData, gender }: UserDataProps) => {
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  if (!user) return redirect("/auth/sign-in");

  const router = useRouter();

  const handleFollow = () => {
    startTransition(() => {
      if (user.id && userData?.id !== undefined) {
        toggleFollow({
          followerUserId: user.id,
          followingUserId: userData?.id,
        })
          .then((data) => {
            if (data.success) return toast.success(data.success);
            if (data.error) return toast.error(data.error);
          })
          .finally(() => router.refresh());
      }
    });
  };

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
          <Avatar
            src={userData?.image || ""}
            alt={userData?.user_name || ""}
            title={userData?.user_name}
            className="h-28 w-28"
          />
          <div className="absolute bottom-0 right-0">
            {userData?.status === null ? "" : userData?.status}
          </div>
        </div>
      </div>
      <div className="my-5 w-full h-fit">
        {userData?.id !== user.id ? (
          <Button
            variant="flat"
            className="w-full rounded-lg"
            onClick={handleFollow}
            disabled={isPending}
          >
            {isPending ? (
              <Spinner size={"lg"} />
            ) : userData?.followers.find(
                (data) => data.followerId === user.id
              ) ? (
              "Following"
            ) : (
              "Follow"
            )}
          </Button>
        ) : (
          <EditProfile initialData={userData} gender={gender}>
            Edit Profile
          </EditProfile>
        )}
      </div>
    </div>
  );
};

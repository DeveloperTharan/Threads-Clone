"use client";

import React from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { Likes } from "@prisma/client";
import { useUser } from "@/context/user-context";

import { GoHeart } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { IoChatbubblesOutline, IoHeartSharp } from "react-icons/io5";

interface BottomActionBtnProps {
  threadId: string;
  likes: Likes[];
}

export const BottomActionBtn = ({
  threadId,
  likes,
}: BottomActionBtnProps) => {
  const router = useRouter();
  const { User } = useUser();

  const onClick = async () => {
    try {
      await axios.patch(`/api/thread/like/${threadId}`, { userid: User?.id });
      router.refresh();
    } catch (error) {
      console.log("[PROFILE_ERROR]", error);
    }
  };

  return (
    <div className="w-fit flex flex-row justify-start gap-3 mt-5">
      {likes.some((data) => data.userId === User?.id) ? (
        <IoHeartSharp
          size={30}
          className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-rose-600"
          onClick={onClick}
        />
      ) : (
        <GoHeart
          size={30}
          className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-500"
          onClick={onClick}
        />
      )}
      <IoChatbubblesOutline
        size={30}
        className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-500"
      />
      <PiArrowsClockwise
        size={30}
        className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-500"
      />
      <CiLocationArrow1
        size={30}
        className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-500"
      />
    </div>
  );
};

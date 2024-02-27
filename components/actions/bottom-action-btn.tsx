"use client";

import React from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { Command } from "../model/command";
import { useUser } from "@/context/user-context";
import { Commands, Likes, User } from "@prisma/client";

import { GoHeart } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { IoChatbubblesOutline, IoHeartSharp } from "react-icons/io5";

interface BottomActionBtnProps {
  threadId: string;
  likes: Likes[];
  commands: (Commands & {
    user: User;
  })[];
}

export const BottomActionBtn = ({
  threadId,
  likes,
  commands,
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
          className="p-1 rounded-full hover:bg-neutral-700/50 text-rose-600"
          onClick={onClick}
          role="button"
        />
      ) : (
        <GoHeart
          size={30}
          className="btn-sm"
          onClick={onClick}
          role="button"
        />
      )}
      <Command threadId={threadId} commands={commands}>
        <IoChatbubblesOutline
          size={30}
          className="btn-sm"
          role="button"
        />
      </Command>
      <PiArrowsClockwise
        size={30}
        className="btn-sm"
        role="button"
      />
      <CiLocationArrow1
        size={30}
        className="btn-sm"
        role="button"
      />
    </div>
  );
};

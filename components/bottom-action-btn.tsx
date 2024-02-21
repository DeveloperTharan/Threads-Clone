"use client";

import React from "react";

import { GoHeart } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useAuth } from "@clerk/nextjs";

export const BottomActionBtn = ({ threadId }: { threadId: string }) => {
  const { userId } = useAuth();

  const onClick = () => {
    console.log(threadId, userId);
  }

  return (
    <div className="w-fit flex flex-row justify-start gap-3 mt-5">
      <GoHeart
        size={30}
        className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-500"
        onClick={onClick}
      />
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

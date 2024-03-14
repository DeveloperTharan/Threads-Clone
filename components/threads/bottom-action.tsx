"use client";

import React from "react";

import { GoHeart } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Command, Likes } from "@prisma/client";

interface ThreadBottomActionProps {
  thread_id: string;
  like_count: number;
  likes: Likes[];
  commands: Command[];
}

export const ThreadBottomAction = ({
  thread_id,
  like_count,
  likes,
  commands,
}: ThreadBottomActionProps) => {
  return (
    <div className="w-full flex flex-row items-center justify-start gap-x-3 mt-2">
      <GoHeart size={30} className="btn-icon" role="button" />
      <IoChatbubblesOutline size={30} className="btn-icon" role="button" />
      <CiLocationArrow1 size={30} className="btn-icon" role="button" />
      <PiArrowsClockwise size={30} className="btn-icon" />
    </div>
  );
};

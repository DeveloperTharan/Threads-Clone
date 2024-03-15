"use client";

import React, { useEffect, useState } from "react";

import { GoHeart } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { IoChatbubblesOutline, IoHeartSharp } from "react-icons/io5";
import { Command, Likes } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useLiked } from "@/hooks/use-like";

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
  const user = useCurrentUser();
  const isLiked = likes.some(
    (like) => like.userId === user?.id && like.threadId === thread_id
  );
  const { liked, handleLike } = useLiked(thread_id, like_count, isLiked);

  return (
    <div className="w-full flex flex-row items-center justify-start gap-x-3 mt-2">
      {liked.liked ? (
        <IoHeartSharp
          size={30}
          className="btn-icon text-rose-600"
          role="button"
          onClick={handleLike}
        />
      ) : (
        <GoHeart
          size={30}
          className="btn-icon"
          role="button"
          onClick={handleLike}
        />
      )}
      <IoChatbubblesOutline size={30} className="btn-icon" role="button" />
      <CiLocationArrow1 size={30} className="btn-icon" role="button" />
      <PiArrowsClockwise size={30} className="btn-icon" />
    </div>
  );
};

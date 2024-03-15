"use client";

import React from "react";

import { cn } from "@nextui-org/react";
import { useLiked } from "@/hooks/use-like";
import { Command, Likes } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

import { GoHeart } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { IoChatbubblesOutline, IoHeartSharp } from "react-icons/io5";

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
          className={cn(
            "p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 transform active:scale-75 transition-transform",
            liked.liked === true && "text-rose-600"
          )}
          role="button"
          onClick={handleLike}
        />
      ) : (
        <GoHeart
          size={30}
          className="p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 transform 
          active:scale-75 transition-transform"
          role="button"
          onClick={handleLike}
        />
      )}
      <IoChatbubblesOutline
        size={30}
        className="p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 transform 
        active:scale-75 transition-transform"
        role="button"
      />
      <CiLocationArrow1
        size={30}
        className="p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 transform 
        active:scale-75 transition-transform"
        role="button"
      />
      <PiArrowsClockwise
        size={30}
        className="p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 transform 
        active:scale-75 transition-transform"
      />
    </div>
  );
};

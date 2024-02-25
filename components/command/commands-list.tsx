"use client";

import React, { SetStateAction } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useUser } from "@/context/user-context";

interface CommandListProps {
  id: string;
  userId: string;
  command: string;
  user: User;
  level: number;
  onExpand: () => void;
  expanded: boolean;
  handleParentId: (id: string) => void;
}

export const CommandsList = ({
  id,
  userId,
  command,
  level,
  expanded,
  onExpand,
  user,
  handleParentId,
}: CommandListProps) => {
  const { User } = useUser();

  return (
    <div
      className={cn(
        "w-full h-fit flex flex-row items-start justify-start gap-x-4",
        level != 0
          ? `pl-[${level * 12 + 12}px] md:pl-[${level * 24 + 24}px]`
          : ""
      )}
    >
      <Image
        src={user.imageURL}
        alt={user.user_name}
        width={45}
        height={45}
        className="rounded-full"
      />
      <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
        <h1 className="text-lg text-neutral-500 font-semibold">
          {user.user_name}
        </h1>
        <p className="text-sm w-full h-auto mb-2">{command}</p>
        <div className="relative w-full h-[1px] bg-neutral-800">
          {/* {userId !== User?.id && ( */}
            <div className="text-xs text-neutral-600 absolute -top-2 left-5 bg-neutral-950">
              <button
                className="px-1 hover:bg-neutral-600/20 rounded-md"
                onClick={() => handleParentId(id)}
              >
                Replay
              </button>
            </div>
          {/* )} */}
          {/* {userId == User?.id && (
            <div className="text-xs text-neutral-600 absolute -top-2 left-5 bg-neutral-950">
              <button className="px-1 hover:bg-neutral-600/20 rounded-md">
                Delete
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { Command } from "../model/command";
import { useUser } from "@/context/user-context";
import { Commands, Likes, User } from "@prisma/client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { GoHeart, GoCopy, GoCheckCircle } from "react-icons/go";
import { IoChatbubblesOutline, IoHeartSharp } from "react-icons/io5";

interface BottomActionBtnProps {
  threadId: string;
  likes: Likes[];
  commands: (Commands & {
    user: User;
  })[];
  url: string;
}

export const BottomActionBtn = ({
  threadId,
  likes,
  commands,
  url,
}: BottomActionBtnProps) => {
  const [copied, setCopied] = useState(false);

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

  const handleOnCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
        <GoHeart size={30} className="btn-sm" onClick={onClick} role="button" />
      )}
      <Command threadId={threadId} commands={commands}>
        <IoChatbubblesOutline size={30} className="btn-sm" role="button" />
      </Command>
      <PiArrowsClockwise size={30} className="btn-sm" role="button" />
      <Popover>
        <PopoverTrigger>
          <CiLocationArrow1 size={30} className="btn-sm" role="button" />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-fit text-sm text-neutral-400"
        >
          <div className="flex items-center gap-x-1">
            <input
              className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate rounded-md"
              value={url}
              disabled
            />
            <button
              onClick={handleOnCopy}
              disabled={copied}
              className="h-8 rounded-l-none"
            >
              {copied ? (
                <GoCheckCircle
                  size={30}
                  className="bg-muted rounded-md px-2 h-8"
                />
              ) : (
                <GoCopy size={30} className="bg-muted rounded-md px-2 h-8" />
              )}
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

"use client";

import React, { useState } from "react";

import { useLiked } from "@/hooks/use-like";
import CommandsModel from "../models/commands";
import { Command, Likes } from "@prisma/client";
import { StructureData } from "@/utils/structure-data";
import { useCurrentUser } from "@/hooks/use-current-user";

import { GoHeart } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { IoChatbubblesOutline, IoHeartSharp } from "react-icons/io5";

import { cn, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Check, Copy } from "lucide-react";

interface ThreadBottomActionProps {
  thread_id: string;
  like_count: number;
  likes: Likes[];
  commands: Command[];
  thread_url: string | null;
}

export const ThreadBottomAction = ({
  thread_id,
  like_count,
  likes,
  commands,
  thread_url,
}: ThreadBottomActionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const user = useCurrentUser();

  const isLiked = likes.some(
    (like) => like.userId === user?.id && like.threadId === thread_id
  );

  const { liked, handleLike } = useLiked(thread_id, like_count, isLiked);

  const structuredCommands = StructureData(commands);

  return (
    <>
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
        <CommandsModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          thread_id={thread_id}
          structuredCommands={structuredCommands}
          un_structuredCommands={commands}
        >
          <IoChatbubblesOutline
            size={30}
            className="p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 transform 
        active:scale-75 transition-transform"
            role="button"
          />
        </CommandsModel>
        <ShareThread thread_url={thread_url}>
          <CiLocationArrow1
            size={30}
            className="p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 transform 
          active:scale-75 transition-transform"
            role="button"
          />
        </ShareThread>
        <PiArrowsClockwise
          size={30}
          className="p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 transform 
        active:scale-75 transition-transform"
        />
      </div>
      <p className="text-sm text-neutral-700">{liked.like_count} likes</p>
    </>
  );
};

const ShareThread = ({
  children,
  thread_url,
}: {
  children: React.ReactNode;
  thread_url: string | null;
}) => {
  const [copied, setCopied] = useState(false);

  const handleOnCopy = () => {
    navigator.clipboard.writeText(thread_url!);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Popover
      placement="bottom-start"
      size="lg"
      backdrop="opaque"
      classNames={{
        base: ["before:bg-default-200"],
        content: [
          "py-3 px-4 border border-default-200",
          "bg-gradient-to-br from-white to-default-300",
          "dark:from-default-100 dark:to-default-50",
        ],
      }}
    >
      <PopoverTrigger>
        <button>{children}</button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <p className="text-xs font-medium text-sky-500">Share this Thread!</p>
          <div className="flex items-center">
            <input
              className="flex-1 px-2 text-xs rounded-l-md h-8 bg-neutral-900 truncate border border-neutral-700"
              value={thread_url!}
              disabled
            />
            <button
              onClick={handleOnCopy}
              disabled={copied}
              className="h-8 rounded-l-none rounded-r-md bg-neutral-900 px-2 border border-neutral-700"
            >
              {copied ? (
                <Check className="h-4 w-4 ml-1" />
              ) : (
                <Copy className="h-4 w-4 ml-1" />
              )}
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

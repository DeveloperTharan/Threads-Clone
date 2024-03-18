import React from "react";
import NextImage from "next/image";

import { BsThreeDots } from "react-icons/bs";
import { timeSince } from "@/utils/time-since";
import { Command, Likes } from "@prisma/client";
import { Avatar, Image, Link, cn } from "@nextui-org/react";
import { ThreadTopAction } from "./top-action";
import { ThreadBottomAction } from "./bottom-action";

interface ThreadUiProps {
  userData: {
    user_id: string;
    user_name: string;
    user_image: string | null;
  };
  threadData: {
    likes: Likes[];
    createAt: Date;
    thread_id: string;
    like_count: number;
    commands: Command[];
    body: string | null;
    assert: string | null;
    thread_url: string | null;
  };
}

export const ThreadUi = ({ userData, threadData }: ThreadUiProps) => {
  return (
    <div className="w-full h-full flex flex-row items-start justify-start gap-x-3 relative">
      <div className="h-full flex flex-col gap-y-2 items-center justify-center">
        <Link href={`/${userData.user_name}`}>
          <Avatar
            alt={userData.user_name}
            src={userData.user_image || ""}
            size="md"
          />
        </Link>
        <div className={cn("w-[1px] bg-neutral-700 h-full")} />
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-y-2">
        <div className="w-full flex flex-row justify-between items-center">
          <h4 className="text-[16px] font-medium text-neutral-300">
            {userData?.user_name}
          </h4>
          <div className="flex flex-row items-center justify-center gap-x-2">
            <p className="text-sm text-neutral-600">
              {timeSince(threadData?.createAt)}
            </p>
            <ThreadTopAction
              post_user_id={userData.user_id}
              thread_id={threadData.thread_id}
            >
              <BsThreeDots size={20} />
            </ThreadTopAction>
          </div>
        </div>
        {threadData?.body?.length! !== 0 && (
          <p className="text-sm font-normal text-neutral-400">
            {threadData.body}
          </p>
        )}
        {threadData?.assert?.length! !== 0 && (
          <Image
            src={threadData?.assert!}
            alt={threadData?.assert!}
            as={NextImage}
            width={350}
            height={350}
          />
        )}
        <ThreadBottomAction
          thread_id={threadData.thread_id}
          like_count={threadData.like_count}
          likes={threadData.likes}
          commands={threadData.commands}
          thread_url={threadData.thread_url}
        />
        <p className="text-sm text-neutral-700">{threadData.like_count} likes</p>
      </div>
    </div>
  );
};

import React from "react";
import Image from "next/image";

import { Preview } from "./utils/preview";
import { TopActionBtn } from "./actions/top-action-btn";
import { BottomActionBtn } from "./actions/bottom-action-btn";

import { BsThreeDots } from "react-icons/bs";
import { timeSince } from "@/lib/time-since";
import { Commands, Likes, User } from "@prisma/client";

interface ThreadUiProps {
  userImage: string;
  userName: string;
  id: string;
  description: string;
  assert: string;
  autherId: string;
  likeCount: number;
  likes: Likes[];
  date: Date;
  commands: (Commands & {
    user: User;
  })[];
}

export const ThreadUi = ({
  userImage,
  userName,
  id,
  description,
  assert,
  autherId,
  likeCount,
  likes,
  date,
  commands,
}: ThreadUiProps) => {
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row w-full justify-start gap-x-4">
          <Image
            src={userImage}
            alt={userName}
            title={userName}
            width={45}
            height={45}
            className="rounded-full cursor-pointer"
          />
          <span className="text-lg">{userName}</span>
        </div>
        <div className="flex flex-row items-center justify-end gap-x-4 w-full">
          <p className="text-sm text-neutral-600">{timeSince(date)}</p>
          <TopActionBtn threadId={id} autherId={autherId}>
            <BsThreeDots
              size={25}
              className="p-1 rounded-full hover:bg-neutral-700/30"
            />
          </TopActionBtn>
        </div>
      </div>
      <div className="w-full h-full flex flex-row gap-x-4 justify-start items-start mx-auto">
        <div className="h-full w-[2px] bg-neutral-700 mx-[17px] my-2" />
        <div className="flex flex-col justify-start items-start ml-2">
          {description!.length > 0 ? (
            <Preview value={description || ""} className="-mt-5" />
          ) : null}
          {assert !== "" ? (
            <Image
              src={assert || ""}
              alt={assert}
              title={assert}
              width={300}
              height={300}
              className="cursor-pointer rounded-lg"
            />
          ) : null}
          <BottomActionBtn threadId={id} likes={likes} commands={commands} />
          {likeCount > 0 && (
            <p className="text-sm text-neutral-700">{likeCount} Likes</p>
          )}
        </div>
      </div>
    </>
  );
};

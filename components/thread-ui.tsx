import React from "react";
import Image from "next/image";

import { Preview } from "./preview";
import { TopActionBtn } from "./top-action-btn";
import { BottomActionBtn } from "./bottom-action-btn";

import { BsThreeDots } from "react-icons/bs";

interface ThreadUiProps {
  userImage: string;
  userName: string;
  id: string;
  description: string;
  assert: string;
  autherId: string;
}

export const ThreadUi = ({
  userImage,
  userName,
  id,
  description,
  assert,
  autherId,
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
          {/* <ReactTime data={createdAt} /> */}
          <TopActionBtn threadId={id} autherId={autherId}>
            <BsThreeDots
              size={25}
              className="p-1 rounded-full hover:bg-neutral-700/30"
            />
          </TopActionBtn>
        </div>
      </div>
      <div className="w-[75%] flex flex-col justify-start items-start mx-auto">
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
        <BottomActionBtn threadId={id} />
      </div>
    </>
  );
};

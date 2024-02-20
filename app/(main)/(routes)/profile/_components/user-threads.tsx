import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Gender, Follows, User, Threads } from "@prisma/client";

import { Preview } from "@/components/preview";
import { TopActionBtn } from "./top-action-btn";
/* import ReactTime from "@/components/react-time-ago"; */

import { BsThreeDots } from "react-icons/bs";
import { BottomActionBtn } from "./bottom-action-btn";

interface UserThreadsProps {
  userData: {
    gender: Gender | null;
    followers: Follows[];
    following: Follows[];
    threads: Threads[];
  } & User;
}

export const UserThreads = ({ userData }: UserThreadsProps) => {
  return (
    <div
      className={cn(
        "w-full h-auto flex flex-col justify-start items-start gap-4",
        userData.threads.length > 0 && "pb-28 md:pb-10"
      )}
    >
      {userData.threads.length == 0 || undefined ? (
        <p className="flex justify-center items-center w-full h-full text-neutral-500">
          No Threads
        </p>
      ) : (
        <>
          {userData.threads.map((data, index) => (
            <div
              key={index}
              className="w-full h-fit flex flex-col items-start justify-start"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row w-full justify-start gap-x-4">
                  <Image
                    src={userData?.imageURL}
                    alt={userData?.user_name}
                    title={userData?.user_name}
                    width={45}
                    height={45}
                    className="rounded-full cursor-pointer"
                  />
                  <span className="text-lg">{userData.user_name}</span>
                </div>
                <div className="flex flex-row items-center justify-end gap-x-4 w-full">
                  {/* <ReactTime data={data.createdAt} /> */}
                  {data.userId === userData.id ? (
                    <TopActionBtn threadId={data.id}>
                      <BsThreeDots
                        size={25}
                        className="p-1 rounded-full hover:bg-neutral-700/30"
                      />
                    </TopActionBtn>
                  ) : null}
                </div>
              </div>
              <div className="w-[75%] flex flex-col justify-start items-start mx-auto">
                {data.description!.length > 0 ? (
                  <Preview value={data.description || ""} className="-mt-5" />
                ) : null}
                {data.assert !== "" ? (
                  <Image
                    src={data?.assert || ""}
                    alt={"thread"}
                    title={"thread"}
                    width={300}
                    height={300}
                    className="cursor-pointer rounded-lg"
                  />
                ) : null}
                <BottomActionBtn key={index} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

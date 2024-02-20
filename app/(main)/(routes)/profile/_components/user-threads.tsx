import React from "react";
import Image from "next/image";

import { Gender, Follows, User, Threads } from "@prisma/client";

import { Preview } from "@/components/preview";

import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiArrowsClockwise } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";

interface UserThreadsProps {
  userData: {
    gender: Gender | null;
    followers: Follows[];
    following: Follows[];
    threads: Threads[];
  } & User;
}

export const UserThreads = async ({ userData }: UserThreadsProps) => {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
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
                <BsThreeDots
                  size={25}
                  className="p-1 rounded-full hover:bg-neutral-700/50"
                />
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
                <div className="w-fit flex flex-row justify-start gap-3 mt-5">
                  <CiHeart
                    size={30}
                    className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-400"
                  />
                  <IoChatbubblesOutline
                    size={30}
                    className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-400"
                  />
                  <PiArrowsClockwise
                    size={30}
                    className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-400"
                  />
                  <CiLocationArrow1
                    size={30}
                    className="p-1 rounded-full hover:bg-neutral-700/50 cursor-pointer text-neutral-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

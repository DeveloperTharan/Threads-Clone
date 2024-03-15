"use client";

import React, { useState } from "react";
import Image from "next/image";

import { timeSince } from "@/utils/time-since";
import { Command, User } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import { useRouter } from "next/navigation";
import { cn } from "@nextui-org/react";
import { CommandNode } from "@/utils/structure-data";

interface CommandListProps {
  commands: CommandNode[];
  getParentId: (id: string) => void;
  level?: number;
  threadId?: string;
}

export const CommandsList = ({
  commands,
  getParentId,
  level = 0,
  threadId,
}: CommandListProps) => {
  const [expand, setExpand] = useState<Record<string, boolean>>({});

  const user = useCurrentUser();
  const router = useRouter();

  const onExpand = (id: string) => {
    setExpand((prevExpandStates) => ({
      ...prevExpandStates,
      [id]: !prevExpandStates[id],
    }));
  };

  const onDelete = async (id: string) => {};

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-4">
      {commands.map((data, index) => (
        <>
          <div
            className={cn("w-full h-fit")}
            style={{
              paddingLeft: level ? `${level * 40 + 25}px` : undefined,
            }}
            key={index}
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex flex-row w-full justify-start gap-x-4">
                <Image
                  src={data?.user?.image || ""}
                  alt={data?.user?.user_name || ""}
                  title={data?.user?.user_name}
                  width={45}
                  height={45}
                  className="rounded-full cursor-pointer"
                />
                <span className="text-lg">{data?.user?.user_name}</span>
              </div>
              <p className="text-sm text-neutral-600">
                {timeSince(data.createAt)}
              </p>
            </div>
            <div className="w-full h-full flex flex-row gap-x-4 justify-start items-start mx-auto">
              <div
                className={cn(
                  "h-full w-[1px] bg-neutral-700 mx-[20px] flex-shrink-0",
                  {
                    "opacity-0": index === commands.length - 1,
                  }
                )}
              />
              <div className="flex flex-col justify-start items-start ml-2 w-full gap-3">
                <div className="w-full h-full flex flex-row justify-between items-center">
                  <p className="text-sm">{data.body}</p>
                  <IoMdHeartEmpty
                    size={16}
                    className=""
                    role="button"
                    onClick={() => {}}
                  />
                </div>
                <div className="w-full h-[1px] relative bg-neutral-700">
                  {/* {data.userId !== user?.id && ( */}
                    <div className="text-xs text-neutral-700 bg-neutral-950 absolute -top-2 left-10">
                      <button
                        className="hover:bg-neutral-900/50 rounded-full px-1"
                        onClick={() => getParentId && getParentId(data.id)}
                      >
                        Replay
                      </button>
                    </div>
                  {/* )} */}
                  {/* {data.userId === user?.id && ( */}
                    <div className="text-xs text-neutral-700 bg-neutral-950 absolute -top-2 left-32">
                      <button
                        className="hover:bg-neutral-900/50 rounded-full px-1"
                        onClick={() => onDelete(data.id)}
                      >
                        Delete
                      </button>
                    </div>
                  {/* )} */}
                  {data.children?.length! > 0 && (
                    <div className="text-xs text-neutral-700 bg-neutral-950 absolute -top-2 left-28">
                      <button
                        className="hover:bg-neutral-900/50 rounded-full px-1"
                        onClick={() => onExpand(data.id)}
                      >
                        {expand[data.id]
                          ? "Hide"
                          : `show ${data.children?.length} more`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {expand[data.id] && (
            <CommandsList
              commands={data.children!}
              level={level + 1}
              getParentId={getParentId}
            />
          )}
        </>
      ))}
    </div>
  );
};

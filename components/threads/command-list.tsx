"use client";

import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { timeSince } from "@/utils/time-since";
import { CommandNode } from "@/utils/structure-data";
import { useCurrentUser } from "@/hooks/use-current-user";

import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import { deleteCommand } from "@/actions/thread";

interface CommandListProps {
  level?: number;
  commands: CommandNode[];
  getParentId: (id: string) => void;
}

export const CommandsList = ({
  level = 0,
  commands,
  getParentId,
}: CommandListProps) => {
  const [expand, setExpand] = useState<Record<string, boolean>>({});

  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const router = useRouter();

  const onExpand = (id: string) => {
    setExpand((prevExpandStates) => ({
      ...prevExpandStates,
      [id]: !prevExpandStates[id],
    }));
  };

  const onDelete = async (id: string) => {
    startTransition(() => {
      deleteCommand(id)
        .then((data) => {
          if (data.success) toast.success(data.success);
          if (data.error) toast.error(data.error);
        })
        .finally(() => router.refresh());
    });
  };

  return (
    <div className="w-full h-fit flex flex-col items-start justify-start space-y-4">
      {commands.map((data, index) => (
        <>
          <div
            className="w-full h-fit flex flex-row items-start justify-start gap-2"
            style={{
              paddingLeft: level ? `${level * 25 * 2}px` : undefined,
            }}
            key={index}
          >
            <Image
              src={data?.user?.image || ""}
              alt={data?.user?.user_name || ""}
              title={data?.user?.user_name}
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
            />
            <div className="w-full h-full flex flex-col items-start justify-start gap-y-1">
              <div className="w-full flex flex-row items-center justify-between">
                <h3 className="text-sm text-neutral-300 font-medium">
                  {data.user?.user_name}
                </h3>
                <p className="text-sm text-neutral-600">
                  {timeSince(data.createAt)}
                </p>
              </div>
              <div className="w-full flex flex-row items-center justify-between">
                <p className="text-xs text-neutral-400">{data.body}</p>
                <IoMdHeartEmpty
                  size={16}
                  className=""
                  role="button"
                  onClick={() => {}}
                />
              </div>
              <div className="relative h-[1px] w-full bg-neutral-700 mt-2">
                {data.user?.id !== user?.id && (
                  <button
                    className="absolute -top-1.5 left-6 text-[10px] bg-neutral-700 rounded-lg px-1 
                  hover:bg-neutral-700/60"
                    onClick={() => getParentId && getParentId(data.id)}
                  >
                    Replay
                  </button>
                )}
                {data.user?.id === user?.id && (
                  <button
                    className="absolute -top-1.5 left-6 text-[10px] bg-neutral-700 rounded-lg px-1 
                  hover:bg-neutral-700/60"
                    onClick={() => onDelete(data.id)}
                    disabled={isPending}
                  >
                    Delete
                  </button>
                )}
                {data.children?.length! > 0 && (
                  <button
                    className="absolute -top-1.5 left-20 text-[10px] bg-neutral-700 rounded-lg px-1 
                  hover:bg-neutral-700/60"
                    onClick={() => onExpand(data.id)}
                  >
                    {expand[data.id]
                      ? "Hide"
                      : `show ${data.children?.length} more`}
                  </button>
                )}
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

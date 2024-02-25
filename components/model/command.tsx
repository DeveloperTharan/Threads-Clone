"use client";

import React, { useState } from "react";

import { Commands, User } from "@prisma/client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { CommandsList } from "../command/commands-list";
import { CommandInput } from "../command/command-input";
import { PiChatsCircleDuotone } from "react-icons/pi";
import { Spinner } from "../ui/spinner";

interface CommandProps {
  children?: React.ReactNode;
  threadId?: string;
  commands?: (Commands & {
    user: User;
  })[];
  parentId?: string;
  level?: number;
}

export const Command = ({
  children,
  threadId,
  commands,
  level = 0,
}: CommandProps) => {
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [expand, setExpand] = useState<Record<string, boolean>>({});

  const handleParentId = (id: string) => {
    setParentId(id);
  };

  const onExpand = (commandId: string) => {
    setExpand((prevExpand) => ({
      ...prevExpand,
      [commandId]: !prevExpand[commandId],
    }));
  };
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <h1 className="text-xl text-neutral-400 font-semibold absolute -top-14 left-1/2 -translate-x-1/2">
          Commands...
        </h1>
        <DrawerDescription className="w-full h-96 px-6 md:px-20 overflow-auto scrollbar-hide">
          {!commands ||
            (commands.length == 0 && (
              <div className="h-full flex flex-col space-y-2 items-center justify-center">
                <PiChatsCircleDuotone size={100} className="text-neutral-600" />
                <p className="text-sm text-neutral-600">No commands...</p>
              </div>
            ))}

          {commands == undefined && (
            <div className="h-full flex items-center justify-center">
              <Spinner size={"lg"} />
            </div>
          )}

          <div className="flex flex-col h-full w-full gap-8 mb-64">
            {commands?.map((data) => (
              <div className="w-full h-auto" key={data.id}>
                <CommandsList
                  id={data.id}
                  userId={data.userId}
                  command={data.command}
                  user={data.user}
                  level={level}
                  onExpand={() => onExpand(data.id)}
                  expanded={expand[data.id]}
                  handleParentId={handleParentId}
                />
                {expand[data.id] && (
                  <Command parentId={data.id} level={level + 1} />
                )}
              </div>
            ))}
          </div>

          <CommandInput
            threadId={threadId!}
            parentId={parentId}
            setParentId={() => setParentId(undefined)}
          />
        </DrawerDescription>
      </DrawerContent>
    </Drawer>
  );
};

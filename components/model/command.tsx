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
import { StructureData } from "@/lib/structure-data";

interface CommandProps {
  children?: React.ReactNode;
  threadId?: string;
  commands?: (Commands & {
    user: User;
  })[];
}

export const Command = ({ children, threadId, commands }: CommandProps) => {
  const [parentId, setParentId] = useState<string | undefined>(undefined);

  const OrganizedCommands = StructureData(commands || []);

  const handleParentId = (id: string) => {
    setParentId(id);
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
            <CommandsList commands={OrganizedCommands} getParentId={handleParentId} />
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

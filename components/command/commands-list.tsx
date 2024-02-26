"use client";

import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Commands, User } from "@prisma/client";
import { useUser } from "@/context/user-context";

interface CommandListProps {
  commands: (Commands & {
    user: User;
  })[];
  getParentId: (id: string) => void;
}

export const CommandsList = ({ commands, getParentId }: CommandListProps) => {
  const { User } = useUser();
  console.log(commands)

  return <div>commands</div>;
};

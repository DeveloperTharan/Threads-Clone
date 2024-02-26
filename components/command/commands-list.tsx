"use client";

import React, { SetStateAction } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useUser } from "@/context/user-context";

interface CommandListProps {
  
}

export const CommandsList = ({}: CommandListProps) => {
  const { User } = useUser();

  return (
    <div>commands</div>
  );
};

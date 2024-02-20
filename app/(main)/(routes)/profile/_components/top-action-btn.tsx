"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopActionBtnProps {
  children: React.ReactNode;
  threadId: string;
}

export const TopActionBtn = ({ children, threadId }: TopActionBtnProps) => {
  const router = useRouter();

  const onClick = async () => {
    try {
      await axios.delete(`/api/thread/${threadId}`);
      toast.success("Thread Deleted", {
        description: "Thread Deleted",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.refresh();
    } catch (error) {
      console.log("[THREAD_DELETE]", error);
      toast.error("Something went wrong", {
        description: "Thread delete Error",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Pin to Profile</DropdownMenuItem>
        <DropdownMenuItem>Who can replay</DropdownMenuItem>
        <DropdownMenuItem>Hide like and share</DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-600 hover:bg-red-600/10 hover:text-red-600"
          onClick={onClick}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

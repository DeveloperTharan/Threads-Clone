"use client";

import React from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@clerk/nextjs";

interface TopActionBtnProps {
  children: React.ReactNode;
  threadId: string;
  autherId: string;
}

export const TopActionBtn = ({ children, threadId, autherId }: TopActionBtnProps) => {
  const router = useRouter();
  const { userId } = useAuth();

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
    <>
    {autherId !== userId ? (
      <DropdownMenu dir="ltr">
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Report</DropdownMenuItem>
        <DropdownMenuItem>block</DropdownMenuItem>
        <DropdownMenuItem>Hide</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    ) : (
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
    )}
    </>
  );
};

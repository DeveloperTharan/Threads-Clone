'use client'

import React, { useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { CreateThread } from "../create-thread";

interface CreateThreadModelProps {
  children: React.ReactNode;
  onClick: () => void;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateThreadModel = ({
  children,
  onClick,
  Open,
  setOpen,
}: CreateThreadModelProps) => {
  const handleKeyDown = (e: any) => {
    e.stopPropagation();
    /* alert("close");
    setOpen(false); */
  };

  return (
    <Dialog open={Open == true} onOpenChange={onClick}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent onBlur={handleKeyDown}>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-2 w-full">
            <CreateThread />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

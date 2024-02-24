import React from "react";

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
  return (
    <Dialog open={Open == true} onOpenChange={onClick}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <h1 className="text-lg text-neutral-400 font-semibold absolute -top-10 left-1/2 -translate-x-1/2">
          Create Your Threads...
        </h1>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-2 w-full">
            <CreateThread setClose={setOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

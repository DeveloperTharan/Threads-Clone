import React from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { DialogHeader } from "../ui/dialog";

interface CreateThreadModelProps {
  children: React.ReactNode;
  onClick: () => void;
  Open: boolean;
  isLoading: boolean;
}

export const CreateThreadModel = ({
  children,
  onClick,
  Open,
  isLoading,
}: CreateThreadModelProps) => {
  return (
    <Dialog open={Open == true} onOpenChange={onClick}>
      <DialogTrigger className="w-full cursor-text">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure?
            <p className="text-xs text-gray-500 my-2">
              This action cannot be undone. It will delete your account and all
              its associated data.
            </p>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2 w-full">
            <Button variant="ghost" className="w-full" onClick={onClick}>
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              className="bg-red-600 w-full"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Delete Account"}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

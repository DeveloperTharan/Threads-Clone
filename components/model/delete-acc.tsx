import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface EditProfileProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onClick: () => void;
  Open: boolean;
}

export const DeleteAcc = ({
  children,
  onConfirm,
  onClick,
  Open,
}: EditProfileProps) => {
  return (
    <Dialog open={Open == true} onOpenChange={onClick}>
      <DialogTrigger className="bg-red-600 px-4 py-2 rounded-lg">
        {children}
      </DialogTrigger>
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
              onClick={onConfirm}
            >
              Delete Account
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

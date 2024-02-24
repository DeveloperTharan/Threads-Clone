"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import debounce from "debounce";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Editor } from "../utils/editor";

interface UpdateBioProps {
  children: React.ReactNode;
  initialData: string | null;
  id: string;
}

export const UpdateBio = ({ children, initialData, id }: UpdateBioProps) => {
  const router = useRouter();

  const onChange = debounce(async (value: string) => {
    try {
      await axios.patch(`/api/profile/${id}`, JSON.stringify({ bio: value }));
      toast.success("Bio Updated", {
        description: "Bio updated successfully",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.refresh();
    } catch (error) {
      console.log("[PROFILE_ERROR]", error);
      toast.error("Something went wrong", {
        description: "Bio updated Error",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }, 2000);

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <h1 className="text-xl text-neutral-400 font-semibold absolute -top-14 left-1/2 -translate-x-1/2">
          Update your Bio...
        </h1>
        <DialogDescription className="mt-5">
          <Editor
            theme="snow"
            onChange={(e) => onChange(e)}
            value={initialData!}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditBasicInfo } from "../edit-profile/edit-basic-info";
import { EditProfilePic } from "../edit-profile/edit-pic";
import { Gender, Follows, User } from "@prisma/client";

interface EditProfileProps {
  initialData: {
    gender: Gender | null;
    followers: Follows[];
    following: Follows[];
  } & User;
  children: React.ReactNode;
}

export const EditProfile = ({ children, initialData }: EditProfileProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription className="my-5">
            <EditProfilePic initialData={initialData.imageURL} />
            <EditBasicInfo />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

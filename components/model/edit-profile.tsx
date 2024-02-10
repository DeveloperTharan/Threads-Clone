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
import { EditBio } from "../edit-profile/edit-bio";
import { EditStatus } from "../edit-profile/edit-status";
import { EditGender } from "../edit-profile/edit-gender";

interface EditProfileProps {
  initialData: {
    gender: Gender | null;
    followers: Follows[];
    following: Follows[];
  } & User;
  children: React.ReactNode;
  gender: Gender[];
}

export const EditProfile = ({ children, initialData, gender }: EditProfileProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription className="my-5">
            <div className="flex flex-row items-center gap-x-20 w-full h-auto">
              <EditProfilePic
                initialData={initialData.imageURL}
                userId={initialData.userId}
              />
              <EditBio
                initialData={initialData.bio}
                userId={initialData.userId}
              />
            </div>
            <div className="flex flex-row gap-x-12 items-center mb-4">
              <EditStatus
                initialData={initialData.emoje}
                userId={initialData.userId}
              />
              <EditGender
                initialData={initialData.gender?.type}
                data={gender}
                userId={initialData.userId}
              />
            </div>
            <EditBasicInfo
              userName={initialData.user_name}
              officialName={initialData.official_name}
              userId={initialData.userId}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};


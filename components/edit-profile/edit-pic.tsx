"use client";

import React, { useState } from "react";
import Image from "next/image";

import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";

import { VscEdit } from "react-icons/vsc";
import { FileUplode } from "../model/file-uplode";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  imageURL: z.string().min(1, {
    message: "Image is required",
  }),
});

export const EditProfilePic = ({
  initialData,
  id,
}: {
  initialData: string;
  id: string;
}) => {
  const [Open, setOpen] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile/${id}`, values);
      toast.success("Profile Updated", {
        description: "Profile Image updated successfully",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.refresh();
    } catch (error) {
      console.log("[PROFILE_ERROR]", error);
      toast.error("Something went wrong", {
        description: "Profile Image updated Error",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <div className="relative w-fit h-fit my-5 group">
      <Image
        src={initialData}
        alt="profile"
        width={200}
        height={200}
        className="rounded-full"
      />
      <FileUplode
        filetype=".jpeg, .png, .jpg"
        onSubmit={(url) => onSubmit({ imageURL: url })}
        onClick={() => setOpen(!Open)}
        Open={Open}
        setOpen={setOpen}
      >
        <div
          className="absolute bottom-5 right-0 rounded-full opacity-0 group-hover:opacity-100 
        bg-neutral-700/80 text-neutral-400 hover:bg-neutral-700/50 p-1"
          role="button"
        >
          <VscEdit size={20} />
        </div>
      </FileUplode>
    </div>
  );
};

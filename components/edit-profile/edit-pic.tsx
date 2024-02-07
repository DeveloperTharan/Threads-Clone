"use client";

import React from "react";
import Image from "next/image";

import * as z from "zod";
import { toast } from "react-toastify";

import { VscEdit } from "react-icons/vsc";
import { FileUplode } from "../model/file-uplode";

const formSchema = z.object({
  imageURL: z.string().min(1, {
    message: "Image is required",
  }),
});

export const EditProfilePic = ({ initialData }: { initialData: string }) => {
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="relative w-fit h-fit my-5 group">
      <Image
        src={initialData}
        alt="profile"
        width={100}
        height={100}
        className="rounded-full"
      />
      <FileUplode
        filetype=".jpeg, .png, .jpg"
        onSubmit={(url) => onSubmit({ imageURL: url })}
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

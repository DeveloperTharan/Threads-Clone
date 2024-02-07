"use client";

import React, { useState } from "react";
import Image from "next/image";

import * as z from "zod";
import { toast } from "react-toastify";

import { VscEdit } from "react-icons/vsc";
import { IoIosClose } from "react-icons/io";
import { Button } from "../ui/button";

const formSchema = z.object({
  imageURL: z.string().min(1, {
    message: "Image is required",
  }),
});

export const EditProfilePic = ({ initialData }: { initialData: string }) => {
  const [edit, setEdit] = useState<boolean>(false);

  const toggleEdit = () => setEdit((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="relative w-fit h-fit my-5 group">
      {!edit && (
        <>
          <Image
            src={initialData}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <Button
            className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100"
            size={"sm"}
            variant={"secondary"}
            onClick={toggleEdit}
          >
            <VscEdit />
          </Button>
        </>
      )}
      {edit && (
        <>
          edit
        </>
      )}
    </div>
  );
};

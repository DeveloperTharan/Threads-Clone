"use client";

import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Editor } from "./editor";
import { Button } from "./ui/button";
import { FileUplode } from "./model/file-uplode";
import { useUser } from "@/context/user-context";

import { IoIosImages } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export const CreateThread = ({
  setClose,
}: {
  setClose: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [Open, setOpen] = useState<boolean>(false);
  const [isdisable, setIsDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<{
    description: string;
    assert: string;
  }>({
    description: "",
    assert: "",
  });

  useEffect(() => {
    if (
      values.description.localeCompare("<p><br></p>") == 0 ||
      values.description.length == 0
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }

    if (values.assert.length > 0) setIsDisable(false);
  }, [values]);

  const router = useRouter();
  const { User } = useUser();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/thread`, {
        description: values.description,
        assert: values.assert,
        id: User?.id,
      });
      toast.success("New Thread Posted", {
        description: "New thread",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.refresh();
      setIsLoading(false);
      setClose(false);
    } catch (error) {
      console.log("[THREAD_ERROR]", error);
      toast.error("Something went wrong", {
        description: "Thread Post Error",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start">
      {!User || User === undefined ? (
        <div className="flex gap-x-4 items-center justify-start">
          <div className="w-16 h-16 bg-neutral-700/70 animate-pulse rounded-full" />
          <div className="w-44 h-4 rounded-md animate-pulse bg-neutral-700/70" />
        </div>
      ) : (
        <div className="flex flex-row w-full justify-start gap-x-4">
          <Image
            src={User?.imageURL}
            alt={User?.user_name}
            title={User?.user_name}
            width={45}
            height={45}
            className="rounded-full cursor-pointer"
            onClick={() => router.push("profile")}
          />
          <span className="text-xl font-bold">{User.user_name}</span>
        </div>
      )}
      <div className="flex flex-col w-full items-start justify-start ml-10">
        <Editor
          theme={"bubble"}
          placeholder="Start your thread..."
          onChange={(e) => {
            setValues((pre) => ({ ...pre, description: e }));
          }}
          value={values.description}
        />
        <div className="ml-4">
          <FileUplode
            filetype=".jpeg, .png, .jpg, .gif, .webp, .svg"
            onSubmit={(url) => setValues((pre) => ({ ...pre, assert: url }))}
            onClick={() => setOpen(!Open)}
            Open={Open}
            setOpen={setOpen}
          >
            <IoIosImages size={20} />
          </FileUplode>
        </div>
      </div>
      {values.assert.length > 0 && (
        <div className="relative h-auto w-full">
          <IoCloseOutline
            size={30}
            className="absolute top-5 right-1 p-1 text-white bg-neutral-600 
            hover:bg-neutral-600/70 rounded-full cursor-pointer"
            onClick={() => setValues((pre) => ({ ...pre, assert: "" }))}
          />
          <Image
            src={values.assert}
            alt={"post"}
            width={500}
            height={500}
            className="object-cover my-4 rounded-lg"
          />
        </div>
      )}
      <Button
        disabled={isdisable}
        className="rounded-full ml-auto"
        onClick={onSubmit}
      >
        {isLoading ? <Spinner size={"lg"} /> : "Post"}
      </Button>
    </div>
  );
};

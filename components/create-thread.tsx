"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Editor } from "./editor";
import { Button } from "./ui/button";
import { FileUplode } from "./model/file-uplode";
import { useUser } from "@/context/user-context";

import { IoIosImages } from "react-icons/io";

export const CreateThread = () => {
  const [Open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [assert, setAssert] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isdisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
    if (!content.localeCompare("<p><br></p>")) setIsDisable(false);
    if (assert.length > 0) setIsDisable(false);
  }, [content, assert]);

  const router = useRouter();
  const { User } = useUser();

  const onSubmit = () => {};
  console.log(content);

  return (
    <div className="w-full flex flex-col items-start justify-start">
      {!User || User === undefined ? (
        <div className="w-20 h-20 bg-neutral-700/70 animate-pulse rounded-full" />
      ) : (
        <div className="flex flex-row w-full items-center justify-start gap-x-4">
          <Image
            src={User?.imageURL}
            alt={User?.user_name}
            title={User?.user_name}
            width={40}
            height={40}
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
            if (e.localeCompare("<p><br></p>")) {
              setContent("");
            }
            setContent(e);
          }}
          value={content}
        />
        <div className="ml-4">
          <FileUplode
            filetype=".jpeg, .png, .jpg, .gif"
            onSubmit={(url) => setAssert(url)}
            onClick={() => setOpen(!Open)}
            Open={Open}
          >
            <IoIosImages size={20} />
          </FileUplode>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isdisable}
        className="rounded-full ml-auto"
      >
        Post
      </Button>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { CreateThreadModel } from "@/components/model/create-thread";

export const CreateThread = () => {
  const [Open, setOpen] = useState(false);

  const router = useRouter();
  const { User } = useUser();

  return (
    <div className="h-auto w-full flex flex-col items-start justify-start border-b">
      <h1 className="text-4xl font-bold text-neutral-700/70">
        Create your threads
      </h1>
      <CreateThreadModel
        Open={Open}
        onClick={() => setOpen(!Open)}
        isLoading={false}
      >
        <div className="w-full flex flex-row justify-between items-center mt-7 mb-4">
          <div className="flex flex-row gap-x-2 items-center justify-start">
            <Image
              src={User?.imageURL!}
              alt={User?.user_name!}
              title={User?.user_name!}
              width={60}
              height={60}
              className="rounded-full cursor-pointer"
              onClick={() => router.push("profile")}
            />
            <span className="text-neutral-500">Start a thread...</span>
          </div>
          <Button size={"lg"} className="rounded-full" disabled>
            Post
          </Button>
        </div>
      </CreateThreadModel>
    </div>
  );
};

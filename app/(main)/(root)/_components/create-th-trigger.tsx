"use client";

import React, { Suspense, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CreateThreadModel } from "@/components/models/create-threads";

export const CreateThreadTrigger = () => {
  const [Open, setOpen] = useState(false);
  const user = useCurrentUser();
  return (
    <Suspense>
      <CreateThreadModel isOpen={Open} setIsOpen={setOpen}>
        <div
          className="w-full h-fit flex flex-row items-center gap-x-3 my-3 
          border-b border-neutral-700 py-4"
        >
          <Avatar src={user?.image || ""} alt="user" size="md" />
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-neutral-600">Start yout threads...</p>
            <Button
              variant="solid"
              color="default"
              disabled={true}
              size="sm"
              className="rounded-full"
            >
              Post
            </Button>
          </div>
        </div>
      </CreateThreadModel>
    </Suspense>
  );
};

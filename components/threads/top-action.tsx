"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { deleteThread } from "@/actions/thread";
import { useCurrentUser } from "@/hooks/use-current-user";

import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";

interface ThreadTopActionProps {
  children: React.ReactNode;
  post_user_id: string;
  thread_id: string;
}

export const ThreadTopAction = ({
  children,
  post_user_id,
  thread_id,
}: ThreadTopActionProps) => {
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const router = useRouter();

  const onDelete = () => {
    startTransition(() => {
      deleteThread(thread_id)
        .then((data) => {
          if (data.success) toast.success(data.success);
          if (data.error) toast.error(data.error);
        })
        .finally(() => router.refresh());
    });
  };

  return (
    <>
      {user?.id !== post_user_id && (
        <Dropdown
          className="bg-background border border-neutral-700 rounded-lg"
          placement="bottom-end"
        >
          <DropdownTrigger>
            <Button className="bg-transparent border-none min-w-unit-5">
              {children}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem key="Report">Report</DropdownItem>
            <DropdownItem key="Block">Block</DropdownItem>
            <DropdownItem key="Hide">Hide</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      {user?.id === post_user_id && (
        <Dropdown
          className="bg-background border border-neutral-700 rounded-lg"
          placement="bottom-end"
        >
          <DropdownTrigger>
            <Button className="bg-transparent border-none min-w-unit-5">
              {children}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem key="Pin to Profile">Pin to Profile</DropdownItem>
            <DropdownItem key="Who can replay">Who can replay</DropdownItem>
            <DropdownItem key="Hide like and share">
              Hide like and share
            </DropdownItem>
            <DropdownItem
              key="Delete"
              className="text-danger"
              color="danger"
              onClick={onDelete}
            >
              {isPending ? <Spinner size="md" /> : "Delete"}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

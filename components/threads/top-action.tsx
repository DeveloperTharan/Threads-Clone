"use client";

import React from "react";

import { useCurrentUser } from "@/hooks/use-current-user";

import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
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
  const user = useCurrentUser();

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
            <DropdownItem key="Report">Settings</DropdownItem>
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
            <DropdownItem key="Delete" className="text-danger" color="danger">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

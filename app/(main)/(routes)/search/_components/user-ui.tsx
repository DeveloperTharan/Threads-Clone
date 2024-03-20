import { Avatar, Button } from "@nextui-org/react";
import { Follows, User } from "@prisma/client";
import React from "react";

interface UserUiProps {
  data: User;
}

export const UserUi = ({ data }: UserUiProps) => {
  return (
    <div className="w-full h-fit flex flex-row items-start justify-start gap-x-2">
      <Avatar src={data.image!} alt={data.user_name!} size="md" />
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-y-1">
          <h2 className="text-lg font-semibold text-neutral-300">
            {data.user_name}
          </h2>
          <p className="text-xs text-neutral-600">{data.bio}</p>
        </div>
        <Button variant="bordered" size="sm">Follow</Button>
      </div>
    </div>
  );
};

import { Image } from "@nextui-org/react";
import React from "react";

export const AccoundTypeForm = ({
  accountType,
}: {
  accountType: string | undefined;
}) => {
  return <div className="w-full flex flex-col items-center justify-center space-y-10">
    <Image src="/logo.svg" alt="thread" width={200} />
  </div>;
};

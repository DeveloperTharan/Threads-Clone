'use client'

import React from "react";

import { UserUi } from "./user-ui";
import { Search } from "lucide-react";
import { User } from "@prisma/client";
import { LoadMore } from "./load-more";
import { Input } from "@nextui-org/react";

export const SearchComponent = async ( { user }: { user: User[] | null } ) => {
  
  return (
    <div className="h-full flex flex-col space-y-5 w-full md:w-[60%] mx-auto px-5 md:px-0 py-10">
      <Input
        size="lg"
        variant="bordered"
        color="secondary"
        className="w-full"
        placeholder="search"
        startContent={<Search size={20} className="text-neutral-600" />}
      />
      <div className="w-full h-full flex flex-col space-y-2 pt-4">
        {user?.map((data, index) => (
          <div
            key={index}
            className="h-full w-full flex flex-col items-start justify-start border-b border-spacing-10
          border-neutral-700 pb-4"
          >
            <UserUi data={data} />
          </div>
        ))}
      </div>
      {/* <LoadMore /> */}
    </div>
  );
};

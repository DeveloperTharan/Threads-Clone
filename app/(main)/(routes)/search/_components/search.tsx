"use client";

import React, { useEffect, useState } from "react";

import { getUserBySearch, getThreadsBySearch } from "@/data/search";

import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  return (
    <div className="w-full h-full flex flex-col space-y-5">
      <Input
        size="lg"
        color="secondary"
        variant="bordered"
        placeholder="Search '@xxx' (or) xxx"
        onChange={(e) => setSearchValue(e.target.value)}
        startContent={<SearchIcon size={20} className="text-neutral-600" />}
      />
    </div>
  );
};

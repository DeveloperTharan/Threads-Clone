"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

import { PiHeart } from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { RiSearchLine, RiShareCircleLine } from "react-icons/ri";
import { CreateThreadModel } from "./model/create-thread";

export const BottomBar = () => {
  const [Open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full h-fit py-1 bg-neutral-900 rounded-t-3xl fixed md:hidden bottom-0 left-0 z-50">
      <div className="flex flex-row items-center justify-evenly">
        <div
          className="px-7 py-4 hover:bg-neutral-700/30 rounded-md cursor-pointer"
          onClick={() => router.push("/")}
        >
          <GrHomeRounded
            size={24}
            className={cn(
              "text-neutral-500",
              pathname === "/" && "text-neutral-100"
            )}
          />
        </div>
        <div
          className="px-7 py-4 hover:bg-neutral-700/30 rounded-md cursor-pointer"
          onClick={() => router.push("/search")}
        >
          <RiSearchLine
            size={24}
            className={cn(
              "text-neutral-500",
              pathname === "/search" && "text-neutral-100"
            )}
          />
        </div>
        <CreateThreadModel
          Open={Open}
          onClick={() => setOpen(!Open)}
          isLoading={false}
        >
          <div className="px-7 py-4 hover:bg-neutral-700/30 rounded-md cursor-pointer">
            <RiShareCircleLine size={24} className={cn("text-neutral-500")} />
          </div>
        </CreateThreadModel>
        <div
          className="px-7 py-4 hover:bg-neutral-700/30 rounded-md cursor-pointer"
          onClick={() => router.push("/ativity")}
        >
          <PiHeart
            size={24}
            className={cn(
              "text-neutral-500",
              pathname === "/ativity" && "text-neutral-100"
            )}
          />
        </div>
        <div
          className="px-7 py-4 hover:bg-neutral-700/30 rounded-md cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <IoPersonOutline
            size={24}
            className={cn(
              "text-neutral-500",
              pathname === "/profile" && "text-neutral-100"
            )}
          />
        </div>
      </div>
    </div>
  );
};

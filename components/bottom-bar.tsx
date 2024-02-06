'use client'

import React from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

import { GrHomeRounded } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { RiSearchLine, RiShareCircleLine } from "react-icons/ri";

export const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    {
      id: 1,
      Icon: GrHomeRounded,
      href: "/",
    },
    {
      id: 2,
      Icon: RiSearchLine,
      href: "/search",
    },
    {
      id: 3,
      Icon: RiShareCircleLine,
      href: "/create-thread",
    },
    {
      id: 4,
      Icon: IoPersonOutline,
      href: "/profile",
    },
  ];
  return (
    <div className="w-full h-fit py-1 bg-neutral-900 rounded-t-3xl fixed md:hidden bottom-0 left-0">
      <div className="flex flex-row items-center justify-evenly">
      {menu.map((items) => (
        <div
          className="px-7 py-4 hover:bg-neutral-700/30 rounded-md cursor-pointer"
          key={items.id}
          onClick={() => router.push(`${items.href}`)}
        >
          <items.Icon
            size={24}
            className={cn(
              "text-neutral-500",
              items.href == pathname && "text-neutral-100"
            )}
          />
        </div>
      ))}
      </div>
    </div>
  );
};

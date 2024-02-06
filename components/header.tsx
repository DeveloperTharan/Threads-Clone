"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { FaArrowLeft } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { RiMenu4Fill, RiSearchLine, RiShareCircleLine } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
    <div
      className={cn(
        "w-full h-fit py-1 sticky top-0 bg-transparent px-4 md:px-0",
        isScrolled && "backdrop-blur-sm bg-black/20"
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <Image src={"/logo.svg"} alt="logo" width={60} height={60} />
        <div className="hidden md:flex flex-row gap-x-5 justify-center items-center">
          <FaArrowLeft
            size={20}
            className={cn(
              "hidden text-neutral-500",
              pathname !== "/" &&
                "block hover:text-neutral-100 cursor-pointer mt-2"
            )}
            onClick={() => router.back()}
          />
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <RiMenu4Fill
              size={28}
              className="text-neutral-500 hover:text-neutral-100 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>
              <span className="text-red-600">Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

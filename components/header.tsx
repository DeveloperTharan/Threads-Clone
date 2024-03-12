"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SignOut } from "@/actions/sign-out";
import { useCurrentUser } from "@/hooks/use-current-user";
/* import { CreateThreadModel } from "./model/create-thread"; */

import { PiHeart } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { RiMenu4Fill, RiSearchLine, RiShareCircleLine } from "react-icons/ri";

import {
  cn,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [Open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const user = useCurrentUser();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    SignOut();
    return router.push("/auth/sign-in");
  };

  return (
    <nav
      className={cn(
        "w-full h-fit py-2 md:py-1 sticky top-0 bg-transparent px-4 md:px-0 z-50",
        isScrolled && "backdrop-blur-sm bg-black/20"
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <Image src={"/logo.svg"} alt="logo" width={35} height={35} />
        <div className="hidden md:flex flex-row gap-x-5 justify-center items-center">
          <FaArrowLeft
            size={20}
            className={cn(
              pathname !== "/"
                ? "block text-neutral-500 hover:text-neutral-100 cursor-pointer mt-2"
                : "hidden text-neutral-500"
            )}
            onClick={() => router.back()}
          />
          <button className="btn" onClick={() => router.push("/")}>
            <GrHomeRounded
              size={24}
              className={cn(
                pathname === "/" ? "text-neutral-100" : "text-neutral-500"
              )}
            />
          </button>
          <button className="btn" onClick={() => router.push("/search")}>
            <RiSearchLine
              size={24}
              className={cn(
                pathname === "/search" ? "text-neutral-100" : "text-neutral-500"
              )}
            />
          </button>
          {/* <CreateThreadModel
            Open={Open}
            setOpen={setOpen}
            onClick={() => setOpen(!Open)}
          > */}
          <div className="btn">
            <RiShareCircleLine size={24} className={cn("text-neutral-500")} />
          </div>
          {/* </CreateThreadModel> */}
          <button className="btn" onClick={() => router.push("/activity")}>
            <PiHeart
              size={24}
              className={cn(
                pathname === "/activity"
                  ? "text-neutral-100"
                  : "text-neutral-500"
              )}
            />
          </button>
          <button className="btn" onClick={() => router.push(`/${user?.name}`)}>
            <IoPersonOutline
              size={24}
              className={cn(
                pathname === `/${user?.name}`
                  ? "text-neutral-100"
                  : "text-neutral-500"
              )}
            />
          </button>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button className="bg-transparent border-none min-w-unit-10">
              <RiMenu4Fill
                size={28}
                className="text-neutral-500 hover:text-neutral-100 cursor-pointer"
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem
              onClick={() => router.push(`/profile/settings/${user?.id}`)}
              key="settings"
            >
              Settings
            </DropdownItem>
            <DropdownItem key="report">Report</DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              onClick={handleSignOut}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};

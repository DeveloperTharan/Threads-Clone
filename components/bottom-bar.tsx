"use client";

import React, { useState } from "react";
import { cn } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

import { PiHeart } from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { RiSearchLine, RiShareCircleLine } from "react-icons/ri";
import { useCurrentUser } from "@/hooks/use-current-user";
/* import { CreateThreadModel } from "./model/create-thread"; */

export const BottomBar = () => {
  const [Open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <div className="w-full h-fit py-1 bg-neutral-900 rounded-t-3xl fixed md:hidden bottom-0 left-0 z-50">
      <div className="flex flex-row items-center justify-evenly">
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
        <button className="btn" onClick={() => router.push("/ativity")}>
          <PiHeart
            size={24}
            className={cn(
              pathname === "/activity" ? "text-neutral-100" : "text-neutral-500"
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
    </div>
  );
};

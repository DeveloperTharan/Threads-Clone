"use client";

import { SignOut } from "@/actions/sign-out";
import { Button, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      Home
    </div>
  );
}

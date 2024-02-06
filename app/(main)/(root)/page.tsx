import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function MainPage() {
  return (
    <div className="flex justify-between items-center">
      MainPage
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}

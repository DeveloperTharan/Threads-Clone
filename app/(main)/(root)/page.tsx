import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function MainPage() {
  return (
    <div>
      MainPage
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}

import React from "react";

import { BottomBar } from "@/components/bottom-bar";
import { Header } from "@/components/header";

export default function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full max-w-[1300px] md:px-24 mx-auto">
      <Header />
      <div className="h-full w-full md:w-5/6 lg:w-1/2 px-4 mx-auto">
        {children}
      </div>
      <BottomBar />
    </div>
  );
}

import React from "react";

import { Header } from "@/components/header";
import { BottomBar } from "@/components/bottom-bar";

export default async function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[900px] h-auto mx-auto">
      <Header />
      {children}
      <BottomBar />
    </div>
  );
}

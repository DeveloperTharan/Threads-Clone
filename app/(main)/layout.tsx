import React from "react";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import { Header } from "@/components/header";
import { BottomBar } from "@/components/bottom-bar";

export default async function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="w-full max-w-[900px] h-auto min-h-full mx-auto">
        <Header />
        {children}
        <BottomBar/>
      </div>
    </SessionProvider>
  );
}

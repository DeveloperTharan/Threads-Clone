import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="w-full max-w-[1100px] h-full mx-auto">{children}</div>
    </SessionProvider>
  );
}

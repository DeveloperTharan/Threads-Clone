import { auth } from "@/auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import React from "react";

export const metadata: Metadata = {
  title: "OnBoarding - Threads",
  description: "onboarding",
};

export default async function Onboardinglayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="w-full max-w-[1100px] h-full mx-auto">
        {children}
      </div>
    </SessionProvider>
  );
}

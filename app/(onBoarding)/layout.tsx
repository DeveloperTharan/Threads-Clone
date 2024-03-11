import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "OnBoarding / Threads",
  description: "onboarding",
};

export default function Onboardinglayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[1100px] h-auto min-h-screen mx-auto flex items-center justify-center">
      {children}
    </div>
  );
}

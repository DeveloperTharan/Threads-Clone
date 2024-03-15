import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) return redirect("/auth/sign-in");
  return (
    <div className="flex flex-col items-center justify-center h-auto min-h-[calc(100vh-4rem)]">
      {session ? JSON.stringify(session.user) : "no session"}
    </div>
  );
}

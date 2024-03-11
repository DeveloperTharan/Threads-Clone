"use client";

import { SignOut } from "@/actions/sign-out";
import { Button, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  const signOut = async () => {
    await SignOut();
  }

  return (
    <div className="h-auto min-h-screen flex flex-col items-center justify-center">
      {session.data === null && (
        <Link
          href="/auth/sign-in"
          color="secondary"
          className="px-2 py-1 rounded-xl border border-purple-600"
        >
          Login
        </Link>
      )}
      {JSON.stringify(session)}
      {session.data !== null && (
        <Button onClick={signOut}>SignOut</Button>
      )}
    </div>
  );
}

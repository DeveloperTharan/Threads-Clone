'use client'

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-auto min-h-screen flex items-center justify-center">
      <Button onClick={() => router.push("/auth/sign-in")}>Login</Button>
    </div>
  );
}

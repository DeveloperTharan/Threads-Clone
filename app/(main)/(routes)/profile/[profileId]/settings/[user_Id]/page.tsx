"use client";

import React, { useState } from "react";

import { DeleteAcc } from "@/components/model/delete-acc";
import axios from "axios";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { clerkClient, useAuth } from "@clerk/nextjs";

export default function SettingsPage({
  params,
}: {
  params: { user_Id: string };
}) {
  const [Open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const router = useRouter();
  const { userId } = useAuth();

  const { user_Id } = params;

  if (!userId) return router.push("/sign-in");

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/profile/${user_Id}`);
      setIsLoading(false);
      router.push("/sign-in");
      return new NextResponse("success", { status: 200 });
    } catch (error) {
      console.log("[USER_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };

  return (
    <div className="w-full h-auto">
      <h1 className="text-3xl font-bold mb-5">Settings</h1>
      <div className="flex flex-row justify-between items-center gap-2 border px-4 py-2 rounded-md">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-bold text-red-600">Danger</h1>
          <p className="text-sm text-neutral-500 w-[65%] text-wrap">
            This action may not undone. (Delete my Accound)
          </p>
        </div>
        <DeleteAcc
          onConfirm={onClick}
          onClick={() => setOpen(!Open)}
          Open={Open}
          isLoading={isLoading}
        >
          Delete
        </DeleteAcc>
      </div>
    </div>
  );
}

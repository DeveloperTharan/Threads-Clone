import React from "react";
import { AccoundTypeForm } from "@/components/user/accound-type";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export default async function AccountTypePage() {
  const session = await auth();

  if (!session) return null;

  const { user } = session;

  const profile = await getUserById(user.id!);

  return (
    <>
      <AccoundTypeForm accountType={profile?.accountType} />
    </>
  );
}

import React from "react";
import { AccoundTypeForm } from "@/components/onboarding/accound-type";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function AccountTypePage() {
  const session = await auth();

  if (!session) return null;

  const { user } = session;

  const profile = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return (
    <>
      <AccoundTypeForm accountType={profile?.accountType} />
    </>
  );
}

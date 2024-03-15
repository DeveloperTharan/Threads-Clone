import React, { Suspense } from "react";
import { NewVerification } from "@/components/auth/forms/new-verification";

export default function VerificationPage() {
  return (
    <Suspense>
      <NewVerification />
    </Suspense>
  );
}

import React, { Suspense } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { NewPasswordForm } from "@/components/auth/forms/new-password";

export default function NewPassword() {
  return (
    <CardWrapper>
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </CardWrapper>
  );
}

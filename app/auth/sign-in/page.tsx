import React from "react";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { SignInForm } from "@/components/auth/forms/signIn-form";

export default function SignIn() {
  return (
    <CardWrapper
      Or="SignUp"
      OrRedirect="sign-up"
      forgetRediret="forget-password"
    >
      <SignInForm />
    </CardWrapper>
  );
}

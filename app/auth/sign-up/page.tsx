import React from "react";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { SignUpForm } from "@/components/auth/forms/signUp-form";

export default function SignUp() {
  return (
    <CardWrapper Or="SignIn" OrRedirect="sign-in">
      <SignUpForm />
    </CardWrapper>
  );
}

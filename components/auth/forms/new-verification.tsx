"use client";

import React, { useCallback, useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { FormError } from "../form-error";
import { BeatLoader } from "react-spinners";
import { CardWrapper } from "../card-wrapper";
import { FormSuccess } from "../form-success";
import { Link } from "@nextui-org/react";
import { newVerification } from "@/actions/new-verification";

export const NewVerification = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
      .finally(() => {
        router.push("/onboarding");
      });
  }, [token, success, error, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper>
      <div className="flex flex-col items-center w-full justify-center gap-y-4 text-neutral-300">
        <h1 className="text-xl font-bold">Confirming your verification</h1>
        {!success && !error && <BeatLoader color="white" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
        <Link href="/auth/sign-in">Back to login</Link>
      </div>
    </CardWrapper>
  );
};

"use client";

import React, { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button, Input, Link } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPassword } from "@/actions/forget-password";
import { forgetPasswordSchema as formSchema } from "@/schema/schema";

export const ForgetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      forgetPassword(values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col items-start justify-start space-y-4"
    >
      <Input
        size="sm"
        type="text"
        name="email"
        label="email"
        color="secondary"
        autoComplete="off"
        variant="underlined"
        disabled={isPending}
        placeholder="xxyy@gmail.com"
        errorMessage={errors.email?.message}
        onChange={(e) => form.setValue("email", e.target.value)}
      />
      <FormError message={error} />
      <FormSuccess message={success} />
      <Button
        type="submit"
        variant="solid"
        color="secondary"
        className="w-full"
        disabled={isPending}
      >
        Sent
      </Button>
      <Link href="/auth/sign-in" className="text-sm mx-auto">
        Back to login
      </Link>
    </form>
  );
};

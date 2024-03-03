"use client";

import React, { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { SignIn } from "@/actions/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { signInSchema as formSchema } from "@/components/auth/schema";

import { Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@nextui-org/react";

export const SignInForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      SignIn(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col items-start justify-start space-y-4"
    >
      <Input
        size="sm"
        type="text"
        name="user_name"
        label="username"
        color="secondary"
        autoComplete="off"
        variant="underlined"
        disabled={isPending}
        errorMessage={errors.user_name?.message}
        onChange={(e) => form.setValue("user_name", `@${e.target.value}`)}
        startContent={<span className="text-default-400 text-small">@</span>}
      />
      <Input
        size="sm"
        name="password"
        label="password"
        placeholder=" "
        color="secondary"
        autoComplete="off"
        variant="underlined"
        disabled={isPending}
        errorMessage={errors.password?.message}
        type={showPassword ? "text" : "password"}
        onChange={(e) => form.setValue("password", e.target.value)}
        endContent={
          <>
            {!showPassword ? (
              <Eye
                size={20}
                className="text-neutral-400"
                role="button"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <EyeOff
                size={20}
                className="text-neutral-400"
                role="button"
                onClick={togglePasswordVisibility}
              />
            )}
          </>
        }
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
        SignIn
      </Button>
    </form>
  );
};

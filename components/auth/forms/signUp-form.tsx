"use client";

import React, { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { SignUp } from "@/actions/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { SignUpSchema as formSchema } from "@/schema/auth-schema";

import { Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@nextui-org/react";
import { Spinner } from "@/components/ui/spinner";

export const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      SignUp(values).then((data) => {
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
        {isPending ? <Spinner size={"lg"} /> : 'SignUp' }
      </Button>
    </form>
  );
};

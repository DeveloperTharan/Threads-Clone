"use client";

import React, { useState, useTransition } from "react";

import * as z from "zod";
import { FormError } from "../form-error";
import { useForm } from "react-hook-form";
import { FormSuccess } from "../form-success";
import { Button, Input, Link } from "@nextui-org/react";
import { newPassword } from "@/actions/new-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordShema as formSchema } from "../schema";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .finally(() => {
          router.push("/auth/sign-in");
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
        name="new password"
        label="new password"
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
        Update
      </Button>
      <Link href="/auth/sign-in" className="text-sm mx-auto">
        Back to login
      </Link>
    </form>
  );
};

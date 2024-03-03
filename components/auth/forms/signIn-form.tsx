"use client";

import React, { useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchemma as formSchemma } from "../form-schema";

import { Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@nextui-org/react";

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchemma>>({
    resolver: zodResolver(formSchemma),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchemma>) => {
    try {
      console.log(values);
    } catch (error) {
      console.log("SIGN_IN_ERROR", error);
    }
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
        disabled={isSubmitting}
        errorMessage={errors.user_name?.message}
        onChange={(e) => form.setValue("user_name", e.target.value)}
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
        disabled={isSubmitting}
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
      <Button
        className="w-full"
        color="secondary"
        variant="solid"
        type="submit"
      >
        SignIn
      </Button>
    </form>
  );
};

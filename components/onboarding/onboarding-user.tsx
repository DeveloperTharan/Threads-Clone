"use client";

import React, { useTransition } from "react";

import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Gender, User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { onBoardingProfile } from "@/actions/onboarding";
import { onboardingProfileschema as formSchema } from "@/schema/onboarding-schema";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Input,
  Textarea,
  Avatar,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";

interface OnboardingUserFormProps {
  initialdata:
    | ({
        gender: Gender | null;
      } & User)
    | null;
  gender: Gender[];
}

export const OnboardingUserForm = ({
  initialdata,
  gender,
}: OnboardingUserFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: initialdata?.user_name,
      official_name: initialdata?.official_name || "",
      image: initialdata?.image || "",
      genderId: initialdata?.genderId || "",
      status: initialdata?.status || "",
      bio: initialdata?.bio || "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    startTransition(() => {
      onBoardingProfile(values).then((data) => {
        if (data.success) toast.success(data.success || "Profile updated!");
        if (data.error) toast.error(data.error || "Profile update error!");
      });
    });
  };

  return (
    <Card className="w-full max-w-[90%] md:max-w-[75%] h-fit bg-neutral-800/20">
      <CardBody className="w-full">
        <CardHeader className="text-2xl font-bold">Profile</CardHeader>
        <form
          className="w-full flex flex-col space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-row items-start">
            <Image
              src="/logo.svg"
              alt="user"
              width={300}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col items-center space-y-8">
              <div className="flex flex-row items-center gap-x-4">
                <Input
                  size="sm"
                  label="username"
                  variant="underlined"
                  placeholder="user_name"
                  defaultValue={initialdata?.user_name.slice(1).toString()}
                  errorMessage={errors.user_name?.message}
                  onChange={(e) =>
                    form.setValue("user_name", `@${e.target.value}`)
                  }
                  startContent={
                    <span className="text-default-400 text-small">@</span>
                  }
                />
                <Input
                  size="sm"
                  label="Name"
                  placeholder="name"
                  variant="underlined"
                  defaultValue={initialdata?.official_name || ""}
                  errorMessage={errors.official_name?.message}
                  onChange={(e) =>
                    form.setValue("official_name", e.target.value)
                  }
                />
              </div>
              <div className="w-full flex flex-row items-center gap-x-4">
                <div className="w-1/2 flex items-center justify-start gap-x-2 md:gap-x-2">
                  <span>Status:</span>
                  {initialdata?.status ? (
                    <Avatar src={initialdata?.status} alt="status" size="sm" />
                  ) : (
                    <Avatar src={""} alt="status" size="sm" />
                  )}
                </div>
                <Select
                  label="call as"
                  variant="underlined"
                  placeholder="Call as"
                  className="max-w-[50%]"
                  value={initialdata?.gender?.type || ""}
                  errorMessage={errors.genderId?.message}
                  onChange={(e) => form.setValue("genderId", e.target.value)}
                >
                  {gender.map((gender) => (
                    <SelectItem key={gender.id}>{gender.type}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <Textarea
            label="bio"
            variant="underlined"
            className="w-[90%] mx-auto"
            placeholder="eg:'hi i am...'"
            defaultValue={initialdata?.bio || ""}
            errorMessage={errors.bio?.message}
            onChange={(e) => form.setValue("bio", e.target.value)}
          />
          <CardFooter className="w-full flex flex-row justify-end">
            <Button
              variant="solid"
              color="secondary"
              type="submit"
              disabled={isPending}
            >
              continue
            </Button>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
};

"use client";

import React, { useState, useTransition } from "react";

import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Gender, User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDataUpdate } from "@/actions/user-update";
import { userUpdateSchema as formSchema } from "@/schema/user-update-schema";

import {
  Button,
  Input,
  Textarea,
  Avatar,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { VscEdit } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import IconPicker from "../utils/icon-picker";
import { FileUploder } from "../models/file-uploder";
import { usePathname, useRouter } from "next/navigation";

interface UserDataUpdateFormProps {
  initialdata:
    | ({
        gender: Gender | null;
      } & User)
    | null;
  gender: Gender[];
}

export const UserDataUpdateForm = ({
  initialdata,
  gender,
}: UserDataUpdateFormProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updatedImage, setUpdatedImage] = useState<string | null>(null);

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

  const router = useRouter();
  const pathname = usePathname();
  const { update } = useSession();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      userDataUpdate(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success || "Profile updated!");
            update();
            if (pathname === "/onboarding/profile") {
              router.push("/onboarding/account/type");
            }
          }
          if (data.error) toast.error(data.error || "Profile update error!");
        })
        .finally(() => router.refresh());
    });
  };

  return (
    <form
      className="w-full flex flex-col space-y-8 pb-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-row items-start gap-x-8">
        <div className="relative w-fit h-fit my-5 group">
          {initialdata?.image ? (
            <Image
              src={updatedImage !== null ? updatedImage : initialdata.image}
              alt="user"
              width={200}
              height={200}
              className="rounded-full object-cover"
            />
          ) : (
            <Image
              src="/logo.svg"
              alt="user"
              width={200}
              className="rounded-full object-cover"
            />
          )}
          <FileUploder
            isOpen={isOpen}
            setIsOpen={() => setIsOpen(!isOpen)}
            filetype=".jpeg, .png, .jpg"
            onSubmit={(url: string) => {
              form.setValue("image", url);
              setUpdatedImage(url);
              router.refresh();
            }}
          >
            <div
              className="absolute bottom-5 right-0 rounded-full opacity-0 group-hover:opacity-100 
                bg-neutral-700/80 text-neutral-400 hover:bg-neutral-700/50 p-1 z-10"
              role="button"
            >
              <VscEdit size={20} />
            </div>
          </FileUploder>
        </div>
        <div className="w-full flex flex-col items-center space-y-8">
          <div className="w-full flex flex-row items-center gap-x-4">
            <Input
              size="sm"
              label="username"
              variant="underlined"
              placeholder="user_name"
              defaultValue={initialdata?.user_name.slice(1).toString()}
              errorMessage={errors.user_name?.message}
              onChange={(e) => form.setValue("user_name", `@${e.target.value}`)}
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
              onChange={(e) => form.setValue("official_name", e.target.value)}
            />
          </div>
          <div className="w-full flex flex-row items-center gap-x-4">
            <div className="w-1/2 flex items-center justify-start gap-x-2 md:gap-x-2">
              <span className="text-sm text-neutral-500">Status:</span>
              {initialdata?.status ? (
                <IconPicker
                  onChange={(data: string) => form.setValue("status", data)}
                >
                  <span>{initialdata.status}</span>
                </IconPicker>
              ) : (
                <IconPicker
                  onChange={(data: string) => form.setValue("status", data)}
                >
                  <Avatar src={""} alt="status" size="sm" />
                </IconPicker>
              )}
            </div>
            <Select
              label="call as"
              variant="underlined"
              placeholder={initialdata?.gender?.type || "Call as"}
              className="max-w-[50%]"
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
      <Button
        variant="solid"
        color="secondary"
        type="submit"
        disabled={isPending}
        className="w-[90%] mx-auto"
      >
        continue
      </Button>
    </form>
  );
};

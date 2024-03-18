"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createThreadsSchema as formSchema } from "@/schema/threads-schema";

import { Spinner } from "../ui/spinner";
import { FileUploder } from "./file-uploder";
import { IoIosImages } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import {
  Image,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";
import { createThread } from "@/actions/thread";
import toast from "react-hot-toast";

interface CreateThreadModelProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateThreadModel = ({
  children,
  isOpen,
  setIsOpen,
}: CreateThreadModelProps) => {
  const [Open, setOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [value, setValue] = useState<z.infer<typeof formSchema>>({
    body: "",
    assert: "",
  });

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      assert: "",
    },
  });

  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (
      value.body?.replaceAll(" ", "").length === 0 &&
      value.assert?.length === 0
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [value]);

  if (user === undefined) return redirect("/auth/sign-in");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      createThread(values)
        .then((data) => {
          if (data.success) toast.success(data.success!);
          if (data.error) toast.error(data.error!);
        })
        .finally(() => {
          setIsOpen(!isOpen);
          setValue({ body: "", assert: "" });
          router.refresh();
        });
    });
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="lg"
        backdrop="blur"
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create Your Threads!
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex flex-col items-start justify-start">
              <div className="flex flex-row w-full justify-start items-center gap-x-4">
                <Image
                  src={user?.image!}
                  alt={user?.name!}
                  title={user?.name!}
                  width={50}
                  height={50}
                  className="rounded-full cursor-pointer"
                  onClick={() => router.push(`/${user.name}`)}
                />
                <span className="font-semibold text-neutral-300">
                  {user?.name}
                </span>
              </div>
              <form
                className="w-full flex flex-col items-start justify-start space-y-2 pb-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="bg-transparent border-none focus-visible:outline-none w-full p-2 
                  text-sm text-neutral-400 pl-14"
                  placeholder="Start yout thread..."
                  onChange={(e) => {
                    form.setValue("body", e.target.value);
                    setValue((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }));
                  }}
                />
                <FileUploder
                  filetype=".jpeg, .png, .jpg, .gif, .svg"
                  onSubmit={(url: string) => {
                    form.setValue("assert", url);
                    setValue((prev) => ({
                      ...prev,
                      assert: url,
                    }));
                  }}
                  isOpen={Open}
                  setIsOpen={setOpen}
                >
                  <IoIosImages size={20} className="ml-14 text-neutral-400" />
                </FileUploder>
                {value.assert?.length! > 0 && (
                  <div className="relative h-auto w-full">
                    <IoCloseOutline
                      size={30}
                      className="absolute top-5 right-1 p-1 text-white bg-neutral-600 
                    hover:bg-neutral-600/70 rounded-full cursor-pointer z-50"
                      onClick={() =>
                        setValue((prev) => ({
                          ...prev,
                          assert: "",
                        }))
                      }
                    />
                    <Image
                      src={value.assert}
                      alt={"post"}
                      width={500}
                      height={500}
                      className="object-cover my-4 rounded-lg"
                    />
                  </div>
                )}
                <Button
                  variant="solid"
                  color={!isValid ? "default" : "secondary"}
                  disabled={isPending || !isValid}
                  type="submit"
                  size="sm"
                  className="ml-auto"
                >
                  {isPending ? <Spinner size={"lg"} /> : "Post"}
                </Button>
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

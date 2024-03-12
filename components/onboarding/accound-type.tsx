"use client";

import { onBoardingAccountType } from "@/actions/onboarding";
import { Button, Link, cn } from "@nextui-org/react";
import { AccountType } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";

export const AccoundTypeForm = ({
  accountType,
}: {
  accountType: AccountType | undefined;
}) => {
  const [type, setType] = useState<AccountType | undefined>(accountType);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { update } = useSession();

  const onSubmit = () => {
    startTransition(() => {
      onBoardingAccountType(type!).then((data) => {
        if (data.success) {
          toast.success(data.success || "Profile updated!");
          update();
          router.push("/");
        }
        if (data.error) toast.error(data.error || "Profile update error!");
      });
    });
  };

  return (
    <>
      <Link
        href={`/onboarding/profile`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6 ml-10 pt-5 text-neutral-100"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Link>
      <div className="w-[70%] h-[calc(100%-10rem)] flex flex-col items-center justify-center space-y-10 mx-auto">
        <div className="w-full flex flex-col text-center items-center justify-center space-y-2">
          <h1 className="text-4xl font-bold">Privacy</h1>
          <p className="text-sm font-normal text-neutral-400">
            Your Privacy on Threads and Instagram can be different
          </p>
        </div>
        <div className="w-[70%] flex flex-col items-center justify-center space-y-5">
          <div
            className={cn(
              "w-full border-2 rounded-lg p-6 hover:bg-purple-500/20 hover:border-none",
              type === "Public" ? "border-neutral-100" : "border-neutral-600"
            )}
            role="button"
            onClick={() => setType("Public")}
          >
            <div className="w-full flex flex-col text-start items-start justify-start space-y-2">
              <h1
                className={cn(
                  "text-2xl font-bold",
                  type === "Public" ? "text-neutral-100" : "text-neutral-400"
                )}
              >
                Public Profile
              </h1>
              <p className="text-sm font-normal text-neutral-400">
                Anyone on or off Threads can see, share and interact with your
                content.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "w-full border-2 rounded-lg p-6 hover:bg-purple-500/20 hover:border-none",
              type === "Private" ? "border-neutral-100" : "border-neutral-600"
            )}
            role="button"
            onClick={() => setType("Private")}
          >
            <div className="w-full flex flex-col text-start items-start justify-start space-y-2">
              <h1
                className={cn(
                  "text-2xl font-bold",
                  type === "Private" ? "text-neutral-100" : "text-neutral-400"
                )}
              >
                Private Profile
              </h1>
              <p className="text-sm font-normal text-neutral-400">
                Only your approved followers can see, share and interact with
                your content.
              </p>
            </div>
          </div>
          <Button
            variant="solid"
            color="secondary"
            className="w-full"
            disabled={isPending}
            onClick={onSubmit}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
};

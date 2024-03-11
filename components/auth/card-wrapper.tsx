"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Card, CardHeader, CardBody, CardFooter, cn } from "@nextui-org/react";
import Image from "next/image";

interface CardWrapperProps {
  children: React.ReactNode;
  Or?: string;
  OrRedirect?: string;
  forgetRediret?: string;
}

export const CardWrapper = ({
  children,
  Or,
  OrRedirect,
  forgetRediret,
}: CardWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isForgetPass = pathname.endsWith("forget-password");
  const isNewVerification = pathname.includes("new-verification");
  const isNewPassword = pathname.includes("new-password");

  return (
    <Card className="w-[25rem] p-4">
      <CardHeader className="flex items-center justify-center">
        <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter
        className={cn(
          "flex flex-col space-y-4 w-full",
          isNewVerification || isNewPassword || (isForgetPass && "hidden")
        )}
      >
        <div
          className={cn(
            Or == "SignIn"
              ? "flex items-center justify-end w-full"
              : "flex items-center justify-between w-full"
          )}
        >
          {Or == "SignUp" && (
            <p
              className="text-xs font-normal cursor-pointer hover:underline"
              role="button"
              onClick={() => router.push(`/auth/${forgetRediret}`)}
            >
              forget password?
            </p>
          )}
          <div className="text-xs font-normal flex items-center gap-1">
            {Or == "SignUp" && (
              <p
                className="hover:underline font-medium"
                role="button"
                onClick={() => router.push(`/auth/${OrRedirect}`)}
              >
                Don&apos;t have a accound?
              </p>
            )}
            {Or == "SignIn" && (
              <p
                className="hover:underline font-medium"
                role="button"
                onClick={() => router.push(`/auth/${OrRedirect}`)}
              >
                Have a accound?
              </p>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

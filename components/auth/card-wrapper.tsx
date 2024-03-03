"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  cn,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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

  return (
    <Card className="w-[25rem] p-4">
      <CardHeader className="flex items-center justify-center">
        <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter className="flex flex-col space-y-4 w-full">
        <div
          className={cn(
            Or == "SignIn"
              ? "flex items-center justify-end w-full"
              : "flex items-center justify-between w-full"
          )}
        >
          {Or == "SignUp" && !isForgetPass && (
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
                Don't have a accound?
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

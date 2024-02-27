"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ImageUiProps {
  userImage: string;
  userName: string;
  userId: string;
}

export const ImageUi = ({ userImage, userName, userId }: ImageUiProps) => {
    const router = useRouter();

  return (
    <Image
      src={userImage}
      alt={userName}
      title={userName}
      width={45}
      height={45}
      className="rounded-full cursor-pointer"
      onClick={() => router.push(`/profile/${userId}`)}
    />
  );
};

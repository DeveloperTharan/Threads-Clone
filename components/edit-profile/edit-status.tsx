"use client";

import React, { useState } from "react";

import { CiFaceSmile } from "react-icons/ci";
import { IconPicker } from "../Icon-picker";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditStatusProps {
  initialData: string | null;
  userId: string;
}

export const EditStatus = ({ initialData, userId }: EditStatusProps) => {
  const router = useRouter();

  const handleOnIconSelect = async (icon: string) => {
    try {
      await axios.patch(
        `/api/profile/${userId}`,
        JSON.stringify({ emoje: icon })
      );
      toast.success("Profile Updated", {
        description: "Profile Image updated successfully",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      window.location.reload();
    } catch (error) {
      console.log("[PROFILE_ERROR]", error);
      toast.error("Something went wrong", {
        description: "Profile Image updated Error",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <div className="w-fit h-auto cursor-pointer">
      {!!initialData && (
        <IconPicker onChange={handleOnIconSelect}>
          <div className="h-5 w-5">{initialData}</div>
        </IconPicker>
      )}
      {!initialData && (
        <IconPicker onChange={handleOnIconSelect}>
          <div className="flex items-center p-2 border rounded-md w-fit">
            <CiFaceSmile className="h-4 w-4 mr-2 text-gray-500" />
            Add status
          </div>
        </IconPicker>
      )}
    </div>
  );
};

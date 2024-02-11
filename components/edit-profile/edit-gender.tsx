"use client";

import React from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GenderProps {
  initialData: string | undefined;
  data: { id: string; type: string }[];
  id: string;
}

export const EditGender = ({ initialData, data, id }: GenderProps) => {
  const router = useRouter();

  const handleGenderChange = async (value: string) => {
    try {
      await axios.patch(
        `/api/profile/${id}`,
        JSON.stringify({ genderId: value })
      );
      toast.success("Profile Updated", {
        description: "Profile updated successfully",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.refresh();
    } catch (error) {
      console.log("[PROFILE_ERROR]", error);
      toast.error("Something went wrong", {
        description: "Profile updated Error",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };
  return (
    <>
      <Select onValueChange={handleGenderChange}>
        <SelectTrigger className="w-fit">
          {!initialData && <SelectValue placeholder="Call as" />}
          {initialData && <SelectValue placeholder={initialData} />}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((data) => (
              <SelectItem value={data.id} key={data.id}>{data.type}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

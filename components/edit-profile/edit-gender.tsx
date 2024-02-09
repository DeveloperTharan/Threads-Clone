"use client";

import React from "react";

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
  userId: string;
}

export const EditGender = ({ initialData, data, userId }: GenderProps) => {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          {!initialData && <SelectValue placeholder="Call as" />}
          {initialData && <div className="text-gray-400">{initialData}</div>}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((data) => (
              <SelectItem value={data.id}>{data.type}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

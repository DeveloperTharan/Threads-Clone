"use client";

import React from "react";
import { Preview } from "../preview";
import { UpdateBio } from "../model/bio-update";

interface EditBioProps {
  initialData: string | null;
  userId: string;
}

export const EditBio = ({ initialData, userId }: EditBioProps) => {
  return (
    <div className="w-full h-auto">
      <UpdateBio userId={userId} initialData={initialData} >
        <h1 className="text-neutral-400 font-semibold text-start">Your Bio</h1>
        <Preview value={initialData || "Not set yet."} className="border rounded-lg" />
      </UpdateBio>
    </div>
  );
};

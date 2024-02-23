"use client";

import React from "react";
import { Preview } from "../utils/preview";
import { UpdateBio } from "../model/bio-update";

interface EditBioProps {
  initialData: string | null;
  id: string;
}

export const EditBio = ({ initialData, id }: EditBioProps) => {
  return (
    <div className="w-full h-auto">
      <UpdateBio id={id} initialData={initialData} >
        <h1 className="text-neutral-400 font-semibold text-start">Your Bio</h1>
        <Preview value={initialData || "Not set yet."} className="border rounded-lg" />
      </UpdateBio>
    </div>
  );
};

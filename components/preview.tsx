"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
  className?: string;
};

export const Preview = ({
  value,
  className,
}: PreviewProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
      className={cn("-ml-4", className)}
    />
  );
};
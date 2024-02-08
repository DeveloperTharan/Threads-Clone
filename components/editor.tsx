"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
};

export const Editor = ({
  onChange,
  value,
}: EditorProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <div className="bg-white text-black">
      <ReactQuill
        theme="bubble"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
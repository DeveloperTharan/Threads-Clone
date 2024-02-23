"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

interface EditorProps {
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  theme?: string;
}

export const Editor = ({
  onChange,
  value,
  placeholder,
  theme,
}: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="w-full">
      <ReactQuill
        theme={theme}
        value={value}
        onChange={onChange}
        className="w-full"
        placeholder={placeholder}
      />
    </div>
  );
};

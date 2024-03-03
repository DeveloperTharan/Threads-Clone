import React from "react";
import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    <>
      {message !== undefined  && (
          <div
            className="w-full flex items-center justify-start gap-x-2 bg-emerald-500/15 
          text-emerald-500 p-2 rounded-md text-xs"
          >
            <CheckCircle size={20} />
            <p>{message}</p>
          </div>
        )}
    </>
  );
};

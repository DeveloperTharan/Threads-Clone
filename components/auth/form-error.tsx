import React from "react";
import { AlertTriangle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    <>
      {message !== undefined  && (
          <div
            className="w-full flex items-center justify-start gap-x-2 bg-red-500/15 
          text-red-500 p-2 rounded-md text-xs"
          >
            <AlertTriangle size={20} />
            <p>{message}</p>
          </div>
        )}
    </>
  );
};

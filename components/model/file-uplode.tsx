"use client";

import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SlCloudUpload } from "react-icons/sl";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEdgeStore } from "@/lib/edgestore";

interface FileUplodeProps {
  children: React.ReactNode;
  onSubmit: (values: string) => void;
  filetype: string;
}

export const FileUplode = ({
  children,
  onSubmit,
  filetype,
}: FileUplodeProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const { edgestore } = useEdgeStore();

  const openFileExplorer = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (file) {
      setIsLoading(true);
      const res = await edgestore.publicFiles.upload({ file });
      onSubmit(res.url);
      setIsLoading(false);
      setFile(null);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFile(e.target.files![0] as File);
    setIsLoading(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsLoading(true);
      setFile(e.dataTransfer.files[0] as unknown as File);
      setIsLoading(false);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="my-5">
            <form action="" className="w-full h-auto">
              <div
                className={cn(
                  "w-full h-auto min-h-36 p-4 border border-dashed flex flex-col gap-2 items-center justify-center rounded-md cursor-pointer",
                  dragActive ? "bg-neutral-700/80" : "bg-transparent"
                )}
                onClick={openFileExplorer}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
              >
                {!isLoading && (
                  <>
                    <input
                      type="file"
                      accept={filetype}
                      className="hidden"
                      ref={fileRef}
                      onChange={handleChange}
                    />
                    <SlCloudUpload size={40} className="text-neutral-400" />
                    <div className="text-neutral-400 ml-2">
                      CLick to Uplode Or Drag & Drop to Uplode
                    </div>
                    {file == null ? (
                      "No file selected"
                    ) : (
                      <span className="text-neutral-400">{file.name}</span>
                    )}
                  </>
                )}
                {isLoading && <p>Loadding...</p>}
              </div>
              <div className="flex flex-row justify-between items-center w-full gap-x-2 mt-4">
                <Button
                  variant={"outline"}
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={"default"}
                  className="w-full"
                  disabled={file == null}
                  onClick={handleSubmit}
                >
                  {isLoading ? "..." : "Upload"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

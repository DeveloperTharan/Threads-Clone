"use client";

import React, { useRef, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  cn,
} from "@nextui-org/react";

import { SlCloudUpload } from "react-icons/sl";
import { useEdgeStore } from "@/provider/edgestore";

interface FileUplodeProps {
  children: React.ReactNode;
  onSubmit: (values: string) => void;
  filetype: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileUploder = ({
  children,
  isOpen,
  setIsOpen,
  filetype,
  onSubmit,
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
      setIsOpen(false);
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

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="text-xl text-neutral-400 font-semibold">
            Uplode your File...
          </ModalHeader>
          <ModalBody>
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
                  <div className="text-neutral-400 ml-2 text-sm">
                    CLick to Uplode Or Drag & Drop to Uplode
                  </div>
                  {file == null ? (
                    "No file selected"
                  ) : (
                    <span className="text-neutral-400 text-xs">
                      {file.name}
                    </span>
                  )}
                </>
              )}
              {isLoading && <Spinner size={"lg"} />}
            </div>
          </ModalBody>
          <ModalFooter className="w-full flex flex-row justify-between items-center gap-x-2 mt-4">
            <Button
              variant={"ghost"}
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
                setIsOpen(!isOpen);
              }}
            >
              Cancel
            </Button>
            <Button
              variant={"solid"}
              color="secondary"
              className="w-full"
              disabled={file == null}
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : "Upload"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

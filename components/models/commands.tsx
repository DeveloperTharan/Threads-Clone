"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Input,
} from "@nextui-org/react";
import { CommandNode } from "@/utils/structure-data";

import { Spinner } from "../ui/spinner";
import { commandThread } from "@/actions/thread";
import { CommandsList } from "../threads/command-list";

import { BsSend } from "react-icons/bs";
import { PiChatsCircleDuotone } from "react-icons/pi";
import { X } from "lucide-react";

interface CommandsModelProps {
  isOpen: boolean;
  thread_id: string;
  children: React.ReactNode;
  structuredCommands: CommandNode[];
  un_structuredCommands: CommandNode[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommandsModel({
  children,
  isOpen,
  setIsOpen,
  thread_id,
  structuredCommands,
  un_structuredCommands,
}: CommandsModelProps) {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [replayTo, setReplayTo] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (parentId !== undefined) {
      const replayToUser = un_structuredCommands.find(
        (data) => data.id === parentId
      );
      setReplayTo(replayToUser?.user?.user_name);
    }
  }, [parentId, un_structuredCommands]);

  const router = useRouter();

  const isDisabled =
    value == undefined || value.replaceAll(" ", "").length === 0 || isPending;

  const handleParentId = (id: string) => {
    setParentId(id);
  };

  const onSubmit = () => {
    startTransition(() => {
      commandThread(thread_id, value!, parentId)
        .then((data) => {
          if (data.success) return data.success;
          if (data.error) return data.error;
        })
        .finally(() => router.refresh());
    });
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
        size="4xl"
        backdrop="blur"
        placement="center"
      >
        <ModalContent className="h-[75%] w-full overflow-auto">
          <ModalHeader>Commands!</ModalHeader>
          <ModalBody>
            {structuredCommands.length == 0 && (
              <div className="h-full flex flex-col space-y-2 items-center justify-center">
                <PiChatsCircleDuotone size={100} className="text-neutral-600" />
                <p className="text-sm text-neutral-600">No commands...</p>
              </div>
            )}
            {structuredCommands == undefined && (
              <div className="h-full flex items-center justify-center">
                <Spinner size={"lg"} />
              </div>
            )}
            <CommandsList
              commands={structuredCommands}
              getParentId={handleParentId}
            />
          </ModalBody>
          <ModalFooter className="w-full flex flex-row items-center justify-center gap-x-4">
            <Input
              variant="bordered"
              color="secondary"
              className="w-full"
              size="sm"
              labelPlacement="outside"
              onChange={(e) => setValue(e.target.value)}
              label={
                replayTo !== undefined && (
                  <div className="w-full flex items-center justify-between">
                    <p>Replay to {replayTo}</p>
                    <X
                      size={12}
                      className="p-1 hover:bg-neutral-700/30 text-neutral-500 rounded-full outline-0 
                      transform active:scale-75 transition-transform"
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();

                        setParentId(undefined);
                        setReplayTo(undefined);
                      }}
                    />
                  </div>
                )
              }
            />
            <Button
              variant="solid"
              color={isDisabled ? "default" : "secondary"}
              size="sm"
              isDisabled={isDisabled}
              onClick={onSubmit}
            >
              {isPending ? <Spinner size={"lg"} /> : <BsSend size={20} />}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

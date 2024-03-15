"use client";

import React, { useState, useTransition } from "react";

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

import { BsSend } from "react-icons/bs";
import { PiChatsCircleDuotone } from "react-icons/pi";
import { Spinner } from "../ui/spinner";
import { commandThread } from "@/actions/thread";
import { useRouter } from "next/navigation";
import { CommandsList } from "../threads/command-list";

interface CommandsModelProps {
  isOpen: boolean;
  thread_id: string;
  commands: CommandNode[];
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommandsModel({
  children,
  isOpen,
  setIsOpen,
  commands,
  thread_id,
}: CommandsModelProps) {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [replayTo, setReplayTo] = useState<string | undefined>(undefined)

  const [isPending, startTransition] = useTransition();

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
        <ModalContent className="h-auto max-h-[70%] w-full overflow-auto">
          <ModalHeader>Commands!</ModalHeader>
          <ModalBody>
            {commands.length == 0 && (
              <div className="h-full flex flex-col space-y-2 items-center justify-center">
                <PiChatsCircleDuotone size={100} className="text-neutral-600" />
                <p className="text-sm text-neutral-600">No commands...</p>
              </div>
            )}
            {commands == undefined && (
              <div className="h-full flex items-center justify-center">
                <Spinner size={"lg"} />
              </div>
            )}
            <CommandsList
              commands={commands}
              getParentId={handleParentId}
              threadId={thread_id}
            />
          </ModalBody>
          <ModalFooter className="w-full flex flex-row items-center justify-center gap-x-4">
            <Input
              variant="bordered"
              color="secondary"
              className="w-full"
              size="sm"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              variant="solid"
              color={isDisabled ? "default" : "secondary"}
              size="lg"
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

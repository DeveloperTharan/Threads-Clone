"use client";

import React from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { Follows, Gender, User } from "@prisma/client";
import { UserDataUpdateForm } from "../user/user-data-update";

interface EditProfileProps {
  children: React.ReactNode;
  initialData:
    | ({
        gender: Gender | null;
        followers: Follows[];
        following: Follows[];
      } & User)
    | null;
  gender: Gender[] | null;
}

export const EditProfile = ({
  children,
  initialData,
  gender,
}: EditProfileProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="ghost" className="w-full">
        {children}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Profile!
          </ModalHeader>
          <ModalBody>
            <UserDataUpdateForm initialdata={initialData} gender={gender!} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

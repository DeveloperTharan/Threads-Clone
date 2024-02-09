"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";

import EmojiPicker from "emoji-picker-react";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
}

export const IconPicker = ({ onChange, children }: IconPickerProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <EmojiPicker
          height={350}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

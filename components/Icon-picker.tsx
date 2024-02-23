"use client";

import React, { memo } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";

import EmojiPicker from "emoji-picker-react";
import { Theme, EmojiStyle, SuggestionMode } from "emoji-picker-react";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
}

const Iconpicker = ({ onChange, children }: IconPickerProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <EmojiPicker
          height={300}
          width={400}
          theme={Theme.DARK}
          emojiStyle={EmojiStyle.FACEBOOK}
          suggestedEmojisMode={SuggestionMode.FREQUENT}
          searchDisabled
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const IconPicker = memo(Iconpicker);

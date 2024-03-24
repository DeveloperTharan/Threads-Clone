"use client";

import React, { memo } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import EmojiPicker from "emoji-picker-react";
import { Theme, EmojiStyle, SuggestionMode } from "emoji-picker-react";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
}

const IconPicker = ({ onChange, children }: IconPickerProps) => {
  return (
    <Dropdown>
      <DropdownTrigger role="button">{children}</DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>
          <EmojiPicker
            height={300}
            width={400}
            theme={Theme.DARK}
            emojiStyle={EmojiStyle.FACEBOOK}
            suggestedEmojisMode={SuggestionMode.FREQUENT}
            searchDisabled
            onEmojiClick={(data) => onChange(data.emoji)}
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default memo(IconPicker);

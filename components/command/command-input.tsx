"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formShema = z.object({
  command: z.string().min(2, {
    message: "atleast 2 charaters required",
  }),
});

export const CommandInput = ({
  threadId,
  parentId,
  setParentId
}: {
  threadId: string;
  parentId: string | undefined;
  setParentId: () => void
}) => {
  const router = useRouter();
  const { User } = useUser();

  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      command: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (value: z.infer<typeof formShema>) => {
    try {
      await axios.post(`/api/thread/command/${threadId}`, {
        body: value.command,
        parentId,
        userid: User?.id,
      });
      toast.success("Command posted sucessfully", {
        description: "Command posted sucessfully",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      setParentId()
      router.refresh();
    } catch (error) {
      console.log("[COMMAND_ERROR]", error);
      toast.error("Something went wrong", {
        description: "Command Post Error",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-x-5 w-full fixed bottom-0 left-0 mx-auto py-3 px-6 md:px-20 
        bg-neutral-950/20 backdrop-blur-sm"
      >
        <FormField
          control={form.control}
          name="command"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <Input
                  placeholder="@message"
                  className="w-full border rounded focus:right-1 focus-within:right-1 bg-neutral-950"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Send
        </Button>
      </form>
    </Form>
  );
};

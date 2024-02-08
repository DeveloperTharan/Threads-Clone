"use client";

import React from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Editor } from "../editor";
import { Button } from "../ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";

interface UpdateBioProps {
  children: React.ReactNode;
  initialData: string | null;
  userId: string;
}

const formSchema = z.object({
  bio: z.string().min(6, {
    message: "Bio is required",
  }),
});

export const UpdateBio = ({
  children,
  initialData,
  userId,
}: UpdateBioProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: initialData || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile/${userId}`, values);
      toast.success("Bio Updated", {
        description: "Bio updated successfully",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.refresh();
    } catch (error) {
      console.log("[PROFILE_ERROR]", error);
      toast.error("Something went wrong", {
        description: "Bio updated Error",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Bio!</DialogTitle>
          <DialogDescription>
            <div className="w-full h-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Editor {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

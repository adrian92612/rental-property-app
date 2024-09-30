"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserPersonalInfoProps } from "./user-personal-info";
import { Button } from "../ui/button";
import { Content } from "../ui/card";
import { User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { updateUserInfo } from "@/lib/actions/actions";
import { useForm } from "react-hook-form";
import { EditUserSchema } from "@/lib/zod-schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

type EditDetailsFormProps = {
  user: User;
  toggleEdit: () => void;
};

const EditDetailsForm = ({ user, toggleEdit }: EditDetailsFormProps) => {
  const [state, action, isPending] = useActionState(updateUserInfo, {
    success: false,
    message: "",
  });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.output<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    mode: "onBlur",
    defaultValues: {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber || "",
      ...(state?.fields ?? {}),
    },
  });

  const handleStateChange = useCallback(() => {
    if (state.success) toggleEdit();
    if (state.message) {
      toast({
        title: state.message,
      });
    }
  }, [state, toast, toggleEdit]);

  useEffect(() => {
    handleStateChange();
  }, [handleStateChange]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={action}
        onSubmit={(e) => {
          e.preventDefault();
          return form.handleSubmit(() => {
            action(new FormData(formRef.current!));
          })(e);
        }}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-base text-nowrap">
                  First Name:
                </FormLabel>
                <FormControl>
                  <Input {...field} className="max-w-56" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-base text-nowrap">
                  Last Name:
                </FormLabel>
                <FormControl>
                  <Input {...field} className="max-w-56" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-base text-nowrap">
                  Phone Number:
                </FormLabel>
                <FormControl>
                  <Input {...field} className="max-w-56" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={toggleEdit}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const PersonalDetails = ({ user }: UserPersonalInfoProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  const toggleEdit = () => setEdit(!edit);
  return (
    <>
      <div>
        {edit ? (
          <EditDetailsForm user={user} toggleEdit={toggleEdit} />
        ) : (
          <div>
            <Content label="First Name:" value={user.firstName} />
            <Content label="Last Name:" value={user.lastName} />
            <Content label="Phone Number:" value={user.phoneNumber || "N/A"} />
          </div>
        )}
      </div>
      <div className="flex justify-end items-center">
        {!edit && (
          <Button size="sm" onClick={toggleEdit}>
            Edit
          </Button>
        )}
      </div>
    </>
  );
};

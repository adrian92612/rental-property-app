"use client";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { UserPersonalInfoProps } from "./user-personal-info";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdatePasswordSchema } from "@/lib/zod-schemas/update-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { updatePassword } from "@/lib/actions/actions";
import { User } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

type PasswordFormProps = {
  user: User;
  toggleForm: () => void;
};

const PasswordForm = ({ user, toggleForm }: PasswordFormProps) => {
  const [state, action, isPending] = useActionState(updatePassword, {
    success: false,
    message: "",
  });
  const { toast } = useToast();
  const form = useForm<z.output<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    mode: "onBlur",
    defaultValues: {
      userId: user.id,
      hashedPassword: user.password!,
      currentPassword: "",
      password: "",
      confirmPassword: "",
      ...(state.fields ?? {}),
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const handleToast = useCallback(() => {
    if (state.success) toggleForm();
    if (state.message) {
      toast({
        title: state.message,
      });
    }
  }, [state, toast, toggleForm]);

  useEffect(() => {
    handleToast();
  }, [handleToast]);

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
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hashedPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Current Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="******"
                  type="password"
                  className="max-w-56"
                />
              </FormControl>
              <FormMessage>
                {state.fields?.message.toString() ||
                  form.formState.errors.currentPassword?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="******"
                  type="password"
                  className="max-w-56"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="******"
                  type="password"
                  className="max-w-56"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 mt-5">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={toggleForm}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const UserPassword = ({ user }: UserPersonalInfoProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        {!showForm ? (
          <Button size="sm" onClick={toggleForm}>
            Change Password
          </Button>
        ) : (
          <PasswordForm user={user} toggleForm={toggleForm} />
        )}
      </CardContent>
    </Card>
  );
};

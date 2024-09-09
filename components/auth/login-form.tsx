"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";

import { LoginSchema } from "@/lib/zod-schemas/login";
import { login } from "@/lib/actions/actions";

export const LoginForm = () => {
  const [state, action, isPending] = useActionState(login, { message: "" });
  const form = useForm<z.output<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  console.log(state);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={action}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="john.doe@email.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="******" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="sm"
          className="w-full font-bold"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

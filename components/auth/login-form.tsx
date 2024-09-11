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
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();

  if (state.success) {
    router.push("/dashboard");
    return (
      <div className="w-full text-center">
        <h2 className="text-emerald-700 text-lg font-bold">{state.message}</h2>
        <p className="text-sm text-gray-400">
          Redirecting to{" "}
          <Link href="/dashboard" className="underline">
            dashboard...
          </Link>{" "}
        </p>
      </div>
    );
  }

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
        {state.message && (
          <span className="text-red-500">*{state.message}</span>
        )}
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
          className="w-full font-bold text-lg mt-2"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

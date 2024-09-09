"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export const LoginForm = () => {
  const form = useForm<z.output<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(() => console.log("submitted valid"))}
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
        <Button size="sm" className="w-full font-bold">
          Login
        </Button>
      </form>
    </Form>
  );
};

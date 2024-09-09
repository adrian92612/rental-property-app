import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email({
    message: "Email address is invalid",
  }),
  password: z.string().trim().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

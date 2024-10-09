import { z } from "zod";

export const RegistrationSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .min(1, "Email is required")
      .email(),
    firstName: z
      .string({ required_error: "First name is required" })
      .trim()
      .min(1, "First name is required")
      .max(50, "Cannot be more than 50 characters"),
    lastName: z
      .string({ required_error: "Last name is required" })
      .trim()
      .min(1, "Last name is required")
      .max(50, "Cannot be more than 50 characters"),
    password: z
      .string()
      .trim()
      .refine(
        (value) => {
          const hasLowercase = /[a-z]/.test(value);
          const hasUppercase = /[A-Z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecialChar = /[^A-Za-z0-9]/.test(value);
          const minCharCount = value.length > 0;
          const maxCharCount = value.length <= 50;

          if (
            !hasLowercase ||
            !hasUppercase ||
            !hasNumber ||
            !hasSpecialChar ||
            !minCharCount ||
            !maxCharCount
          ) {
            return false;
          }
          return true;
        },
        {
          message:
            "Password must be between 6 to 50 characters; have at least 1 lowercase, 1 uppercase, 1 number, and 1 special character",
        }
      ),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export type UserRegisterFormData = z.infer<typeof RegistrationSchema>;

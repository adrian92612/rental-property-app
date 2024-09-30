import { z } from "zod";

export const EditUserSchema = z.object({
  userId: z.string(),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  phoneNumber: z
    .string({
      invalid_type_error: "Phone number must be a string",
    })
    .trim()
    .refine((value) => value === "" || /^\d+$/.test(value), {
      message: "Phone number must contain only numbers",
    })
    .optional(),
});

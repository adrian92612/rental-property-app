import { z } from "zod";

export const AddPropertySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Property name is required")
    .max(100, "Cannot be more than 100 characters"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(100, "Cannot be more than 100 characters"),
  owner: z
    .string()
    .trim()
    .min(1, "Owner is required")
    .max(100, "Cannot be more than 100 characters"),
  contactInfo: z
    .string()
    .trim()
    .min(1, "Contact information is required")
    .max(100, "Cannot be more than 100 characters"),
  units: z.coerce
    .number({
      required_error: "Units is required",
      invalid_type_error: "Units must be a number",
    })
    .int("Must be a whole number")
    .min(1, "There must be at least 1 unit"),
  image: z.string().optional(),
  imagePublicId: z.string().optional(),
  propertyId: z.string().optional(),
});

export type AddPropertyFormData = z.infer<typeof AddPropertySchema>;

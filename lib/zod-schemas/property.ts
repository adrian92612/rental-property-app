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
  purchasePrice: z.coerce
    .number({
      required_error: "Purchase Price is required",
      invalid_type_error: "Purchase price must be a number",
    })
    .min(0, "Cannot be negative value"),
  monthlyExpense: z.coerce
    .number({
      required_error: "Monthly expense is required",
      invalid_type_error: "Monthly expense must be a number",
    })
    .min(0, "Cannot be negative value"),
  mortgagePayment: z.coerce
    .number({
      required_error: "Mortgage payment is required",
      invalid_type_error: "Mortgage payment must be a number",
    })
    .min(0, "Cannot be negative value"),
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

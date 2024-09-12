import { z } from "zod";

export const UnitSchema = z.object({
  number: z
    .string()
    .trim()
    .min(1, "Unit No. is required")
    .max(20, "Cannot be more than 20 characters"),
  rentAmount: z.coerce
    .number({
      required_error: "Rent amount is required",
      invalid_type_error: "Rent amount must be a number",
    })
    .min(0, "Must be greater than 0"),
  dueDate: z.coerce
    .number()
    .int("Must be a whole number")
    .gt(0, "Must be between 1-31")
    .lt(32, "Must be between 1-31")
    .optional(),
  propertyId: z
    .string({ message: "Property Id is missing" })
    .min(1, "Property Id is missing"),
  unitId: z.string().optional(),
  tenantId: z.string().optional(),
});

export type UnitFormData = z.infer<typeof UnitSchema>;

/*
 id         String @id
  number     String
  rentAmount Float  @default(0)
  dueDate    Int?
  propertyId String

  property Property @relation(fields: [propertyId], references: [id])
  tenant   Tenant?
*/

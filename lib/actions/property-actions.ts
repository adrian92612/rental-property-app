"use server";

import { AddPropertySchema } from "../zod-schemas/property";

export type upsertPropertyFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string>;
};
export const upsertProperty = async (
  prevState: any,
  formData: FormData
): Promise<upsertPropertyFormState> => {
  const data = Object.fromEntries(formData);
  const imageFile = formData.get("image") as File;
  delete data.image;
  const parsedData = AddPropertySchema.safeParse(data);

  if (!parsedData.success) {
    console.log("unsuccess");
    return { message: "Failed to add property", fields: parsedData.data };
  }

  console.log("success");
  return { message: "upsert", success: true };
};

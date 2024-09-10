"use server";

export type upsertPropertyFormState = {
  message: string;
  success?: boolean;
  field?: Record<string, string>;
};
export const upsertProperty = async (
  prevState: any,
  formData: FormData
): Promise<upsertPropertyFormState> => {
  return { message: "upsert" };
};

"use server";

export type loginFormState = {
  message: string;
};

export const login = async (
  prevState: any,
  formData: FormData
): Promise<loginFormState> => {
  console.log("login server action");
  return { message: "login from server action" };
};

"use server";

import { signIn, signOut } from "@/auth";

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

export const loginSocial = async (formData: FormData) => {
  const provider = formData.get("action") as string;
  await signIn(provider, { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

"use server";

import { signIn, signOut } from "@/auth";
import { RegistrationSchema } from "../zod-schemas/register";
import prisma from "@/prisma/prisma";
import { genSalt, hashSync } from "bcrypt-ts";
import { createId } from "@paralleldrive/cuid2";
import { LoginSchema } from "../zod-schemas/login";

export type loginFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string>;
};

export const login = async (
  prevState: any,
  formData: FormData
): Promise<loginFormState> => {
  const data = Object.fromEntries(formData);
  const parsedData = LoginSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      message: "Failed to login",
      fields: parsedData.data,
    };
  }

  try {
    await signIn("credentials", {
      redirect: false,
      email: parsedData.data.email,
      password: parsedData.data.password,
    });
    return {
      message: "Login successful!",
      success: true,
    };
  } catch (error) {
    console.error("Failed to login: ", error);
    return {
      message: "Failed to login",
      fields: parsedData.data,
    };
  }
};

export const loginSocial = async (formData: FormData) => {
  const provider = formData.get("action") as string;
  await signIn(provider, { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export type registerUserFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string>;
};

export const registerUser = async (
  prevState: any,
  formData: FormData
): Promise<registerUserFormState> => {
  const data = Object.fromEntries(formData);
  const parsedData = RegistrationSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      message: "Failed to register, try again",
      fields: parsedData.data,
    };
  }

  const { email, firstName, lastName, password } = parsedData.data;

  // return {
  //   message: "Failed to register user",
  //   fields: parsedData.data,
  // };

  try {
    const isEmailUnique = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmailUnique) {
      return {
        ...prevState,
        error: "Email address is already registered to another user",
      };
    }

    const salt = await genSalt(10);
    const hashedPassword = hashSync(password, salt);
    await prisma.user.create({
      data: {
        id: createId(),
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
      },
    });
    return { message: "Registration successful!", success: true };
  } catch (error) {
    console.error("Failed to register user: ", error);
    return {
      message: "Failed to register user",
      fields: parsedData.data,
    };
  }
};

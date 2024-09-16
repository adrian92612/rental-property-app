"use server";

import { auth, signIn, signOut } from "@/auth";
import { RegistrationSchema } from "../zod-schemas/register";
import prisma from "@/prisma/prisma";
import { genSalt, hashSync } from "bcrypt-ts";
import { createId } from "@paralleldrive/cuid2";
import { LoginSchema } from "../zod-schemas/login";
import { cloudinary } from "../cloudinary-config";

export type loginFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string>;
};

export const login = async (
  prevState: loginFormState,
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
      message: "Invalid credentials",
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

export const getUserId = async (): Promise<string | undefined> => {
  const session = await auth();
  return session?.user?.id;
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

  try {
    const isEmailUnique = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmailUnique) {
      return {
        message: "Email address is already registered to another user",
        fields: parsedData.data,
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

export type uploadImageInfo = {
  imageUrl: string;
  publicId: string;
};

export const uploadImage = async (
  image: File
): Promise<uploadImageInfo | undefined> => {
  try {
    if (image && image.type.startsWith("image/")) {
      const arrayBuffer = await image.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");
      const dataURI = `data:${image.type};base64,${base64Data}`;

      const res = await cloudinary.uploader.upload(dataURI);

      return {
        imageUrl: res.secure_url,
        publicId: res.public_id,
      };
    }
    throw new Error("File must be an image");
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};

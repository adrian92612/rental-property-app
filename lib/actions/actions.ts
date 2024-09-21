"use server";

import { auth, signIn, signOut } from "@/auth";
import { RegistrationSchema } from "../zod-schemas/register";
import prisma from "@/prisma/prisma";
import { genSalt, hashSync } from "bcrypt-ts";
import { createId } from "@paralleldrive/cuid2";
import { LoginSchema } from "../zod-schemas/login";
import { cloudinary } from "../cloudinary-config";
import { successState } from "./tenant-actions";
import { revalidatePath } from "next/cache";

export type FormState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
};

export type SuccessState = {
  success: boolean;
  message: string;
};

export type loginFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string>;
};

export type uploadImageInfo = {
  imageUrl: string;
  publicId: string;
};

export type registerUserFormState = {
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

export type getUserImageObj = {
  firstName: string;
  lastName: string;
  image: string | null;
};

export const getUserImage = async (): Promise<getUserImageObj | null> => {
  try {
    const userId = await getUserId();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        image: true,
      },
    });
    if (user) return user;
    throw new Error("User not found");
  } catch (error) {
    console.error("Unable to get user image: ", error);
    return null;
  }
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

export const addNote = async (
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  const id = formData.get("id") as string;
  const note = formData.get("note") as string;
  const model = formData.get("model") as string;
  try {
    if (model === "property") {
      await prisma.property.update({
        where: { id: id },
        data: {
          notes: {
            push: note,
          },
        },
      });
      revalidatePath(`/dashboard/properties/${id}`);
    } else if (model === "unit") {
      await prisma.unit.update({
        where: { id: id },
        data: {
          notes: {
            push: note,
          },
        },
      });
      revalidatePath(`/dashboard/units/${id}`);
    } else if (model === "tenant") {
      await prisma.tenant.update({
        where: { id: id },
        data: {
          notes: {
            push: note,
          },
        },
      });

      revalidatePath(`/dashboard/tenants/${id}`);
    } else {
      throw new Error(`${model} does not exists`);
    }

    return {
      success: true,
      message: `Note has been added to ${model}`,
    };
  } catch (error) {
    console.error("Failed to add note: ", error);
    return {
      success: false,
      message: "failed to add note, try again later.",
      fields: { prevState },
    };
  }
};

type deleteNotesProps = {
  id: string;
  index: number;
  notes: string[];
  model: "property" | "unit" | "tenant";
};

export const deleteNote = async ({
  id,
  index,
  notes,
  model,
}: deleteNotesProps): Promise<SuccessState> => {
  try {
    const newNotes = notes.filter((_, i) => i !== index);
    if (model === "property") {
      await prisma.property.update({
        where: { id: id },
        data: {
          notes: newNotes,
        },
      });
      revalidatePath(`/dashboard/properties/${id}`);
    } else if (model === "unit") {
      await prisma.unit.update({
        where: { id: id },
        data: {
          notes: newNotes,
        },
      });
      revalidatePath(`/dashboard/units/${id}`);
    } else if (model === "tenant") {
      await prisma.tenant.update({
        where: { id: id },
        data: {
          notes: newNotes,
        },
      });
      revalidatePath(`/dashboard/tenants/${id}`);
    }
    return {
      success: true,
      message: `Note has been deleted from ${model}`,
    };
  } catch (error) {
    console.error("Failed to delete note: ", error);
    return {
      success: false,
      message: "Failed to delete note, try again later",
    };
  }
};

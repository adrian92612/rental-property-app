"use server";

import { auth, signIn, signOut } from "@/auth";
import { RegistrationSchema } from "../zod-schemas/register";
import prisma from "@/prisma/prisma";
import { compare, genSalt, hashSync } from "bcrypt-ts";
import { createId } from "@paralleldrive/cuid2";
import { LoginSchema } from "../zod-schemas/login";
import { cloudinary } from "../cloudinary-config";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { EditUserSchema } from "../zod-schemas/user";
import { UpdatePasswordSchema } from "../zod-schemas/update-password";

export type FormResponse = {
  success: boolean;
  message: string;
  fields?: Record<string, string | number | Date | boolean>;
};

export type Response = {
  success: boolean;
  message: string;
};

export type uploadImageInfo = {
  imageUrl: string;
  publicId: string;
};

export type ImageResponse = {
  success: boolean;
  message: string;
  imageUrl?: string;
};

type getUserImageObj = {
  firstName: string;
  lastName: string;
  image: string | null;
};

type deleteNotesProps = {
  id: string;
  index: number;
  notes: string[];
  model: "property" | "unit" | "tenant";
};

export const login = async (
  prevState: FormResponse,
  formData: FormData
): Promise<FormResponse> => {
  const data = Object.fromEntries(formData);
  const parsedData = LoginSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
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
      success: false,
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

export const getUserId = async (): Promise<string> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("Failed to authenticate");
    }

    return session.user.id;
  } catch (error) {
    console.error("Failed to get user id: ", error);
    throw error;
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const userId = await getUserId();
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("Failed to get user: ", error);
    throw error;
  }
};

export const getUserImage = async (): Promise<getUserImageObj> => {
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
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("Unable to get user image: ", error);
    throw error;
  }
};

export const updateUserImage = async (
  userId: string,
  file: File,
  publicId: string
): Promise<ImageResponse> => {
  try {
    const res = await uploadImage(file);
    if (!res) throw new Error("Failed to upload image");

    await prisma.user.update({
      where: { id: userId },
      data: {
        image: res.imageUrl,
        imagePublicId: res.publicId,
      },
    });
    if (publicId) await cloudinary.uploader.destroy(publicId);
    revalidatePath("/dashboard/user-settings");

    return {
      success: true,
      message: "Avatar image has been updated",
      imageUrl: res.imageUrl,
    };
  } catch (error) {
    console.error("Failed to update user avatar: ", error);
    throw error;
  }
};

export const updateBillingPayment = async (
  prevState: Response,
  formData: FormData
): Promise<Response> => {
  try {
    const data = Object.fromEntries(formData);
    console.log(data);
    await prisma.user.update({
      where: { id: data.userId as string },
      data: {
        paymentMethod: data.paymentMethod as string,
        subscription: data.subscription as string,
        billingAddress: (data.billingAddress || "") as string,
      },
    });
    revalidatePath("/dashboard/user-settings");
    return {
      success: true,
      message: "Billing & Payment has been updated",
    };
  } catch (error) {
    console.error("Failed to update Billing & Payment", error);
    return {
      success: false,
      message: "Failed to update Billing & Payment",
    };
  }
};

export const updateNotifications = async (
  prevState: Response,
  formData: FormData
): Promise<Response> => {
  const data = Object.fromEntries(formData);
  try {
    await prisma.user.update({
      where: { id: data.userId as string },
      data: {
        notifyEmail: !!data.notifyEmail,
        notifySms: !!data.notifySms,
        notifyPush: !!data.notifyPush,
        notifyUpdates: !!data.notifyUpdates,
        notifyReminders: !!data.notifyReminders,
        notifyOffers: !!data.notifyOffers,
        notifyAlerts: !!data.notifyAlerts,
        notifyEvents: !!data.notifyEvents,
        notifyReports: !!data.notifyReports,
      },
    });

    revalidatePath("/dashboard/user-settings");
    return {
      success: true,
      message: "Notification preferences has been updated",
    };
  } catch (error) {
    console.error("Failed to update notification preferences: ", error);
    return {
      success: false,
      message: "Failed to update notification preferences",
    };
  }
};

export const updateUserInfo = async (
  prevState: FormResponse,
  formData: FormData
): Promise<FormResponse> => {
  const data = Object.fromEntries(formData);
  const parsedData = EditUserSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Failed to update user information, try again later",
      fields: parsedData.data,
    };
  }

  const { userId, firstName, lastName, phoneNumber } = parsedData.data;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phoneNumber,
      },
    });

    revalidatePath("/dashboard/user-settings");
    return {
      success: true,
      message: "User information has been updated",
    };
  } catch (error) {
    console.error("Failed to update user information: ", error);
    return {
      success: false,
      message: "Failed to update user information, try again later",
      fields: parsedData.data,
    };
  }
};

export const updatePassword = async (
  prevState: FormResponse,
  formData: FormData
): Promise<FormResponse> => {
  const data = Object.fromEntries(formData);
  const parsedData = UpdatePasswordSchema.safeParse(data);

  if (!parsedData.success) {
    console.log(parsedData.error);
    return {
      success: false,
      message: "Failed to update password",
      fields: parsedData.data,
    };
  }
  const { userId, hashedPassword, currentPassword, password } = parsedData.data;
  const isValid = await compare(currentPassword, hashedPassword);

  if (!isValid) {
    return {
      success: false,
      message: "Current Password is incorrect",
      fields: {
        ...parsedData.data,
        message: "Current password is incorrect",
      },
    };
  }
  const salt = await genSalt(10);
  const newHashedPassword = hashSync(password, salt);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: newHashedPassword,
      },
    });

    return {
      success: true,
      message: "Password has been updated",
    };
  } catch (error) {
    console.error("Failed to update password: ", error);
    return {
      success: false,
      message: "Failed to update password",
      fields: parsedData.data,
    };
  }
};

export const registerUser = async (
  prevState: any,
  formData: FormData
): Promise<FormResponse> => {
  const data = Object.fromEntries(formData);
  const parsedData = RegistrationSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
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
        success: false,
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
    return {
      success: true,
      message: "Registration successful!",
    };
  } catch (error) {
    console.error("Failed to register user: ", error);
    return {
      success: false,
      message: "Failed to register user",
      fields: parsedData.data,
    };
  }
};

export const uploadImage = async (image: File): Promise<uploadImageInfo> => {
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
    throw error;
  }
};

export const addNote = async (
  prevState: any,
  formData: FormData
): Promise<FormResponse> => {
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

export const deleteNote = async ({
  id,
  index,
  notes,
  model,
}: deleteNotesProps): Promise<Response> => {
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

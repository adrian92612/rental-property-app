"use server";

import { revalidatePath } from "next/cache";
import { AddPropertySchema } from "../zod-schemas/property";
import {
  FormResponse,
  getUserId,
  ImageResponse,
  Response,
  uploadImage,
} from "./actions";
import prisma from "@/prisma/prisma";
import { createId } from "@paralleldrive/cuid2";
import { Property, Tenant, Unit } from "@prisma/client";
import { cloudinary } from "../cloudinary-config";

export type PropertiesIncludeAll = Property & {
  units: (Unit & {
    tenant: Tenant | null;
  })[];
};

export type PropertyIncludeAll = Property & {
  units: (Unit & {
    tenant: Tenant | null;
  })[];
};

export const getProperties = async (): Promise<PropertiesIncludeAll[]> => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("Invalid user id");

    const properties = await prisma.property.findMany({
      where: { userId: userId },
      include: {
        units: {
          include: {
            tenant: true,
          },
        },
      },
    });

    if (!properties.length) {
      throw new Error(`No properties found for User ID ${userId}`);
    }

    return properties;
  } catch (error) {
    console.error("Failed to fetch properties: ", error);
    return [];
  }
};

export const getProperty = async (
  propertyId: string
): Promise<PropertyIncludeAll> => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        units: {
          include: {
            tenant: true,
          },
        },
      },
    });

    if (!property) throw new Error(`Property with ID ${propertyId} not found`);

    return property;
  } catch (error) {
    console.error("Failed to fetch property: ", error);
    throw error;
  }
};

export const updatePropertyImage = async (
  propertyId: string,
  file: File,
  publicId: string
): Promise<ImageResponse> => {
  try {
    const res = await uploadImage(file);
    if (!res) throw new Error("Image upload failed");

    await prisma.property.update({
      where: { id: propertyId },
      data: {
        image: res.imageUrl,
        imagePublicId: res.publicId,
      },
    });

    if (publicId) await cloudinary.uploader.destroy(publicId);
    revalidatePath("/dashboard/properties");
    revalidatePath(`/dashboard/properties/${propertyId}`);

    return {
      message: "Image for property updated successfully.",
      success: true,
      imageUrl: res.imageUrl,
    };
  } catch (error) {
    console.error("Failed to update image: ", error);
    return {
      message: "Failed to update the image.",
      success: false,
    };
  }
};

export const upsertProperty = async (
  prevState: FormResponse,
  formData: FormData
): Promise<FormResponse> => {
  const data = Object.fromEntries(formData);
  const imageFile = formData.get("image") as File;
  delete data.image;

  if (data.propertyId) data.units = "1"; // avoid units zod error
  const parsedData = AddPropertySchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Failed to add/edit property",
      fields: parsedData.data,
    };
  }

  if (imageFile !== null && imageFile?.name !== "undefined") {
    const res = await uploadImage(imageFile);
    if (res) {
      const { imageUrl, publicId } = res;
      parsedData.data.image = imageUrl;
      parsedData.data.imagePublicId = publicId;
    }
  }

  const {
    propertyId,
    name,
    address,
    owner,
    contactInfo,
    image,
    imagePublicId,
    purchasePrice,
    monthlyExpense,
    mortgagePayment,
    units,
  } = parsedData.data;

  try {
    const userId = await getUserId();
    const property = await prisma.property.upsert({
      where: { id: propertyId ?? "" },
      update: {
        name,
        address,
        owner,
        contactInfo,
        purchasePrice,
        monthlyExpense,
        mortgagePayment,
        image,
      },
      create: {
        id: createId(),
        name,
        image,
        imagePublicId,
        address,
        owner,
        contactInfo,
        purchasePrice,
        monthlyExpense,
        mortgagePayment,
        user: {
          connect: { id: userId },
        },
      },
    });

    revalidatePath("/dashboard/properties");
    revalidatePath(`/dashboard/properties/${propertyId}`);

    if (propertyId) {
      return {
        success: true,
        message: `${name} has been updated`,
      };
    }

    if (units) {
      const unitData = Array.from({ length: units }, (_, i) => ({
        id: createId(),
        number: `Unit ${i + 1}`,
        rentAmount: 0,
        dueDate: 1,
        propertyId: property.id,
      }));

      await prisma.unit.createMany({ data: unitData });
    }

    return {
      success: true,
      message: `${name} has been added`,
    };
  } catch (error) {
    const msg = `Failed to ${propertyId ? "update" : "add"} ${name}`;
    console.error(msg, error);
    delete parsedData.data.image;
    return {
      success: false,
      message: msg,
      fields: parsedData.data,
    };
  }
};

export const deleteProperty = async (propertyId: string): Promise<Response> => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { name: true },
    });

    if (!property) {
      return {
        success: false,
        message: `Property with ID ${propertyId} not found.`,
      };
    }

    await prisma.$transaction(async (prisma) => {
      // Delete all units associated with the property
      await prisma.unit.deleteMany({ where: { propertyId } });

      // Delete the property itself
      await prisma.property.delete({ where: { id: propertyId } });
    });

    revalidatePath("/dashboard/properties");
    return {
      success: true,
      message: `Property ${propertyId} and associated units deleted successfully.`,
    };
  } catch (error) {
    console.error("Failed to delete property: ", error);
    return {
      success: false,
      message: `Failed to delete property ${propertyId}.`,
    };
  }
};

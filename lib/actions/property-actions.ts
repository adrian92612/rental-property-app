"use server";

import { revalidatePath } from "next/cache";
import { AddPropertySchema } from "../zod-schemas/property";
import { getUserId, uploadImage } from "./actions";
import prisma from "@/prisma/prisma";
import { createId } from "@paralleldrive/cuid2";
import { Property, Tenant, Unit } from "@prisma/client";
import { cloudinary } from "../cloudinary-config";

export type PropertiesIncludeAll = Property & {
  units: (Unit & {
    tenant: Tenant | null;
  })[];
};

export type PropertiesIncludeUnits = Property & {
  units: Unit[];
};

export type PropertyIncludeAll = Property & {
  units: (Unit & {
    tenant: Tenant | null;
  })[];
};

export type PropertyIncludeUnits = Property & {
  units: Unit[];
};

export type upsertPropertyFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string | number>;
};

export type updatePropertyImageState = {
  message: string;
  success: boolean;
  imageUrl?: string;
};

export type deletePropertyState = {
  success: boolean;
  message: string;
};

export const getProperties = async (
  includeAll: boolean = true
): Promise<PropertiesIncludeAll[] | PropertiesIncludeUnits[] | null> => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("Invalid user id");

    const properties = await prisma.property.findMany({
      where: { userId: userId },
      include: {
        units: {
          include: {
            ...(includeAll && { tenant: true }),
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
    return null;
  }
};

export const getProperty = async (
  propertyId: string
): Promise<PropertyIncludeAll | null> => {
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
    return null;
  }
};

export const updatePropertyImage = async (
  propertyId: string,
  file: File,
  publicId: string
): Promise<updatePropertyImageState> => {
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

    return {
      message: `Image for property ${propertyId} updated successfully.`,
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
  prevState: upsertPropertyFormState,
  formData: FormData
): Promise<upsertPropertyFormState> => {
  const data = Object.fromEntries(formData);
  const imageFile = formData.get("image") as File;
  delete data.image;

  if (data.propertyId) data.units = "1"; // avoid units zod error
  const parsedData = AddPropertySchema.safeParse(data);

  if (!parsedData.success) {
    return { message: "Failed to add/edit property", fields: parsedData.data };
  }

  if (imageFile.name !== "undefined") {
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
        user: {
          connect: { id: userId },
        },
      },
    });

    revalidatePath("/dashboard/properties");
    revalidatePath(`/dashboard/properties/${propertyId}`);

    if (propertyId) {
      return {
        message: "Property updated successfully!",
        success: true,
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

    return { message: "Property has been added!", success: true };
  } catch (error) {
    console.error("Failed to add/update property: ", error);
    delete parsedData.data.image;
    return {
      message: "Failed to add/update property",
      fields: parsedData.data,
    };
  }
};

export const deleteProperty = async (
  propertyId: string
): Promise<deletePropertyState> => {
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

"use server";

import { revalidatePath } from "next/cache";
import { AddPropertySchema } from "../zod-schemas/property";
import { getUserId, uploadImage } from "./actions";
import prisma from "@/prisma/prisma";
import { createId } from "@paralleldrive/cuid2";
import { Property, Tenant, Unit } from "@prisma/client";

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

    // if (!properties.length) {
    //   throw new Error(`No properties found for User ID ${userId}`);
    // }

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

    // if (!property) throw new Error(`Property with ID ${propertyId} not found`);

    return property;
  } catch (error) {
    console.error("Failed to fetch property: ", error);
    return null;
  }
};

export const upsertProperty = async (
  prevState: upsertPropertyFormState,
  formData: FormData
): Promise<upsertPropertyFormState> => {
  const data = Object.fromEntries(formData);
  const imageFile = formData.get("image") as File;
  delete data.image;
  console.log(data);
  if (data.propertyId) data.units = "1"; // avoid units zod error
  console.log(data);
  const parsedData = AddPropertySchema.safeParse(data);
  console.log(parsedData.error?.flatten().fieldErrors);

  if (!parsedData.success) {
    return { message: "Failed to add/edit property", fields: parsedData.data };
  }

  if (imageFile.name !== "undefined") {
    parsedData.data.image = await uploadImage(imageFile);
  }

  const { propertyId, name, address, owner, contactInfo, image, units } =
    parsedData.data;

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
        address,
        owner,
        contactInfo,
        user: {
          connect: { id: userId },
        },
      },
    });

    if (propertyId) {
      revalidatePath("/dashboard/properties");
      revalidatePath(`/dashboard/properties/${propertyId}`);
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

    revalidatePath("/dashboard/properties");
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

"use server";

import { revalidatePath } from "next/cache";
import { AddPropertySchema } from "../zod-schemas/property";
import { getUserId, uploadImage } from "./actions";
import prisma from "@/prisma/prisma";
import { createId } from "@paralleldrive/cuid2";
import { Property, Tenant, Unit } from "@prisma/client";

export type PropertiesAllProps = Property & {
  units: (Unit & {
    tenant: Tenant | null;
  })[];
};

export const getProperties = async (): Promise<PropertiesAllProps[]> => {
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
    return properties;
  } catch (error) {
    console.error("Failed to fetch properties: ", error);
    throw new Error("Failed to fetch properties. Please try again later.");
  }
};

export type upsertPropertyFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string | number>;
};
export const upsertProperty = async (
  prevState: upsertPropertyFormState,
  formData: FormData
): Promise<upsertPropertyFormState> => {
  const data = Object.fromEntries(formData);
  const imageFile = formData.get("image") as File;
  delete data.image;
  const parsedData = AddPropertySchema.safeParse(data);

  if (!parsedData.success) {
    return { message: "Failed to add property", fields: parsedData.data };
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
    return {
      message: "Failed to add/update property",
      fields: parsedData.data,
    };
  }
};

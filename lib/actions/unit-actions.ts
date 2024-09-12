"use server";

import prisma from "@/prisma/prisma";
import { createId } from "@paralleldrive/cuid2";
import { Prisma, Tenant, Unit } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UnitSchema } from "../zod-schemas/unit";

export type UnitIncludeTenant = Unit & {
  tenant: Tenant | null;
};

export type UnitsTableInfo = Unit & {
  property: {
    name: string;
  };
  tenant: {
    id: string;
  } | null;
};

export type PropertyIdName = {
  id: string;
  name: string;
};

export type upsertUnitFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string | number>;
};

export const getPropertyIdsAndNames = async (): Promise<
  PropertyIdName[] | null
> => {
  try {
    const properties = prisma.property.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return properties;
  } catch (error) {
    console.error("Failed to fetch properties: ", error);
    return null;
  }
};

export const getUnitsTableInfo = async (): Promise<UnitsTableInfo[] | null> => {
  try {
    const units = await prisma.unit.findMany({
      include: {
        property: {
          select: { name: true },
        },
        tenant: {
          select: { id: true },
        },
      },
    });

    if (!units) throw new Error("Units not found");

    return units;
  } catch (error) {
    console.error("Failed to fetch units: ", error);
    return null;
  }
};

export const upsertUnit = async (
  prevState: any,
  formData: FormData
): Promise<upsertUnitFormState> => {
  const data = Object.fromEntries(formData);

  const parsedData = UnitSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      message: "Failed to add/edit unit",
      fields: parsedData.data,
    };
  }
  const { unitId, tenantId, propertyId, number, rentAmount, dueDate } =
    parsedData.data;

  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { name: true },
    });

    if (!property)
      return {
        message: "Property not found",
        fields: parsedData.data,
      };

    await prisma.unit.upsert({
      where: { id: unitId ?? "" },
      update: {
        number,
        rentAmount,
        dueDate,
        tenant: tenantId
          ? {
              connect: { id: tenantId },
            }
          : { disconnect: true },
      },
      create: {
        id: createId(),
        number,
        rentAmount,
        dueDate,
        property: {
          connect: { id: propertyId },
        },
        ...(tenantId && {
          tenant: { connect: { id: tenantId } },
        }),
      },
    });

    if (unitId) {
      revalidatePath("/dashboard/units");
      revalidatePath(`/dashboard/units/${unitId}`);
      return {
        success: true,
        message: `${number} was successfully updated!`,
      };
    }

    revalidatePath("/dashboard/units");
    return {
      success: true,
      message: `${number} is added to ${property.name}`,
    };
  } catch (error) {
    console.log("Failed to add/edit unit: ", error);
    return { message: "Failed to add/edit unit", fields: parsedData.data };
  }
};

"use server";

import prisma from "@/prisma/prisma";
import { createId } from "@paralleldrive/cuid2";
import { Property, Tenant, Unit } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UnitSchema } from "../zod-schemas/unit";

export type UnitDetailsInfo = Unit & {
  property: Property;
  tenant: Tenant | null;
};

export type UnitWithTenant = Unit & {
  tenant: Tenant | null;
};

export type UnitFormData = Unit & {
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

export type deleteUnitState = {
  message: string;
  success: boolean;
};

export type FormState = {
  success?: boolean;
  message: string;
  fields?: Record<string, string>;
};

export const getPropertyIdsAndNames = async (): Promise<PropertyIdName[]> => {
  try {
    const properties = prisma.property.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (!properties) throw new Error("Properties not found");

    return properties;
  } catch (error) {
    console.error("Failed to fetch properties: ", error);
    return [];
  }
};

export const getUnitFormData = async (
  unitId: string
): Promise<UnitFormData | null> => {
  try {
    const unit = await prisma.unit.findUnique({
      where: { id: unitId },
      include: {
        property: {
          select: { name: true },
        },
        tenant: {
          select: { id: true },
        },
      },
    });

    if (!unit) throw new Error(`Unit with ID ${unitId} not found`);

    return unit;
  } catch (error) {
    console.error("Failed to fetch form data: ", error);
    return null;
  }
};

export const getUnitDetails = async (
  unitId: string
): Promise<UnitDetailsInfo | null> => {
  if (!unitId) return null;
  try {
    const unit = await prisma.unit.findUnique({
      where: { id: unitId },
      include: {
        property: true,
        tenant: true,
      },
    });

    if (!unit) throw new Error("Unit not found.");

    return unit;
  } catch (error) {
    console.error("Failed to fetch unit details: ", error);
    return null;
  }
};

export const getUnitsTableInfo = async (): Promise<UnitFormData[]> => {
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
    return [];
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

    revalidatePath("/dashboard/units");
    revalidatePath(`/dashboard/units/${unitId}`);

    if (unitId) {
      return {
        success: true,
        message: `${number} was successfully updated!`,
      };
    }

    return {
      success: true,
      message: `${number} is added to ${property.name}`,
    };
  } catch (error) {
    console.log("Failed to add/edit unit: ", error);
    return { message: "Failed to add/edit unit", fields: parsedData.data };
  }
};

export const deleteUnit = async (unitId: string): Promise<deleteUnitState> => {
  try {
    await prisma.unit.delete({
      where: { id: unitId },
    });
    revalidatePath("/dashboard/units");
    return {
      success: true,
      message: `Unit ${unitId} deleted successfully.`,
    };
  } catch (error) {
    console.error("Failed to delete unit, try again later: ", error);
    return {
      message: `Failed to delete unit ID ${unitId}`,
      success: false,
    };
  }
};

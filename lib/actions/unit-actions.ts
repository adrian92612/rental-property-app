"use server";

import prisma from "@/prisma/prisma";
import { Unit } from "@prisma/client";

export type UnitsTableInfo = Unit & {
  property: {
    name: string;
  };
  tenant: {
    id: string;
  } | null;
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

"use server";

import prisma from "@/prisma/prisma";
import { TenantSchema } from "../zod-schemas/tenant";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { Tenant } from "@prisma/client";

export type upsertTenantState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string | number | Date>;
};

export type deleteTenantState = {
  message: string;
  success: boolean;
};

export type successState = {
  success: boolean;
  message: string;
};

export type TenantsTableInfo = Tenant & {};

export const getTenantData = async (
  tenantId: string
): Promise<Tenant | null> => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    return tenant;
  } catch (error) {
    console.error("Failed to fetch tenant data: ", error);
    return null;
  }
};

export const getTenantsTableInfo = async (): Promise<Tenant[] | null> => {
  try {
    const tenants = await prisma.tenant.findMany({});
    if (!tenants.length) throw new Error("Failed to fetch tenants");

    return tenants;
  } catch (error) {
    console.error("Failed to fetch tenants: ", error);
    return null;
  }
};

export const assignTenant = async (
  tenantId: string,
  unitId: string
): Promise<{ message: string; success: boolean }> => {
  try {
    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        unitId: unitId,
      },
    });
    revalidatePath(`/dashboard/units/${unitId}`);
    revalidatePath(`/dashboard/tenants/${tenantId}`);
    revalidatePath("/dashboard/units");
    revalidatePath("/dashboard/tenants");

    return {
      message: `Successfully assigned tenant id ${tenantId} to unit id ${unitId}`,
      success: true,
    };
  } catch (error) {
    console.error("Failed to assign tenant to a unit: ", error);
    return {
      message: `Failed to assign tenant to unit, error: ${error}`,
      success: false,
    };
  }
};

export const removeTenant = async (
  tenantId: string,
  unitId: string
): Promise<successState> => {
  try {
    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        unitId: null,
      },
    });
    revalidatePath(`/dashboard/units/${unitId}`);
    revalidatePath(`/dashboard/tenants/${tenantId}`);
    revalidatePath("/dashboard/units");
    revalidatePath("/dashboard/tenants");
    return {
      success: true,
      message: "Successfully removed the tenant from the unit",
    };
  } catch (error) {
    console.error(
      `Failed to remove tenant id ${tenantId} from the unit}: ${error}`
    );
    return {
      success: false,
      message: "Failed to remove tenant from the unit",
    };
  }
};

export const upsertTenant = async (
  prevState: upsertTenantState,
  formData: FormData
): Promise<upsertTenantState> => {
  const data = Object.fromEntries(formData);
  const leaseStartDate = new Date(
    (data.leaseStart as string).replace(/(\d+)(st|nd|rd|th)/, "$1")
  );
  const leaseEndDate = new Date(
    (data.leaseEnd as string).replace(/(\d+)(st|nd|rd|th)/, "$1")
  );

  const parsedData = TenantSchema.safeParse({
    ...data,
    leaseStart: leaseStartDate,
    leaseEnd: leaseEndDate,
  });

  if (!parsedData.success) {
    return {
      message: "Validation failed",
      fields: parsedData.data,
    };
  }

  const {
    tenantId,
    unitId,
    firstName,
    lastName,
    email,
    phoneNumber,
    termInMonths,
    leaseStart,
    leaseEnd,
  } = parsedData.data;

  try {
    const existingTenant = await prisma.tenant.findUnique({
      where: { email },
    });

    if (existingTenant && existingTenant.id !== tenantId) {
      return {
        message: "A tenant with this email already exists.",
        fields: parsedData.data,
      };
    }

    await prisma.tenant.upsert({
      where: { id: tenantId ?? "" },
      update: {
        firstName,
        lastName,
        email,
        phoneNumber,
        termInMonths,
        leaseStart,
        leaseEnd,
        ...(unitId && {
          unit: {
            connect: { id: unitId },
          },
        }),
      },
      create: {
        id: createId(),
        firstName,
        lastName,
        email,
        phoneNumber,
        termInMonths,
        leaseStart,
        leaseEnd,
      },
    });

    revalidatePath("/dashboard/tenants");
    revalidatePath(`/dashboard/tenants/${tenantId}`);

    if (tenantId) {
      return {
        message: `${firstName} ${lastName} has been successfully updated.`,
        success: true,
      };
    }

    return {
      message: `${firstName} ${lastName} has been added to Tenants`,
      success: true,
    };
  } catch (error) {
    const msg = `Failed to ${tenantId ? "update" : "add"} tenant`;
    console.error(msg, error);
    return {
      message: msg,
    };
  }
};

export const deleteTenant = async (
  tenantId: string
): Promise<deleteTenantState> => {
  try {
    await prisma.tenant.delete({
      where: { id: tenantId },
    });
    revalidatePath("/dashboard/units");
    return {
      success: true,
      message: `Tenant was deleted successfully.`,
    };
  } catch (error) {
    console.error("Failed to delete tenant: ", error);
    return {
      message: "Failed to delete tenant",
      success: false,
    };
  }
};

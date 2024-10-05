import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Rental Property Dashboard",
    template: "%s | Rental Property Dashboard",
  },
  description: "Manage your rental properties, units, and tenants seamlessly.",
};

export const dashboardMetadata: Metadata = {
  title: {
    default: "Dashboard Overview | Rental Property Dashboard",
    template: "%s | Rental Property Dashboard",
  },
  description: "View the overview of your rental properties and activity.",
};

export const propertiesMetadata: Metadata = {
  title: "Properties",
  description: "Manage and track your rental properties.",
};

export const propertyDetailsMetadata = (propertyName: string): Metadata => ({
  title: `${propertyName}`,
  description: `Detailed view and management for ${propertyName} property.`,
});

export const unitsMetadata: Metadata = {
  title: "Units",
  description: "View and manage all rental units in your properties.",
};

export const unitDetailsMetadata = (unitNumber: string): Metadata => ({
  title: unitNumber,
  description: `Detailed view and management for unit ${unitNumber}.`,
});

export const tenantsMetadata: Metadata = {
  title: "Tenants",
  description: "View and manage all tenants across your rental properties.",
};

export const tenantDetailsMetadata = (tenantName: string): Metadata => ({
  title: `Tenant: ${tenantName}`,
  description: `Detailed view and profile for tenant ${tenantName}.`,
});

export const settingsMetadata: Metadata = {
  title: "User Settings",
  description:
    "Manage your personal information, preferences, and account settings.",
};

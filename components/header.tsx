"use client";

import { MdDarkMode } from "react-icons/md";
import { FormDialog } from "./form-dialog";
import { UnitForm } from "./unit/unit-form";
import { PropertyForm } from "./property/property-form";
import { TenantForm } from "./tenant/tenant-form";

type HeaderProps = {
  label: "Properties" | "Units" | "Tenants";
};

export const Header = ({ label }: HeaderProps) => {
  const renderForm = (closeDialog: () => void) => {
    switch (label) {
      case "Properties":
        return <PropertyForm closeDialog={closeDialog} />;
      case "Units":
        return <UnitForm closeDialog={closeDialog} />;
      default:
        return <TenantForm closeDialog={closeDialog} />;
    }
  };
  return (
    <div className="sticky top-0 flex items-center justify-between p-5 backdrop-blur-md z-10">
      <FormDialog label={label}>
        {(closeDialog) => renderForm(closeDialog)}
      </FormDialog>
      <h1 className="font-bold text-lg tracking-widest">{label}</h1>
      <div>
        <MdDarkMode className="h-8 w-8" />
      </div>
    </div>
  );
};

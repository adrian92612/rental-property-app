"use client";

import { MdDarkMode } from "react-icons/md";
import { FormDialog } from "./form-dialog";
import { UnitForm } from "./unit/unit-form";
import { PropertyForm } from "./property/property-form";

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
      // case "Tenants":
      //   return <TenantForm closeDialog={closeDialog} />;
      default:
        return <PropertyForm closeDialog={closeDialog} />;
    }
  };
  return (
    <div className="sticky top-0 flex items-center justify-between p-5 backdrop-blur-md z-10">
      <FormDialog label={label}>
        {(closeDialog) => renderForm(closeDialog)}
        {/* {(closeDialog)=><PropertyForm closeDialog={closeDialog} />} */}
      </FormDialog>
      <h1 className="font-bold text-lg tracking-widest">{label}</h1>
      <div>
        <MdDarkMode className="h-8 w-8" />
      </div>
    </div>
  );
};

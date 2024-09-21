"use client";

import { MdDarkMode } from "react-icons/md";
import { FormDialog } from "./form-dialog";
import { UnitForm } from "./unit/unit-form";
import { PropertyForm } from "./property/property-form";
import { TenantForm } from "./tenant/tenant-form";
import { Libre_Baskerville } from "next/font/google";

type HeaderProps = {
  headerLabel: string;
  formComponent: "property" | "unit" | "tenant";
  properties?: { id: string; name: string }[];
};

export const Header = ({
  formComponent,
  headerLabel,
  properties,
}: HeaderProps) => {
  const renderForm = (closeDialog: () => void) => {
    switch (formComponent) {
      case "property":
        return <PropertyForm closeDialog={closeDialog} />;
      case "unit":
        return <UnitForm closeDialog={closeDialog} properties={properties} />;
      default:
        return <TenantForm closeDialog={closeDialog} />;
    }
  };
  return (
    <div className="sticky top-0 flex items-center justify-between p-5 backdrop-blur-md z-10">
      <FormDialog formFor={formComponent}>
        {(closeDialog) => renderForm(closeDialog)}
      </FormDialog>
      <h1 className="font-bold text-lg tracking-widest">{headerLabel}</h1>
      <div>
        <MdDarkMode className="h-8 w-8" />
      </div>
    </div>
  );
};

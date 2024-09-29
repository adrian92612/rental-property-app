"use client";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FormDialog } from "./form-dialog";
import { UnitForm } from "./unit/unit-form";
import { PropertyForm } from "./property/property-form";
import { TenantForm } from "./tenant/tenant-form";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

type HeaderProps = {
  headerLabel: string;
  formComponent: "property" | "unit" | "tenant" | "none";
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
      case "tenant":
        return <TenantForm closeDialog={closeDialog} />;
      default:
        return <div></div>;
    }
  };
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="sticky top-0 flex items-center justify-between px-5 py-2 backdrop-blur-md z-10 dark:text-primary">
      {formComponent !== "none" ? (
        <FormDialog formFor={formComponent}>
          {(closeDialog) => renderForm(closeDialog)}
        </FormDialog>
      ) : (
        <div className="h-9 w-9"></div>
      )}
      <h1 className="font-bold text-xl tracking-widest text-center">
        {headerLabel}
      </h1>
      <div className="flex items-center">
        {resolvedTheme === "light" ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-4xl"
            onClick={() => setTheme("dark")}
          >
            <MdDarkMode />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-4xl"
            onClick={() => setTheme("light")}
          >
            <MdLightMode />
          </Button>
        )}
      </div>
    </div>
  );
};

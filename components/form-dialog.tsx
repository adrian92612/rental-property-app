"use client";

import { MdAddHome } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { FaDoorClosed } from "react-icons/fa";
import { PropertyForm } from "./property/property-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Property, Tenant, Unit } from "@prisma/client";
import { Button } from "./ui/button";
import { PiNotePencilBold } from "react-icons/pi";
import { UnitForm } from "./unit/unit-form";

type FormDialogProps = {
  label: "Properties" | "Units" | "Tenants";
  model?: Property;
};

export const FormDialog = ({ label, model }: FormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);

  const renderForm = () => {
    switch (label) {
      case "Properties":
        return <PropertyForm closeDialog={closeDialog} property={model} />;
      case "Units":
        return <UnitForm closeDialog={closeDialog} />;
      // case "Tenants":
      //   return <TenantForm closeDialog={closeDialog} />;
      default:
        return null;
    }
  };

  const icons = {
    Properties: <MdAddHome className="h-8 w-8" />,
    Units: <FaDoorClosed className="h-8 w-8" />,
    Tenants: <IoPersonAdd className="h-8 w-8" />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogTrigger asChild>
        <Button variant="dialog" size="zero">
          {model ? <PiNotePencilBold /> : icons[label]}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary text-primary-foreground w-11/12 max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{model ? "Edit" : "Add"}</DialogTitle>
          <DialogDescription className="sr-only">
            Form for adding/editing models
          </DialogDescription>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};

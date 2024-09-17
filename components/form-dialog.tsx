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
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PiNotePencilBold } from "react-icons/pi";

type FormDialogProps = {
  formFor: "property" | "unit" | "tenant" | "edit";
  isEdit?: Boolean;
  children: (closeDialog: () => void) => React.ReactElement;
};

export const FormDialog = ({ formFor, children }: FormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);

  const icons = {
    property: <MdAddHome className="h-8 w-8" />,
    unit: <FaDoorClosed className="h-8 w-8" />,
    tenant: <IoPersonAdd className="h-8 w-8" />,
    edit: <PiNotePencilBold />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogTrigger asChild>
        <Button variant="dialog" size="zero">
          {icons[formFor]}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary text-primary-foreground w-11/12 max-w-[400px]">
        <DialogHeader>
          <DialogDescription className="sr-only">
            Form for adding/editing models
          </DialogDescription>
        </DialogHeader>
        {children(closeDialog)}
      </DialogContent>
    </Dialog>
  );
};

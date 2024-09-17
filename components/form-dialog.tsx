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
  label: "Properties" | "Units" | "Tenants";
  isEdit?: Boolean;
  children: (closeDialog: () => void) => React.ReactElement;
};

export const FormDialog = ({
  label,
  isEdit = false,
  children,
}: FormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);

  const icons = {
    Properties: <MdAddHome className="h-8 w-8" />,
    Units: <FaDoorClosed className="h-8 w-8" />,
    Tenants: <IoPersonAdd className="h-8 w-8" />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogTrigger asChild>
        <Button variant="dialog" size="zero">
          {isEdit ? <PiNotePencilBold /> : icons[label]}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary text-primary-foreground w-11/12 max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"}</DialogTitle>
          <DialogDescription className="sr-only">
            Form for adding/editing models
          </DialogDescription>
        </DialogHeader>
        {children(closeDialog)}
      </DialogContent>
    </Dialog>
  );
};

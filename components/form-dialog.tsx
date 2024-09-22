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
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";

type FormDialogProps = {
  formFor: "property" | "unit" | "tenant" | "edit";
  children: (closeDialog: () => void) => React.ReactElement;
  className?: string;
};

export const FormDialog = ({
  formFor,
  children,
  className,
}: FormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);

  const icons = {
    property: <MdAddHome />,
    unit: <FaDoorClosed />,
    tenant: <IoPersonAdd />,
    edit: <PiNotePencilBold />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(formFor === "edit" ? "text-xl" : "text-3xl", className)}
        >
          {icons[formFor]}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary-foreground rounded-sm w-11/12 max-w-[400px]">
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

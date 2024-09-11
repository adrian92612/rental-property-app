"use client";

import { MdAddHome } from "react-icons/md";
import { PropertyForm } from "./property/property-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

export const FormDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <MdAddHome className="h-8 w-8" />
      </DialogTrigger>
      <DialogContent className="bg-primary text-primary-foreground w-11/12 max-w-[400px]">
        <DialogHeader>Add Property</DialogHeader>
        <PropertyForm closeDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

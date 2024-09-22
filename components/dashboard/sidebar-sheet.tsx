"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { IoIosMenu } from "react-icons/io";
import { NavLinks } from "./sidebar";

export const SideBarSheet = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="sm:hidden">
        <IoIosMenu className="h-8 w-8 text-primary-foreground" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-10 bg-popover-foreground">
        <SheetHeader onClick={() => setOpen(false)}>
          <NavLinks />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

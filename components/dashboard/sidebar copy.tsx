"use client";

import { getUserImage, logout } from "@/lib/actions/actions";
import { Button } from "../ui/button";
import { IoIosMenu } from "react-icons/io";
import { BsBuildingsFill, BsPeopleFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarFallback } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <MdSpaceDashboard />,
  },
  {
    href: "/dashboard/properties",
    label: "Properties",
    icon: <BsBuildingsFill />,
  },
  {
    href: "/dashboard/units",
    label: "Units",
    icon: <FaKey />,
  },
  {
    href: "/dashboard/tenants",
    label: "Tenants",
    icon: <BsPeopleFill />,
  },
];

const NavLinks = () => {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Button
              asChild
              variant="link"
              size="lg"
              className="text-primary-foreground text-xl hover:bg-primary-foreground hover:text-primary w-full justify-start rounded-none"
            >
              <Link href={link.href} className="flex items-center gap-3">
                {link.icon} {link.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const LogoutBtn = async () => {
  const user = await getUserImage();
  return (
    <form
      action={logout}
      className="flex items-center gap-2 sm:border-t border-primary-foreground sm:pt-2 w-full justify-end"
    >
      <Avatar>
        <AvatarImage src={user?.image || ""} alt="Picture of user" />
        <AvatarFallback>
          {getAvatarFallback(user?.firstName || "", user?.lastName || "")}
        </AvatarFallback>
      </Avatar>
      <Button variant="destructive" size="sm" className="font-bold rounded-sm">
        Logout
      </Button>
    </form>
  );
};

export const SideBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:sticky sm:top-0 sm:h-screen flex sm:flex-col items-center justify-between px-5 py-3 sm:py-5 bg-primary">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="sm:hidden">
          <IoIosMenu className="h-8 w-8 text-primary-foreground" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader onClick={() => setOpen(false)} className="bg-red-100">
            <NavLinks />
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="hidden sm:block">
        <NavLinks />
      </div>
      <LogoutBtn />
    </div>
  );
};

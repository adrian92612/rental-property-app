import { getUserImage, logout } from "@/lib/actions/actions";
import { Button } from "../ui/button";
import { BsBuildingsFill, BsPeopleFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarFallback } from "@/lib/utils";
import { SideBarSheet } from "./sidebar-sheet";
import { IoSettingsSharp } from "react-icons/io5";

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
  {
    href: "/dashboard/user-settings",
    label: "Settings",
    icon: <IoSettingsSharp />,
  },
];

export const NavLinks = () => {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Button
              asChild
              variant="link"
              size="default"
              className="font-montserrat text-background dark:text-foreground hover:text-foreground hover:bg-background text-xl w-full justify-start rounded-none px-14 h-12"
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
      className="flex items-center gap-2 sm:border-t border-primary-foreground dark:border-primary sm:pt-2 w-full justify-end"
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

export const SideBar = async () => {
  return (
    <div className=" sm:h-screen flex sm:flex-col items-center justify-between px-5 py-3 sm:py-5 bg-card-foreground dark:bg-card overflow-x-hidden overflow-y-auto">
      <SideBarSheet />

      <div className="hidden sm:block">
        <NavLinks />
      </div>
      <LogoutBtn />
    </div>
  );
};

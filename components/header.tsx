"use client";

import { MdDarkMode } from "react-icons/md";
import { FormDialog } from "./form-dialog";

type HeaderProps = {
  label: "Properties" | "Units" | "Tenants";
};

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="sticky top-0 flex items-center justify-between p-5 backdrop-blur-md z-10">
      <FormDialog label="Properties" />
      <h1 className="font-bold text-lg">{label}</h1>
      <div>
        <MdDarkMode className="h-8 w-8" />
      </div>
    </div>
  );
};

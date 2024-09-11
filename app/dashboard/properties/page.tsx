import { FormDialog } from "@/components/form-dialog";
import { PropertyForm } from "@/components/property/property-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdAddHome, MdDarkMode } from "react-icons/md";

const PropertiesPage = () => {
  return (
    <>
      <div className="sticky top-0 flex items-center justify-between p-5 backdrop-blur-sm">
        <FormDialog />
        <h1 className="font-bold text-lg">Properties</h1>
        <div>
          <MdDarkMode className="h-8 w-8" />
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
};

export default PropertiesPage;

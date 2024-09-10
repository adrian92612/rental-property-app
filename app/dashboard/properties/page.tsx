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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "@radix-ui/react-icons";
import { MdAddHome, MdDarkMode } from "react-icons/md";

const PropertiesPage = () => {
  return (
    <>
      <div className="sticky top-0 flex items-center justify-between p-5 backdrop-blur-sm">
        <Dialog>
          <DialogTrigger>
            <MdAddHome className="h-8 w-8" />
          </DialogTrigger>
          <DialogContent className="bg-primary text-primary-foreground w-11/12 max-w-[400px]">
            <DialogHeader>Add Form</DialogHeader>
            ADD Form
          </DialogContent>
        </Dialog>
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

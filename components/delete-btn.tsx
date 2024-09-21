"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteProperty } from "@/lib/actions/property-actions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { FaCheck } from "react-icons/fa";
import { deleteUnit } from "@/lib/actions/unit-actions";
import { deleteTenant } from "@/lib/actions/tenant-actions";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type DeleteBtnProps = {
  id: string;
  model: "property" | "unit" | "tenant";
  redirect?: boolean;
};

export const DeleteBtn = ({ id, model, redirect = false }: DeleteBtnProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const actions = {
    property: () => deleteProperty(id),
    unit: () => deleteUnit(id),
    tenant: () => deleteTenant(id),
  };

  const routes = {
    property: "/dashboard/properties",
    unit: "/dashboard/units",
    tenant: "/dashboard/tenants",
  };

  const getTitle = () => {
    return model.charAt(0).toUpperCase() + model.slice(1);
  };

  const handleDelete = async () => {
    try {
      setIsPending(true);
      const res = await actions[model]();
      const msg = res.success
        ? `${getTitle()} has been deleted`
        : `Failed to delete ${getTitle()}`;

      toast({
        title: msg,
      });

      if (res.success && redirect) router.push(routes[model]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong, try again later",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="dialog" size="zero" disabled={isPending}>
          <RiDeleteBin5Fill />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this {getTitle()}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will be permenantly removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

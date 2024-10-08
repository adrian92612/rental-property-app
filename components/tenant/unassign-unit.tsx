"use client";

import { useState } from "react";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { removeTenant } from "@/lib/actions/tenant-actions";
import { useToast } from "@/hooks/use-toast";

type UnassignUnitProps = {
  tenantId: string;
  unitId: string;
};

export const UnassignUnit = ({ tenantId, unitId }: UnassignUnitProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const { toast } = useToast();
  const handleRemove = async () => {
    try {
      setPending(true);
      const res = await removeTenant(tenantId, unitId);
      const msg = res.success
        ? "Unit has been unassigned"
        : "Failed to unassign unit";
      toast({
        title: msg,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong, try again later",
      });
    } finally {
      setPending(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" disabled={pending}>
          Unassign
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unassign this unit?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the tenant from this unit
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

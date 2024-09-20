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

type UnassignUnitProps = {
  tenantId: string;
  unitId: string;
};

export const UnassignUnit = ({ tenantId, unitId }: UnassignUnitProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const handleRemove = async () => {
    try {
      setPending(true);
      const res = await removeTenant(tenantId, unitId);
      if (res.success) {
        //do something
      } else {
        // do something
      }
    } catch (error) {
      console.log(error);
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

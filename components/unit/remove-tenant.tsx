"use client";

import { IoPersonRemove } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { removeTenant } from "@/lib/actions/tenant-actions";

type RemoveTenantProps = {
  unitId: string;
  tenantId: string;
};

export const RemoveTenant = ({ unitId, tenantId }: RemoveTenantProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleRemoveTenant = async () => {
    try {
      setLoading(true);
      const res = await removeTenant(tenantId, unitId);
    } catch (error) {
      console.log(`Failed to remove tenant: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="zero" variant="dialog" disabled={loading}>
          <IoPersonRemove className="h-8 w-8" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this tenant?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the tenant from this unit.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveTenant}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

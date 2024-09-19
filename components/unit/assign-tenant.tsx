"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { MdOutlineAssignmentInd } from "react-icons/md";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Tenant } from "@prisma/client";
import { assignTenant } from "@/lib/actions/tenant-actions";

type AssignTenantProps = {
  tenants: Tenant[];
  unitId: string;
};

export const AssignTenant = ({ tenants, unitId }: AssignTenantProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = async (tenantId: string) => {
    console.log(tenantId);
    try {
      setLoading(true);
      setOpen(false);
      const res = await assignTenant(tenantId, unitId);
      if (res.success) {
        // do something else
      } else {
        throw new Error(res.message || "Failed to assign tenant");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="zero" variant="dialog" disabled={loading}>
          <MdOutlineAssignmentInd className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <Command>
          <CommandInput placeholder="Select a tenant..." />
          <CommandList>
            <CommandEmpty>No available tenants found</CommandEmpty>
          </CommandList>
          <CommandGroup>
            {tenants.map((tenant) => {
              const fullname = `${tenant.firstName} ${tenant.lastName}`;

              return (
                <CommandItem
                  id={tenant.id}
                  value={fullname}
                  onSelect={() => handleSelect(tenant.id)}
                >
                  {fullname}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
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
import { useToast } from "@/hooks/use-toast";

type AssignTenantProps = {
  tenants: Tenant[];
  unitId: string;
};

export const AssignTenant = ({ tenants, unitId }: AssignTenantProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSelect = async (tenantId: string) => {
    try {
      setLoading(true);
      setOpen(false);
      const res = await assignTenant(tenantId, unitId);
      const msg = res.success
        ? "Tenant has been assigned"
        : "Failed to assign tenant";
      toast({
        title: msg,
      });
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong, try again later" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" disabled={loading}>
          Assign
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <Command>
          <CommandInput placeholder="Select a tenant..." />
          <CommandList>
            <CommandEmpty>No available tenants...</CommandEmpty>
            <CommandGroup>
              {tenants.map((tenant) => {
                const fullname = `${tenant.firstName} ${tenant.lastName}`;

                return (
                  <CommandItem
                    key={tenant.id}
                    id={tenant.id}
                    value={fullname}
                    onSelect={() => handleSelect(tenant.id)}
                  >
                    {fullname}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

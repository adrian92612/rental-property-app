"use client";

import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useRef, useState } from "react";
import { PropertiesIncludeAll } from "@/lib/actions/property-actions";
import { Unit } from "@prisma/client";
import { UnitWithTenant } from "@/lib/actions/unit-actions";
import { assignTenant } from "@/lib/actions/tenant-actions";

type AssignUnitProps = {
  properties: PropertiesIncludeAll[];
  tenantId: string;
};

export const AssignUnit = ({ properties, tenantId }: AssignUnitProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[]>([]);

  const handleSelect = (units: UnitWithTenant[]) => {
    const vacantUnits = units.filter((unit) => unit.tenant === null);
    setUnits(vacantUnits);
    unitPopoverRef.current?.click();
  };

  const handleAssignUnit = async (unitId: string) => {
    try {
      setOpen2(false);
      setLoading(true);
      const res = await assignTenant(tenantId, unitId);
      if (res.success) {
        // do something
      } else {
        // do something
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const unitPopoverRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="sm" className="z-10" disabled={loading}>
            Assign
          </Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <Command>
            <CommandInput placeholder="Search for property..." />
            <CommandList>
              <CommandEmpty>No Property available...</CommandEmpty>
              <CommandGroup>
                {properties.map((prop) => (
                  <CommandItem
                    key={prop.id}
                    value={prop.id}
                    onSelect={() => handleSelect(prop.units)}
                  >
                    {prop.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={open2} onOpenChange={setOpen2}>
        <PopoverTrigger asChild>
          <Button
            ref={unitPopoverRef}
            tabIndex={-1}
            disabled={loading}
            className="absolute border-none shadow-none bg-transparent p-0 z-[-1]"
          ></Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <Command>
            <CommandInput placeholder="Search for unit..." />
            <CommandList>
              <CommandEmpty>No unit available...</CommandEmpty>
              <CommandGroup>
                {units.map((unit) => (
                  <CommandItem
                    key={unit.id}
                    value={unit.id}
                    onSelect={() => handleAssignUnit(unit.id)}
                  >
                    {unit.number}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

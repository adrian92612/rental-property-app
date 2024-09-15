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

type DeleteBtnProps = {
  id: string;
  model: "property" | "unit" | "tenant";
};

export const DeleteBtn = ({ id, model }: DeleteBtnProps) => {
  const [isPending, setIsPending] = useState(false);
  const actions = {
    property: () => deleteProperty(id),
    unit: () => deleteUnit(id),
    tenant: () => deleteTenant(id),
  };

  const handleDelete = async () => {
    try {
      setIsPending(true);
      const res = await actions[model]();
      if (res.success) {
        console.log(res.message);
        // do some toast
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={isPending}>
        <Button variant="dialog" size="zero">
          <RiDeleteBin5Fill />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="center"
        className="popover-content w-fit flex items-center gap-1 bg-primary p-2 text-primary-foreground rounded-full"
      >
        <p className="text-sm">Confirm delete? </p>
        <PopoverClose asChild>
          <Button
            variant="destructive"
            className="p-1 h-5 w-5 rounded-full font-bold"
            onClick={handleDelete}
          >
            <FaCheck />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

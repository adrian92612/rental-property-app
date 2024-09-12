"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UnitsTableInfo } from "@/lib/actions/unit-actions";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { DetailsBtn } from "../details-btn";
import { FormDialog } from "../form-dialog";
import { UnitForm } from "./unit-form";
import { DeleteBtn } from "../delete-btn";

export const unitsColumns: ColumnDef<UnitsTableInfo>[] = [
  {
    accessorKey: "number", // Unit number
    header: ({ column }) => {
      return (
        <Button
          variant="dataHeader"
          size="dataHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.original.number}</span>,
  },
  {
    accessorKey: "property.name", // Property name (Assuming you're fetching the property relation)
    header: ({ column }) => {
      return (
        <Button
          variant="dataHeader"
          size="dataHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Property Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.original.property.name}</span>,
  },
  {
    accessorKey: "tenant", // Tenant status (Vacant/Occupied)
    header: ({ column }) => {
      return (
        <Button
          variant="dataHeader"
          size="dataHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>{row.original.tenant ? "Occupied" : "Vacant"}</span>
    ),
  },
  {
    accessorKey: "dueDate", // Due Date (Optional field)
    header: ({ column }) => {
      return (
        <Button
          variant="dataHeader"
          size="dataHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>{row.original.dueDate ? row.original.dueDate : "No due date"}</span>
    ),
  },
  {
    accessorKey: "rentAmount", // Rent Amount
    header: ({ column }) => {
      return (
        <Button
          variant="dataHeader"
          size="dataHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>${row.original.rentAmount.toFixed(2)}</span>,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <DetailsBtn id={row.original.id} route={"units"} />
        <FormDialog label="Units" isEdit={true}>
          {(closeDialog) => (
            <UnitForm closeDialog={closeDialog} unit={row.original} />
          )}
        </FormDialog>
        <DeleteBtn id={row.original.id} model="unit" />
      </div>
    ),
  },
];

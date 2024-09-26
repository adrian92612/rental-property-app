"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UnitFormData } from "@/lib/actions/unit-actions";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { DetailsBtn } from "../details-btn";
import { FormDialog } from "../form-dialog";
import { DeleteBtn } from "../delete-btn";
import { UnitForm } from "./unit-form";

export const unitsColumns: ColumnDef<UnitFormData>[] = [
  {
    accessorKey: "number", // Unit number
    header: ({ column }) => {
      return (
        <Button
          variant="tableHeader"
          size="none"
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
    accessorKey: "property.name",
    header: ({ column }) => {
      return (
        <Button
          variant="tableHeader"
          size="none"
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
    accessorKey: "dueDate", // Due Date (Optional field)
    header: ({ column }) => {
      return (
        <Button
          variant="tableHeader"
          size="none"
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
    size: 80,
  },
  {
    accessorKey: "rentAmount", // Rent Amount
    header: ({ column }) => {
      return (
        <Button
          variant="tableHeader"
          size="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>${row.original.rentAmount.toFixed(2)}</span>,
    size: 80,
  },
  {
    accessorKey: "tenant", // Tenant status (Vacant/Occupied)
    header: ({ column }) => {
      return (
        <Button
          variant="tableHeader"
          size="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className={row.original.tenant ? "text-red-500" : "text-green-500"}>
        {row.original.tenant ? "Occupied" : "Vacant"}
      </span>
    ),
    size: 50,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <DetailsBtn id={row.original.id} route={"units"} />
        <FormDialog formFor="edit">
          {(closeDialog) => (
            <UnitForm closeDialog={closeDialog} unit={row.original} />
          )}
        </FormDialog>
        <DeleteBtn id={row.original.id} model="unit" />
      </div>
    ),
    size: 50,
  },
];

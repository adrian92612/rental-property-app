"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { DetailsBtn } from "../details-btn";
import { FormDialog } from "../form-dialog";
import { DeleteBtn } from "../delete-btn";
import { TenantForm } from "./tenant-form";
import { Tenant } from "@prisma/client";

export const tenantsColumn: ColumnDef<Tenant>[] = [
  {
    accessorKey: "fullName", // Unit number
    header: ({ column }) => {
      return (
        <Button
          variant="dataHeader"
          size="dataHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>
        {row.original.firstName} {row.original.lastName}
      </span>
    ),
  },
  {
    accessorKey: "email", //
    header: ({ column }) => {
      return (
        <Button
          variant="dataHeader"
          size="dataHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: "phoneNumber", // Due Date (Optional field)
    header: ({ column }) => {
      return (
        <Button
          variant="dataHeader"
          size="dataHeader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.original.phoneNumber}</span>,
  },
  {
    accessorKey: "unitId",
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
      <span className={row.original.unitId ? "text-green-500" : "text-red-500"}>
        {row.original.unitId ? "Assigned" : "Unassigned"}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <DetailsBtn id={row.original.id} route="tenants" />
        <FormDialog formFor="edit">
          {(closeDialog) => (
            <TenantForm closeDialog={closeDialog} tenant={row.original} />
          )}
        </FormDialog>
        <DeleteBtn id={row.original.id} model="tenant" />
      </div>
    ),
    size: 50,
  },
];

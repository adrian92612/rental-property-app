"use client";

import { UnitDetailsInfo } from "@/lib/actions/unit-actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
} from "../ui/card";
import { format } from "date-fns";
import { FormDialog } from "../form-dialog";
import { UnitForm } from "./unit-form";
import { DeleteBtn } from "../delete-btn";

export const UnitDetailsCard = ({ unit }: { unit: UnitDetailsInfo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{unit.number}</CardTitle>
      </CardHeader>
      <CardContent>
        <Content label="Property Name:" value={unit.property.name} />
        <Content label="Address:" value={unit.property.address} />
        <Content
          label="Rent Amount:"
          value={`$${unit.rentAmount.toFixed(2).toString()}`}
        />
        <Content label="Due Date:" value={unit.dueDate?.toString() ?? ""} />
        <Content label="Created At:" value={format(unit.createdAt, "PPP")} />
        <Content label="Updated At:" value={format(unit.updatedAt, "PPP")} />
      </CardContent>
      <CardFooter className="justify-end items-center pb-6">
        <FormDialog formFor="edit" className="text-2xl">
          {(closeDialog) => <UnitForm closeDialog={closeDialog} unit={unit} />}
        </FormDialog>
        <DeleteBtn id={unit.id} model="unit" redirect className="text-2xl" />
      </CardFooter>
    </Card>
  );
};

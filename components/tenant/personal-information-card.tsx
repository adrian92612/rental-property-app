"use client";

import { Tenant } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarFallback } from "@/lib/utils";
import { DeleteBtn } from "../delete-btn";
import { FormDialog } from "../form-dialog";
import { TenantForm } from "./tenant-form";
import { differenceInDays, format } from "date-fns";

type PersonalInformationProps = {
  tenant: Tenant;
};

export const PersonalInformation = ({ tenant }: PersonalInformationProps) => {
  const daysRemaining = differenceInDays(new Date(tenant.leaseEnd), new Date());
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Personal & Lease Information
          </CardTitle>
          <Avatar className="border border-primary">
            <AvatarImage src={tenant?.image || ""} alt="Picture of tenant" />
            <AvatarFallback>
              {getAvatarFallback(tenant.firstName, tenant.lastName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="grid xl:grid-cols-2 gap-2">
        <div>
          <h2 className="font-bold text-lg">- Personal</h2>
          <Content label="First Name:" value={tenant.firstName} />
          <Content label="Last Name:" value={tenant.lastName} />
          <Content label="Email Address:" value={tenant.email} />
          <Content label="Phone Number:" value={tenant.phoneNumber} />
        </div>
        <div>
          <h2 className="font-bold text-lg">- Lease</h2>
          <Content
            label="Terms:"
            value={`${tenant.termInMonths.toString()} months`}
          />
          <Content
            label="Lease Start:"
            value={format(tenant.leaseStart, "PPP")}
          />
          <Content label="Lease End:" value={format(tenant.leaseEnd, "PPP")} />
          <Content
            label="Days Remaining:"
            value={
              daysRemaining > 0
                ? `${daysRemaining} ${daysRemaining === 1 ? "day" : "days"}`
                : "Expired"
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <FormDialog formFor="edit" className="text-2xl">
          {(closeDialog) => (
            <TenantForm closeDialog={closeDialog} tenant={tenant} />
          )}
        </FormDialog>
        <DeleteBtn
          id={tenant.id}
          model="tenant"
          redirect
          className="text-2xl"
        />
      </CardFooter>
    </Card>
  );
};

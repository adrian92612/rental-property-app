import { Tenant } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AssignTenant } from "./assign-tenant";
import { RemoveTenant } from "./remove-tenant";
import { Content } from "../property/properties-card";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type TenantDetailsCardProps = {
  tenant: Tenant | null;
  availableTenants: Tenant[];
  unitId: string;
};

export const TenantDetailsCard = ({
  tenant,
  availableTenants,
  unitId,
}: TenantDetailsCardProps) => {
  const getAvatarFallback = () => {
    return `${tenant?.firstName.slice(0, 1) || ""}${
      tenant?.lastName.slice(0, 1) || ""
    }`;
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Avatar className="border border-primary">
            <AvatarImage src={tenant?.image || ""} alt="Picture of tenant" />
            <AvatarFallback>{getAvatarFallback() || ""}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">Tenant Details</CardTitle>
          {!tenant ? (
            <AssignTenant tenants={availableTenants || []} unitId={unitId} />
          ) : (
            <RemoveTenant tenantId={tenant.id} unitId={unitId} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Content label="First Name: " value={tenant?.firstName || ""} />
        <Content label="Last Name: " value={tenant?.lastName || ""} />
        <Content label="Email Address: " value={tenant?.email || ""} />
        <Content label="Phone Number: " value={tenant?.phoneNumber || ""} />
        <Content
          label="Lease Start: "
          value={tenant?.leaseStart ? format(tenant.leaseStart, "PPP") : ""}
        />
        <Content
          label="Lease End: "
          value={tenant?.leaseEnd ? format(tenant.leaseEnd, "PPP") : ""}
        />
        <Content
          label="Lease Term: "
          value={tenant?.termInMonths ? `${tenant.termInMonths} months` : ""}
        />
      </CardContent>
    </Card>
  );
};

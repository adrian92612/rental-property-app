import { Tenant } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
} from "../ui/card";
import { AssignTenant } from "./assign-tenant";
import { RemoveTenant } from "./remove-tenant";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarFallback } from "@/lib/utils";
import { DetailsBtn } from "../details-btn";

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
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Avatar className="border border-primary">
            <AvatarImage src={tenant?.image || ""} alt="Picture of tenant" />
            <AvatarFallback>
              {getAvatarFallback(
                tenant?.firstName || "",
                tenant?.lastName || ""
              )}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">Tenant Details</CardTitle>
          <div>
            {tenant && (
              <DetailsBtn
                id={tenant.id}
                route={"tenants"}
                className="text-2xl"
              />
            )}
          </div>
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
      <CardFooter className="justify-end pb-6">
        {!tenant ? (
          <AssignTenant tenants={availableTenants || []} unitId={unitId} />
        ) : (
          <RemoveTenant tenantId={tenant.id} unitId={unitId} />
        )}
      </CardFooter>
    </Card>
  );
};

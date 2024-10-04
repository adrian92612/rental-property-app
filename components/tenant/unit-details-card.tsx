import { getUnitDetails } from "@/lib/actions/unit-actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
} from "../ui/card";
import { UnassignUnit } from "./unassign-unit";
import { AssignUnit } from "./assign-unit";
import { PropertiesIncludeAll } from "@/lib/actions/property-actions";
import { DetailsBtn } from "../details-btn";

type UnitDetailsProps = {
  unitId: string | null;
  tenantId: string;
  properties: PropertiesIncludeAll[];
};

export const UnitDetails = async ({
  unitId,
  tenantId,
  properties,
}: UnitDetailsProps) => {
  const unit = await getUnitDetails(unitId || "");

  const getRentAmount = () => {
    return unit?.rentAmount ? `$${unit.rentAmount.toFixed(2)}` : "";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Unit Details</CardTitle>
          {unit && (
            <DetailsBtn id={unit.id} route="units" className="text-2xl" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Content label="Property Name: " value={unit?.property.name || ""} />
        <Content
          label="Property Address: "
          value={unit?.property.address || ""}
        />
        <Content label="Unit Number: " value={unit?.number || ""} />
        <Content label="Rent Amount: " value={getRentAmount()} />
        <Content label="Due Date: " value={unit?.dueDate?.toString() || ""} />
      </CardContent>
      <CardFooter className="flex justify-end pb-6">
        {unit ? (
          <UnassignUnit tenantId={tenantId} unitId={unit.id} />
        ) : (
          <AssignUnit properties={properties} tenantId={tenantId} />
        )}
      </CardFooter>
    </Card>
  );
};

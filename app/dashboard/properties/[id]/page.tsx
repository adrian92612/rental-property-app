import { DataTable } from "@/components/data-table";
import { PropertiesCard } from "@/components/property/properties-card";
import { propertyUnitsColumns } from "@/components/property/property-unit-columns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getProperty } from "@/lib/actions/property-actions";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);

  if (!property) return <div>404 Not Found</div>;

  return (
    <div className="grid lg:grid-cols-2 mt-5 gap-5">
      <Card>
        <CardHeader></CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card>
        <CardHeader></CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
      <div className="lg:col-span-2">
        <DataTable columns={propertyUnitsColumns} data={property.units || []} />
      </div>
    </div>
  );
};

export default PropertyDetailsPage;

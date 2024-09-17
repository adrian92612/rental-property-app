import { DataTable } from "@/components/data-table";
import { DeleteBtn } from "@/components/delete-btn";
import { FormDialog } from "@/components/form-dialog";
import { Header } from "@/components/header";
import { PropertyCard } from "@/components/property/properties-card";
import { PropertyCardImage } from "@/components/property/property-card-image";
import { PropertyForm } from "@/components/property/property-form";
import { propertyUnitsColumns } from "@/components/property/property-unit-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getProperty } from "@/lib/actions/property-actions";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);

  if (!property) return <div>404 Not Found</div>;

  return (
    <>
      <Header headerLabel="Property Details" formComponent="property" />
      <div className="grid place-items-center lg:grid-cols-2 mt-5 gap-5">
        <PropertyCard property={property} />
        <Card className="w-full max-w-xl">
          <CardHeader></CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
        <div className="lg:col-span-2 w-full">
          <DataTable
            columns={propertyUnitsColumns}
            data={property.units || []}
          />
        </div>
      </div>
    </>
  );
};

export default PropertyDetailsPage;

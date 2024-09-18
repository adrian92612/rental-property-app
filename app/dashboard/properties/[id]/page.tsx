import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import { PropertyCard } from "@/components/property/properties-card";
import { IncomeExpenseChart } from "@/components/property/property-charts";
import { propertyUnitsColumns } from "@/components/property/property-unit-columns";
import { getProperty } from "@/lib/actions/property-actions";
import { UnitFormData } from "@/lib/actions/unit-actions";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);

  if (!property) return <div>404 Not Found</div>;

  const getRentalIncome = () =>
    property.units.reduce((total, unit) => total + unit.rentAmount, 0);

  const unitsWithPropertyName: UnitFormData[] = property.units.map((unit) => ({
    ...unit,
    property: {
      name: property.name,
    },
  }));

  return (
    <>
      <Header headerLabel="Property Details" formComponent="property" />
      <div className="grid lg:grid-cols-2 mt-5 gap-5">
        <PropertyCard property={property} />
        <IncomeExpenseChart
          rentalIncome={getRentalIncome()}
          monthlyExpense={property.monthlyExpense}
          mortgage={property.mortgagePayment}
        />

        <div className="lg:col-span-2 w-full">
          <DataTable
            columns={propertyUnitsColumns}
            data={unitsWithPropertyName}
          />
        </div>
      </div>
    </>
  );
};

export default PropertyDetailsPage;

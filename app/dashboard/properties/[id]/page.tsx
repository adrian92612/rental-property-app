import { DataTable } from "@/components/data-table";
import { Documents } from "@/components/documents-card";
import { Header } from "@/components/header";
import { Notes } from "@/components/notes-card";
import { PropertyCard } from "@/components/property/properties-card";
import { IncomeExpenseChart } from "@/components/property/property-charts";
import { propertyUnitsColumns } from "@/components/property/property-unit-columns";
import { getProperty } from "@/lib/actions/property-actions";
import { UnitFormData } from "@/lib/actions/unit-actions";
import ModelNotFound from "../../model-not-found";

const documentList = [
  "Property Deed",
  "Title Report",
  "Mortgage Documents",
  "Property Tax Statements",
  "Insurance Policies",
  "Inspection Reports",
  "Appraisal Reports",
  "Maintenance and Repair Records",
  "Renovation and Improvement Documents",
  "Zoning and Compliance Certificates",
  "Environmental Reports",
  "Certificates of Occupancy",
  "Floor Plans and Blueprints",
  "Utility Bills",
  "Lease Agreements for Units",
  "Rental Income Statements",
  "Property Management Agreements",
  "Licenses and Permits",
];

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);

  if (!property) return <ModelNotFound model="Property" />;

  const rentalIncome = property.units
    .filter((unit) => unit.tenant !== null)
    .reduce((total, unit) => total + unit.rentAmount, 0);

  const unitsWithPropertyName: UnitFormData[] = property.units.map((unit) => ({
    ...unit,
    property: {
      name: property.name,
    },
  }));

  return (
    <>
      <Header headerLabel="Property Details" formComponent="property" />
      <div className="grid justify-items-stretch lg:grid-cols-2 mt-5 gap-5 pb-5">
        <PropertyCard property={property} />
        <IncomeExpenseChart
          rentalIncome={rentalIncome}
          monthlyExpense={property.monthlyExpense}
          mortgage={property.mortgagePayment}
        />

        <Notes
          notes={property.notes || []}
          id={property.id}
          model={"property"}
        />
        <Documents list={documentList} model={"unit"} />
      </div>
      <DataTable columns={propertyUnitsColumns} data={unitsWithPropertyName} />
    </>
  );
};

export default PropertyDetailsPage;

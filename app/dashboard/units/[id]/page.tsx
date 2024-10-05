import { Header } from "@/components/header";
import { Notes } from "@/components/notes-card";
import { Documents } from "@/components/documents-card";
import { TenantDetailsCard } from "@/components/unit/tenant-details-card";
import { UnitDetailsCard } from "@/components/unit/unit-details-card";
import { getTenantsTableInfo } from "@/lib/actions/tenant-actions";
import {
  getPropertyIdsAndNames,
  getUnitDetails,
} from "@/lib/actions/unit-actions";
import ModelNotFound from "../../model-not-found";
import { unitDetailsMetadata } from "@/lib/metadata";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const unit = await getUnitDetails(params.id);
  if (!unit) return unitDetailsMetadata("Property not found");
  return unitDetailsMetadata(unit.number);
};

const documentList = [
  "Lease Agreement",
  "Tenant Application Form",
  "Inspection Report",
  "Payment Receipts",
  "Maintenance Requests",
  "Eviction Notice",
  "Insurance",
  "Utility Bills",
];

const UnitDetailsPage = async ({ params }: { params: { id: string } }) => {
  const [unit, fetchedProperties, tenants] = await Promise.all([
    getUnitDetails(params.id),
    getPropertyIdsAndNames(),
    getTenantsTableInfo(),
  ]);

  const availableTenants = tenants?.filter((tenant) => tenant.unitId === null);

  if (!unit) return <ModelNotFound model="Unit" />;

  return (
    <>
      <Header
        headerLabel="Unit Details"
        formComponent="unit"
        properties={fetchedProperties}
      />
      <div className="grid justify-items-stretch lg:grid-cols-2 mt-5 gap-8">
        <UnitDetailsCard unit={unit} />
        <TenantDetailsCard
          tenant={unit.tenant}
          availableTenants={availableTenants}
          unitId={unit.id}
        />
        <Notes notes={unit.notes} id={unit.id} model="unit" />
        <Documents list={documentList} model="unit" />
      </div>
    </>
  );
};

export default UnitDetailsPage;

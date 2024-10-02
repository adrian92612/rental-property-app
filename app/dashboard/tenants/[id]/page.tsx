import { Documents } from "@/components/documents-card";
import { Header } from "@/components/header";
import { Notes } from "@/components/notes-card";
import { PersonalInformation } from "@/components/tenant/personal-information-card";
import { UnitDetails } from "@/components/tenant/unit-details-card";
import { getProperties } from "@/lib/actions/property-actions";
import { getTenantData } from "@/lib/actions/tenant-actions";

const documentList = [
  "Lease Agreement",
  "Renewal Agreement",
  "Deposit Receipt",
  "Move-in Inspection Report",
  "Move-out Inspection Report",
  "Utility Bills",
  "Rental Payment Receipts",
  "Eviction Notices",
  "Maintenance Requests",
  "Insurance Documents",
  "Termination Notice",
  "ID Verification",
  "Pet Agreement",
  "Tenant’s Background Check",
];

const TenantDetailsPage = async ({ params }: { params: { id: string } }) => {
  const tenant = await getTenantData(params.id);
  const properties = await getProperties();

  if (!tenant) return <div>No Tenant Found</div>;

  return (
    <>
      <Header headerLabel="Tenant Details" formComponent="tenant" />
      <div className="grid justify-items-stretch xl:grid-cols-3 mt-5 gap-8">
        <PersonalInformation tenant={tenant} />
        <UnitDetails
          unitId={tenant.unitId}
          tenantId={tenant.id}
          properties={properties || []}
        />
        <Notes notes={tenant.notes || []} id={tenant.id} model={"tenant"} />
        <Documents list={documentList} model="tenant" />
      </div>
    </>
  );
};

export default TenantDetailsPage;

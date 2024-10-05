import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import { tenantsColumn } from "@/components/tenant/tenant-columns";
import { TenantListInfo } from "@/components/tenant/tenant-list-info";
import { getTenantsTableInfo } from "@/lib/actions/tenant-actions";
import { tenantsMetadata } from "@/lib/metadata";

export const metadata = tenantsMetadata;

const TenantsPage = async () => {
  const tenants = await getTenantsTableInfo();

  return (
    <>
      <Header headerLabel="Tenants" formComponent="tenant" />
      <TenantListInfo tenants={tenants} />
      <DataTable columns={tenantsColumn} data={tenants} />
    </>
  );
};

export default TenantsPage;

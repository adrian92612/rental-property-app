import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import { tenantsColumn } from "@/components/tenant/tenant-columns";
import { getTenantsTableInfo } from "@/lib/actions/tenant-actions";

const TenantsPage = async () => {
  const tenants = await getTenantsTableInfo();
  return (
    <>
      <Header label="Tenants" />
      <DataTable columns={tenantsColumn} data={tenants || []} />
    </>
  );
};

export default TenantsPage;

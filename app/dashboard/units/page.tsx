import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import { unitsColumns } from "@/components/unit/unit-columns";
import { getUnitsTableInfo } from "@/lib/actions/unit-actions";

const UnitsPage = async () => {
  const units = await getUnitsTableInfo();
  return (
    <>
      <Header headerLabel="Units" formComponent="unit" />
      <DataTable columns={unitsColumns} data={units || []} />
    </>
  );
};

export default UnitsPage;

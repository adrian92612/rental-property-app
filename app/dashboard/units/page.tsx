import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import { unitsColumns } from "@/components/unit/unit-columns";
import {
  getPropertyIdsAndNames,
  getUnitsTableInfo,
} from "@/lib/actions/unit-actions";

const UnitsPage = async () => {
  const units = await getUnitsTableInfo();
  const fetchedProperties = await getPropertyIdsAndNames();
  return (
    <>
      <Header
        headerLabel="Units"
        formComponent="unit"
        properties={fetchedProperties || []}
      />
      <DataTable columns={unitsColumns} data={units || []} />
    </>
  );
};

export default UnitsPage;

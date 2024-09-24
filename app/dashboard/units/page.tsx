import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import { unitsColumns } from "@/components/unit/unit-columns";
import { UnitListInfo } from "@/components/unit/unit-list-info";
import {
  getPropertyIdsAndNames,
  getUnitsTableInfo,
} from "@/lib/actions/unit-actions";

const UnitsPage = async () => {
  const [units, fetchedProperties] = await Promise.all([
    getUnitsTableInfo(),
    getPropertyIdsAndNames(),
  ]);

  return (
    <>
      <Header
        headerLabel="Units"
        formComponent="unit"
        properties={fetchedProperties}
      />
      <UnitListInfo units={units} />
      <DataTable columns={unitsColumns} data={units} />
    </>
  );
};

export default UnitsPage;

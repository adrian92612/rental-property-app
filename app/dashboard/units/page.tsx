import { DataTable } from "@/components/data-table";
import { unitsColumns } from "@/components/unit/unit-columns";
import { getUnitsTableInfo } from "@/lib/actions/unit-actions";

const UnitsPage = async () => {
  const units = await getUnitsTableInfo();
  return (
    <div>
      Units Page
      <DataTable columns={unitsColumns} data={units || []} />
    </div>
  );
};

export default UnitsPage;

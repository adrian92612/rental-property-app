import { DataTable } from "@/components/data-table";
import { Header } from "@/components/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { unitsColumns } from "@/components/unit/unit-columns";
import { getUnitsTableInfo } from "@/lib/actions/unit-actions";
import { Fragment } from "react";

const UnitsPage = async () => {
  const units = await getUnitsTableInfo();
  return (
    <>
      <Header label="Units" />
      <DataTable columns={unitsColumns} data={units || []} />
    </>
  );
};

export default UnitsPage;

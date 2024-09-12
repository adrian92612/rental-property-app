import { getUnitsTableInfo } from "@/lib/actions/unit-actions";

const UnitsPage = async () => {
  const units = await getUnitsTableInfo();
  console.log(units);
  return <div>Units Page</div>;
};

export default UnitsPage;

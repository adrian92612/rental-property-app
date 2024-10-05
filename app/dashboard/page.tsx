import { Header } from "@/components/header";
import { HeaderWrapper } from "@/components/header-wrapper";
import { PropertiesInfo } from "@/components/property/property-charts";
import { TenantListInfo } from "@/components/tenant/tenant-list-info";
import { UnitListInfo } from "@/components/unit/unit-list-info";
import { getProperties } from "@/lib/actions/property-actions";
import { getTenantsTableInfo } from "@/lib/actions/tenant-actions";
import { getUnitsTableInfo } from "@/lib/actions/unit-actions";

const OverviewPage = async () => {
  const [properties, units, tenants] = await Promise.all([
    getProperties(),
    getUnitsTableInfo(),
    getTenantsTableInfo(),
  ]);

  return (
    <>
      <Header headerLabel="Overview" formComponent="none" />
      {/* <HeaderWrapper headerLabel="Overview" formComponent="none" /> */}
      <PropertiesInfo properties={properties} />
      <UnitListInfo units={units} />
      <TenantListInfo tenants={tenants} />
    </>
  );
};

export default OverviewPage;

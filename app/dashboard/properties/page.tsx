import {
  getProperties,
  PropertiesIncludeAll,
} from "@/lib/actions/property-actions";
import { Header } from "@/components/header";
import { Properties } from "@/components/property/properties";
import { PropertiesInfo } from "@/components/property/property-charts";
import { propertiesMetadata } from "@/lib/metadata";

export const metadata = propertiesMetadata;

const PropertiesPage = async () => {
  const properties = (await getProperties()) as PropertiesIncludeAll[];

  return (
    <>
      <Header headerLabel="Properties" formComponent="property" />
      <PropertiesInfo properties={properties} />
      <Properties properties={properties} />
    </>
  );
};

export default PropertiesPage;

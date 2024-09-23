import { getProperties } from "@/lib/actions/property-actions";
import { Header } from "@/components/header";
import { Properties } from "@/components/property/properties";

const PropertiesPage = async () => {
  const properties = await getProperties(false);
  return (
    <>
      <Header headerLabel="Properties" formComponent="property" />
      <Properties properties={properties || []} />
    </>
  );
};

export default PropertiesPage;

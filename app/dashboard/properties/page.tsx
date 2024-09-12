import { getProperties } from "@/lib/actions/property-actions";
import { Header } from "@/components/header";
import { PropertiesCard } from "@/components/property/properties-card";

const PropertiesPage = async () => {
  const properties = await getProperties(false);
  return (
    <>
      <Header label="Properties" />
      <section>
        {properties && properties.length && (
          <ul className="grid place-items-center gap-4 lg:grid-cols-2 xl:grid-cols-3 pb-5">
            {properties.map((property) => (
              <li key={property.id} className="w-11/12 max-w-[400px]">
                <PropertiesCard property={property} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default PropertiesPage;

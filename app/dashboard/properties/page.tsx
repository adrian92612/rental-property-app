import { getProperties } from "@/lib/actions/property-actions";
import { Header } from "@/components/header";
import { PropertiesCard } from "@/components/property/properties-card";

const PropertiesPage = async () => {
  const properties = await getProperties(false);
  return (
    <>
      <Header headerLabel="Properties" formComponent="property" />
      <section>
        {properties && properties.length && (
          <ul className="grid justify-items-stretch gap-5 lg:grid-cols-2 xl:grid-cols-3 pb-5">
            {properties.map((property) => (
              <li key={property.id} className="">
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

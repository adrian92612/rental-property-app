import { FormDialog } from "@/components/form-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getProperties } from "@/lib/actions/property-actions";
import { MdDarkMode } from "react-icons/md";
import Image from "next/image";
import { FaLocationDot, FaRegEye } from "react-icons/fa6";
import { Header } from "@/components/header";
import { DeleteBtn } from "@/components/delete-btn";
import { DetailsBtn } from "@/components/details-btn";

const PropertiesPage = async () => {
  const properties = await getProperties();
  return (
    <>
      <Header label="Properties" />
      <div>
        {!!properties.length && (
          <ul className="grid place-items-center gap-4 lg:grid-cols-2 xl:grid-cols-3 pb-5">
            {properties.map((property) => (
              <li key={property.id} className="w-11/12 max-w-[400px]">
                <Card className="rounded-sm">
                  <CardHeader>
                    <div className="relative border rounded-sm w-full h-[250px] flex justify-center items-center overflow-hidden">
                      {property.image ? (
                        <Image
                          src={property.image}
                          alt="Property Image"
                          quality={50}
                          priority={true}
                          style={{
                            objectFit: "cover",
                          }}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <span>{`<No Image Available/>`}</span>
                      )}
                    </div>
                    <h2>{property.name}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="inline-flex items-center gap-2">
                      <FaLocationDot />
                      <span>{property.address}</span>
                    </p>
                    <p>Owner: {property.owner}</p>
                    <p>Contact Information: {property.contactInfo}</p>
                  </CardContent>
                  <CardFooter className="h-22 border-t-2 py-1 flex items-center justify-end gap-1">
                    <DetailsBtn id={property.id} route={"properties"} />
                    <FormDialog label={"Properties"} model={property} />
                    <DeleteBtn id={property.id} model={"property"} />
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default PropertiesPage;

import { FaLocationDot } from "react-icons/fa6";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { DetailsBtn } from "../details-btn";
import { FormDialog } from "../form-dialog";
import { DeleteBtn } from "../delete-btn";
import Image from "next/image";
import { PropertiesIncludeUnits } from "@/lib/actions/property-actions";

export const PropertiesCard = ({
  property,
}: {
  property: PropertiesIncludeUnits;
}) => {
  return (
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
        <h2 className="font-bold">{property.name}</h2>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="inline-flex items-center gap-2">
          <FaLocationDot />
          <span>{property.address}</span>
        </p>
        <p>Owner: {property.owner}</p>
        <p>Contact Information: {property.contactInfo}</p>
        <p>No. of Units: {property.units.length}</p>
      </CardContent>
      <CardFooter className="h-22 border-t-2 py-1 flex items-center justify-end gap-1">
        <DetailsBtn id={property.id} route={"properties"} />
        <FormDialog label={"Properties"} model={property} />
        <DeleteBtn id={property.id} model={"property"} />
      </CardFooter>
    </Card>
  );
};

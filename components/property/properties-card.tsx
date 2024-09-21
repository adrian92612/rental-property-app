"use client";

import { FaLocationDot } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
} from "../ui/card";
import { DetailsBtn } from "../details-btn";
import { FormDialog } from "../form-dialog";
import { DeleteBtn } from "../delete-btn";
import {
  PropertiesIncludeUnits,
  PropertyIncludeAll,
} from "@/lib/actions/property-actions";
import { PropertyForm } from "./property-form";
import { PropertyCardImage } from "./property-card-image";
import { format } from "date-fns";

export const PropertiesCard = ({
  property,
}: {
  property: PropertiesIncludeUnits;
}) => {
  return (
    <Card>
      <CardHeader>
        <PropertyCardImage property={property} />
        <CardTitle className="mt-2">{property.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-primary">
          <FaLocationDot />
          <span>{property.address}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <Content label="Owner:" value={property.owner} />
        <Content label="Contact Info:" value={property.contactInfo} />
        <Content label="Units:" value={property.units.length.toString()} />
      </CardContent>
      <CardFooter className="justify-end gap-1 pb-2">
        <DetailsBtn id={property.id} route={"properties"} />
        <FormDialog formFor="edit">
          {(closeDialog) => (
            <PropertyForm closeDialog={closeDialog} property={property} />
          )}
        </FormDialog>
        <DeleteBtn id={property.id} model={"property"} />
      </CardFooter>
    </Card>
  );
};

export const PropertyCard = ({
  property,
}: {
  property: PropertyIncludeAll;
}) => {
  return (
    <Card>
      <CardHeader>
        <PropertyCardImage property={property} />
        <h2 className="font-bold">{property.name}</h2>
        <div className="flex items-center gap-3">
          <FaLocationDot />
          <span>{property.address}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Content label="Owner:" value={property.owner} />
        <Content label="Contact Info:" value={property.contactInfo} />
        <Content
          label="Purchase Price:"
          value={`$${property.purchasePrice.toFixed(2).toString()}`}
        />
        <Content label="Units:" value={property.units.length.toString()} />
        <Content label="Added On:" value={format(property.createdAt, "PPP")} />
        <Content
          label="Updated On:"
          value={format(property.updatedAt, "PPP")}
        />
      </CardContent>
      <CardFooter className="justify-end gap-1 pb-2">
        <FormDialog formFor="edit">
          {(closeDialog) => (
            <PropertyForm closeDialog={closeDialog} property={property} />
          )}
        </FormDialog>
        <DeleteBtn id={property.id} model={"property"} redirect />
      </CardFooter>
    </Card>
  );
};

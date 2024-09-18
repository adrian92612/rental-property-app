"use client";

import { FaLocationDot } from "react-icons/fa6";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
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

type ContentProps = {
  label: string;
  value: string;
};

export const Content = ({ label, value }: ContentProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="font-bold">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export const PropertiesCard = ({
  property,
}: {
  property: PropertiesIncludeUnits;
}) => {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <PropertyCardImage property={property} />
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
    <Card className="w-full">
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
      <CardFooter className="h-22 flex items-center justify-end gap-1">
        <FormDialog formFor="edit">
          {(closeDialog) => (
            <PropertyForm closeDialog={closeDialog} property={property} />
          )}
        </FormDialog>
        <DeleteBtn id={property.id} model={"property"} redirect={true} />
      </CardFooter>
    </Card>
  );
};

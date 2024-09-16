"use client";

import { FaLocationDot } from "react-icons/fa6";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { DetailsBtn } from "../details-btn";
import { FormDialog } from "../form-dialog";
import { DeleteBtn } from "../delete-btn";
import Image from "next/image";
import {
  PropertiesIncludeUnits,
  updatePropertyImage,
} from "@/lib/actions/property-actions";
import { PropertyForm } from "./property-form";
import { RiImageEditFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { Button } from "../ui/button";

const CardImage = ({ property }: { property: PropertiesIncludeUnits }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    property.image
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      setIsPending(true);
      if (!file) {
        throw new Error("File is missing.");
      }

      const res = await updatePropertyImage(
        property.id,
        file,
        property.imagePublicId ?? ""
      );

      if (res.success) {
        setPreviewImage(res.imageUrl ?? "");
        // do something else
      } else {
        throw new Error(`Failed to update image of ${property.name}`);
      }
    } catch (error) {
      console.error("Failed to update image: ", error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="relative border rounded-sm w-full h-[250px] flex justify-center items-center overflow-hidden">
      {isPending ? (
        <span>Updating image...</span>
      ) : previewImage ? (
        <Image
          src={previewImage}
          alt="Property Image"
          quality={80}
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
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleInputChange}
      />
      <Button
        onClick={handleButtonClick}
        disabled={isPending}
        size="icon"
        className="absolute p-1 top-0 right-0 m-2 backdrop-blur-md bg-primary-foreground rounded-full overflow-hidden text-primary hover:text-cyan-600"
      >
        <RiImageEditFill className="h-8 w-8" />
      </Button>
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
        <CardImage property={property} />
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
        <FormDialog label="Properties" isEdit={true}>
          {(closeDialog) => (
            <PropertyForm closeDialog={closeDialog} property={property} />
          )}
        </FormDialog>
        <DeleteBtn id={property.id} model={"property"} />
      </CardFooter>
    </Card>
  );
};

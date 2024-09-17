"use client";

import { updatePropertyImage } from "@/lib/actions/property-actions";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { RiImageEditFill } from "react-icons/ri";
import { Property } from "@prisma/client";

export const PropertyCardImage = ({ property }: { property: Property }) => {
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
    <div className="relative border rounded-sm w-full h-[300px] flex justify-center items-center overflow-hidden">
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
        className="absolute p-1 top-0 right-0 m-1 backdrop-blur-md bg-primary-foreground rounded-full overflow-hidden text-primary border-2 border-primary hover:text-cyan-600"
      >
        <RiImageEditFill className="h-8 w-8" />
      </Button>
    </div>
  );
};

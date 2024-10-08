"use client";

import { updatePropertyImage } from "@/lib/actions/property-actions";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { RiImageEditFill } from "react-icons/ri";
import { Property } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

export const PropertyCardImage = ({ property }: { property: Property }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    property.image
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      setIsPending(true);
      if (!file) throw new Error("File is missing.");

      const res = await updatePropertyImage(
        property.id,
        file,
        property.imagePublicId ?? ""
      );

      toast({
        title: res.message,
      });

      if (res.success) {
        setPreviewImage(res.imageUrl ?? "");
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
        variant="ghost"
        className="absolute top-0 h-7 w-7 border right-0 m-1.5 bg-primary-foreground overflow-hidden text-primary text-2xl"
      >
        <RiImageEditFill />
      </Button>
    </div>
  );
};

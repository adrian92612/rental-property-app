"use client";

import { getAvatarFallback } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserPersonalInfoProps } from "./user-personal-info";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateUserImage } from "@/lib/actions/actions";
import { Button } from "../ui/button";

export const UserAvatar = ({ user }: UserPersonalInfoProps) => {
  const [avatar, setAvatar] = useState<string | null>(user.image);
  const [pending, setPending] = useState<boolean>(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => fileInputRef.current?.click();
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setPending(true);
      const file = e.target.files?.[0];
      if (!file) throw new Error("File is missing");

      const res = await updateUserImage(
        user.id,
        file,
        user.imagePublicId ?? ""
      );
      toast({
        title: res.message,
      });

      if (res.success) {
        setAvatar(res.imageUrl ?? "");
      } else {
        throw new Error("Failed to update user avatar");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={avatar ?? ""} alt="Picture of user" />
        <AvatarFallback>
          {getAvatarFallback(user?.firstName || "", user?.lastName || "")}
        </AvatarFallback>
      </Avatar>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick} disabled={pending} size="sm">
        {pending ? "Updating..." : "Change Avatar"}
      </Button>
    </div>
  );
};

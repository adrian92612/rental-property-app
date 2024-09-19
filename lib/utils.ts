import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const getAvatarFallback = (fName: string, lName: string) => {
  return `${fName.slice(0, 1) || ""}${lName.slice(0, 1) || ""}`;
};

import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { error } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const getAvatarFallback = (fName: string, lName: string) => {
  return `${fName.slice(0, 1) || ""}${lName.slice(0, 1) || ""}`;
};

export const handlePrismaError = (error: unknown): string | null => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientInitializationError
  ) {
    return "Database error occured, try again later";
  }

  return null;
};

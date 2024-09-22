import Link from "next/link";
import { Button } from "./ui/button";
import { CgDetailsMore } from "react-icons/cg";
import { cn } from "@/lib/utils";

type DetailsBtnProps = {
  id: string;
  route: "properties" | "units" | "tenants";
  className?: string;
};

export const DetailsBtn = ({ id, route, className }: DetailsBtnProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn("text-xl", className)}
    >
      <Link href={`/dashboard/${route}/${id}`}>
        <CgDetailsMore />
      </Link>
    </Button>
  );
};

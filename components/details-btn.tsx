import Link from "next/link";
import { Button } from "./ui/button";
import { FaRegEye } from "react-icons/fa";

type DetailsBtnProps = {
  id: string;
  route: "properties" | "units" | "tenants";
};

export const DetailsBtn = ({ id, route }: DetailsBtnProps) => {
  return (
    <Button asChild variant="dialog" size="zero">
      <Link href={`/dashboard/${route}/${id}`}>
        <FaRegEye />
      </Link>
    </Button>
  );
};

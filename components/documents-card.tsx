import { FaFileDownload } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Document = ({ label }: { label: string }) => {
  return (
    <div className="flex gap-1 items-center w-full">
      {label}
      <Button
        size="zero"
        className="bg-transparent text-primary shadow-none h-5 w-5 hover:text-primary-foreground"
      >
        <FaFileDownload />
      </Button>
    </div>
  );
};

type DocumentsProps = {
  list: string[];
  model: "unit" | "tenant";
};

export const Documents = ({ list, model }: DocumentsProps) => {
  return (
    <Card className={cn(model === "unit" ? "lg:col-span-2" : "xl:col-span-3")}>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-2">
          {list.map((doc, i) => (
            <Document key={i} label={doc} />
          ))}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

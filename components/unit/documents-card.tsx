import { FaFileDownload } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

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

const documentList = [
  "Lease Agreement",
  "Tenant Application Form",
  "Inspection Report",
  "Payment Receipts",
  "Maintenance Requests",
  "Eviction Notice",
  "Insurance",
  "Utility Bills",
];

export const Documents = () => {
  return (
    <Card className="w-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid place-items-end md:grid-cols-2 lg:grid-cols-3 gap-2">
          {documentList.map((doc, i) => (
            <Document key={i} label={doc} />
          ))}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

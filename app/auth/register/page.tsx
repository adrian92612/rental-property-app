import { RegistrationForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerMetadata } from "@/lib/metadata";
import Link from "next/link";
import { BsFillBuildingsFill } from "react-icons/bs";

export const metadata = registerMetadata;

const RegisterPage = () => {
  return (
    <Card className="w-11/12 max-w-[350px] rounded-sm text-xl bg-slate-200 dark:text-primary-foreground">
      <CardHeader className="font-bold text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          Rental Property App <BsFillBuildingsFill />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RegistrationForm />
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="link"
          size="sm"
          className="w-full text-primary-foreground"
        >
          <Link href="/auth/login">Already have an account? Login here</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;

import { LoginForm } from "@/components/auth/login-form";
import { LoginSocialForm } from "@/components/auth/login-social-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginMetadata } from "@/lib/metadata";
import Link from "next/link";
import { BsFillBuildingsFill } from "react-icons/bs";

export const metadata = loginMetadata;

const LoginPage = () => {
  return (
    <Card className="w-11/12 max-w-[350px] rounded-sm bg-slate-100 dark:text-primary-foreground">
      <CardHeader className="font-bold text-center text-xl">
        <CardTitle className="flex items-center justify-center gap-2">
          Rental Property App <BsFillBuildingsFill />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <LoginForm />
        <div className="flex justify-center items-center gap-2">
          <div className="flex-grow bg-gray-200 h-px"></div>
          <span>or</span>
          <div className="flex-grow bg-gray-200 h-px"></div>
        </div>
        <LoginSocialForm />
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="link"
          size="sm"
          className="w-full dark:text-primary-foreground"
        >
          <Link href="/auth/register">
            Don&apos;t have an account? Register here
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;

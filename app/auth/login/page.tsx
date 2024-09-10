import { LoginForm } from "@/components/auth/login-form";
import { LoginSocialForm } from "@/components/auth/login-social-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Card className="w-11/12 max-w-[350px] rounded-sm">
      <CardHeader className="font-bold text-center">
        Rental Property App
      </CardHeader>
      <CardContent>
        <LoginForm />
        <div className="flex justify-center items-center gap-2">
          <div className="flex-grow bg-gray-200 h-px"></div>
          <span>or</span>
          <div className="flex-grow bg-gray-200 h-px"></div>
        </div>
        <LoginSocialForm />
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" size="sm" className="w-full">
          <Link href="/auth/register">
            Don&apos;t have an account? Register here
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;

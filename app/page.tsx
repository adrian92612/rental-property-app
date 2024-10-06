import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BsFillBuildingsFill } from "react-icons/bs";

export default async function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-slate-500 to-slate-800">
      <Card className="bg-transparent border-none">
        <CardHeader>
          <CardTitle className="font-bold text-5xl text-primary-foreground dark:text-primary flex flex-col items-center gap-2">
            <BsFillBuildingsFill /> Rental Property Dashboard
          </CardTitle>
          <CardDescription className="text-muted dark:text-muted-foreground">
            Manage your properties with ease
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-end pb-5">
          <Button variant="secondary" className="font-bold" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

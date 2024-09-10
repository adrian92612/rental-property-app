import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-slate-500 to-slate-800">
      <div>
        <h1>Rental Property App</h1>
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </main>
  );
}

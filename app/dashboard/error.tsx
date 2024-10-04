"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg mb-4">
        {process.env.NODE_ENV === "development"
          ? `Error: ${error.message}`
          : "An unexpected error occurred. Please try again later."}
      </p>
      <Button>Try again</Button>
    </div>
  );
}

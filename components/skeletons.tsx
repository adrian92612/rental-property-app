import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const ChartSkeleton = () => {
  return (
    <section className="mb-8 grid lg:grid-cols-2 gap-5 justify-items-stretch">
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-1/2 rounded-sm" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-96 rounded-sm" />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <Skeleton className="h-5 w-full rounded-sm" />
          <Skeleton className="h-5 w-3/4 rounded-sm" />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-1/2 rounded-sm" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-96 rounded-sm" />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <Skeleton className="h-5 w-full rounded-sm" />
          <Skeleton className="h-5 w-3/4 rounded-sm" />
        </CardFooter>
      </Card>
    </section>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="sticky top-0 flex items-center justify-between px-5 py-2 backdrop-blur-md z-10 dark:text-primary">
      <Skeleton className="w-10 h-9 rounded-md" />
      <Skeleton className="w-48 h-9 rounded-sm" />
      <Skeleton className="w-10 h-9 rounded-md" />
    </div>
  );
};

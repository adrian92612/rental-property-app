import { ChartSkeleton, HeaderSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <HeaderSkeleton noForm />
      <ChartSkeleton />
      <ChartSkeleton />
      <ChartSkeleton />
    </>
  );
}

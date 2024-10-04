import {
  ChartSkeleton,
  HeaderSkeleton,
  PropertiesSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <ChartSkeleton />
      <PropertiesSkeleton />
    </>
  );
}

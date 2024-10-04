import {
  ChartSkeleton,
  HeaderSkeleton,
  TableSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <ChartSkeleton />
      <TableSkeleton />
    </>
  );
}

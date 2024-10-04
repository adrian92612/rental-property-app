import { Documents } from "@/components/documents-card";
import {
  ChartCardSkeleton,
  DocumentsSkeleton,
  HeaderSkeleton,
  NotesSkeleton,
  PropertyCardSkeleton,
  PropertyUnitsTableSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <div className="grid justify-items-stretch lg:grid-cols-2 mt-5 gap-5 pb-5">
        <PropertyCardSkeleton />
        <ChartCardSkeleton />
        <NotesSkeleton />
        <DocumentsSkeleton />
      </div>
      <PropertyUnitsTableSkeleton />
    </>
  );
}

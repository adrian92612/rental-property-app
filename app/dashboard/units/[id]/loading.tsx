import {
  DocumentsSkeleton,
  HeaderSkeleton,
  NotesSkeleton,
  TenantDetailsCardSkeleton,
  UnitDetailsCardSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <div className="grid justify-items-stretch lg:grid-cols-2 mt-5 gap-8">
        <UnitDetailsCardSkeleton />
        <TenantDetailsCardSkeleton />
        <NotesSkeleton />
        <DocumentsSkeleton forUnit listLength={8} />
      </div>
    </>
  );
}

import {
  DocumentsSkeleton,
  HeaderSkeleton,
  NotesSkeleton,
  PersonalInformationSkeleton,
  UnitDetailsCardSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <div className="grid justify-items-stretch xl:grid-cols-3 mt-5 gap-8">
        <PersonalInformationSkeleton />
        <UnitDetailsCardSkeleton />
        <NotesSkeleton forTenant />
        <DocumentsSkeleton listLength={14} />
      </div>
    </>
  );
}

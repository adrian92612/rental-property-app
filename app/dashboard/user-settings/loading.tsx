import {
  BillingPaymentSkeleton,
  HeaderSkeleton,
  NotificationPreferencesSkeleton,
  UserPasswordSkeleton,
  UserPersonalInfoSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <HeaderSkeleton noForm />
      <div className="grid gap-5 lg:grid-cols-2">
        <UserPersonalInfoSkeleton />
        <UserPasswordSkeleton />
        <NotificationPreferencesSkeleton />
        <BillingPaymentSkeleton />
      </div>
    </>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type ContentLabelSkeletonProps = {
  height?: number;
};

const ContentLabelSkeleton = ({ height = 4 }: ContentLabelSkeletonProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Skeleton className={`h-${height} w-14`} />
      <Skeleton className={`h-${height} w-1/2`} />
    </div>
  );
};

export const ChartCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-96" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </CardFooter>
    </Card>
  );
};

export const ChartSkeleton = () => {
  return (
    <section className="mb-8 grid lg:grid-cols-2 gap-5 justify-items-stretch">
      <ChartCardSkeleton />
      <ChartCardSkeleton />
    </section>
  );
};

type HeaderSkeletonProps = {
  noForm?: boolean;
};

export const HeaderSkeleton = ({ noForm }: HeaderSkeletonProps) => {
  return (
    <div>
      <div className="sticky top-0 flex items-center justify-between px-5 py-2 backdrop-blur-md z-10 dark:text-primary">
        {noForm ? (
          <div className="w-10 h-9"></div>
        ) : (
          <Skeleton className="w-10 h-9" />
        )}
        <Skeleton className="w-48 h-9" />
        <Skeleton className="w-10 h-9 " />
      </div>
    </div>
  );
};

export const PropertiesSkeleton = () => {
  return (
    <section className="space-y-5 mt-5">
      <div className="flex items-center justify-end gap-2">
        <div className="w-40 h-9 flex items-center justify-center border">
          <Skeleton className="w-32 h-[14px]" />
        </div>
        <div className="max-w-52 w-full h-9 border-b flex items-center pl-2">
          <Skeleton className="max-w-32 w-full h-4" />
        </div>
      </div>
      <div className="grid justify-items-stretch gap-5 lg:grid-cols-2 xl:grid-cols-3 pb-5">
        <PropertiesCardSkeleton />
        <PropertiesCardSkeleton />
        <PropertiesCardSkeleton />
      </div>
    </section>
  );
};

export const PropertiesCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="mb-4 gap-2">
        <Skeleton className="w-full h-[300px]" />
        <Skeleton className="mt-2 w-1/2 h-5" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-3/4 h-3" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
      </CardContent>
      <CardFooter className="justify-end gap-1 pb-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </CardFooter>
    </Card>
  );
};

export const PropertyCardSkeleton = () => {
  return (
    <Card className="min-h-[580px]">
      <CardHeader className="mb-4 gap-2">
        <Skeleton className="w-full h-[300px]" />
        <Skeleton className="w-1/2 h-5" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-3/4 h-3" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
      </CardContent>
      <CardFooter className="justify-end gap-1 pb-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </CardFooter>
    </Card>
  );
};

type NotesSkeletonProps = {
  forTenant?: boolean;
};

export const NotesSkeleton = ({ forTenant }: NotesSkeletonProps) => {
  return (
    <Card className={cn(forTenant ? "xl:col-span-3" : "lg:col-span-2")}>
      <CardHeader>
        <Skeleton className="w-16 h-5" />
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-5 pb-6">
        <div>
          <div className="border w-full h-52 rounded-sm"></div>
          <div className="flex justify-end mt-2">
            <Skeleton className="w-20 h-8" />
          </div>
        </div>
        <div className="border w-full h-52 rounded-sm"></div>
      </CardContent>
    </Card>
  );
};

type DocumentsSkeletonProps = {
  forUnit?: boolean;
  listLength: number;
};

export const DocumentsSkeleton = ({
  forUnit,
  listLength,
}: DocumentsSkeletonProps) => {
  return (
    <Card className={cn(forUnit ? "lg:col-span-2" : "xl:col-span-3")}>
      <CardHeader>
        <Skeleton className="w-20 h-5" />
      </CardHeader>
      <CardContent className="pb-6">
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-2">
          {Array.from({ length: listLength }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-3/4" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-sm border shadow-lg bg-card">
        <div className="min-h-[570px] w-full">
          <Skeleton className="w-full h-10 rounded-none" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="border-b-2 w-full max-w-52 h-9 shadow-lg"></div>
        <Skeleton className="w-14 h-9 ml-auto" />
        <Skeleton className="w-9 h-8" />
        <Skeleton className="w-14 h-9" />
      </div>
    </div>
  );
};

export const UnitDetailsCardSkeleton = () => {
  return (
    <Card className="min-h-64">
      <CardHeader>
        <Skeleton className="h-5 w-24" />
      </CardHeader>
      <CardContent className="space-y-2">
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
      </CardContent>
      <CardFooter className="justify-end items-center gap-1 pb-6">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
      </CardFooter>
    </Card>
  );
};

export const TenantDetailsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-9 h-9" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
      </CardContent>
      <CardFooter className="justify-end pb-6">
        <Skeleton className="w-16 h-8" />
      </CardFooter>
    </Card>
  );
};

export const PersonalInformationSkeleton = () => {
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="max-w-52 w-full h-5" />
          <Skeleton className="w-9 h-9 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="grid xl:grid-cols-2 gap-2">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <ContentLabelSkeleton />
          <ContentLabelSkeleton />
          <ContentLabelSkeleton />
          <ContentLabelSkeleton />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <ContentLabelSkeleton />
          <ContentLabelSkeleton />
          <ContentLabelSkeleton />
          <ContentLabelSkeleton />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pb-6 gap-1">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
      </CardFooter>
    </Card>
  );
};

export const UnitDetailsSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="max-w-52 w-full h-5" />
          <Skeleton className="w-9 h-9" />
        </div>
      </CardHeader>
      <CardContent>
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
        <ContentLabelSkeleton />
      </CardContent>
      <CardFooter className="flex justify-end pb-6">
        <Skeleton className="w-16 h-8" />
      </CardFooter>
    </Card>
  );
};

export const UserPersonalInfoSkeleton = () => {
  return (
    <Card className="lg:col-span-2 min-h-[358px]">
      <CardHeader>
        <Skeleton className="w-40 h-5" />
      </CardHeader>
      <CardContent className="space-y-5 pb-6">
        <div className="space-y-2">
          <Skeleton className="w-28 h-7" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-28 h-8" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="w-40 h-7" />
          <ContentLabelSkeleton height={5} />
          <ContentLabelSkeleton height={5} />
          <ContentLabelSkeleton height={5} />
          <div className="flex justify-end items-center">
            <Skeleton className="w-12 h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const UserPasswordSkeleton = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <Skeleton className="w-40 h-5" />
      </CardHeader>
      <CardContent className="pb-6">
        <Skeleton className="w-32 h-8" />
      </CardContent>
    </Card>
  );
};

const SwitchSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="w-14 h-5" />
      <Skeleton className="w-9 h-5" />
    </div>
  );
};

export const NotificationPreferencesSkeleton = () => {
  return (
    <Card className="min-h-[422px]">
      <CardHeader>
        <Skeleton className="w-52 h-5" />
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-2 mb-5">
          <Skeleton className="w-3/4 h-7" />
          <SwitchSkeleton />
          <SwitchSkeleton />
          <SwitchSkeleton />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-3/4 h-7" />
          <SwitchSkeleton />
          <SwitchSkeleton />
          <SwitchSkeleton />
          <SwitchSkeleton />
          <SwitchSkeleton />
          <SwitchSkeleton />
        </div>
      </CardContent>
    </Card>
  );
};

export const BillingPaymentSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-52 h-5" />
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <Skeleton className="w-1/2 h-7 mb-2" />

          <div className="grid md:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-9" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="w-1/4 h-7 mb-2" />
          <Skeleton className="w-full h-14" />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <ContentLabelSkeleton height={7} />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-5">
        <div className="w-full flex items-center justify-around">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-40 h-6" />
        </div>
      </CardFooter>
    </Card>
  );
};

"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Tenant } from "@prisma/client";
import { z } from "zod";
import { TenantSchema } from "@/lib/zod-schemas/tenant";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { upsertTenant } from "@/lib/actions/tenant-actions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { addMonths, format } from "date-fns";

type TenantFormProps = {
  closeDialog: () => void;
  tenant?: Tenant;
};

export const TenantForm = ({ closeDialog, tenant }: TenantFormProps) => {
  const [state, action, isPending] = useActionState(upsertTenant, {
    message: "",
  });
  const form = useForm<z.output<typeof TenantSchema>>({
    resolver: zodResolver(TenantSchema),
    defaultValues: {
      firstName: tenant?.firstName ?? "",
      lastName: tenant?.lastName ?? "",
      email: tenant?.email ?? "",
      phoneNumber: tenant?.phoneNumber ?? "",
      termInMonths: tenant?.termInMonths ?? 1,
      leaseStart: tenant?.leaseStart,
      leaseEnd: tenant?.leaseEnd,
      ...(state?.fields ?? {}),
    },
  });

  const { watch, setValue } = form;
  const leaseStart = watch("leaseStart");
  const termInMonths = watch("termInMonths");

  useEffect(() => {
    if (leaseStart && termInMonths) {
      const calculatedLeaseEnd = addMonths(
        leaseStart,
        Number(termInMonths) || 0
      );
      setValue("leaseEnd", calculatedLeaseEnd);
    }
  }, [leaseStart, termInMonths, setValue]);

  const formRef = useRef<HTMLFormElement>(null);

  if (state.success) closeDialog();

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={action}
        onSubmit={(e) => {
          e.preventDefault();
          return form.handleSubmit(() => {
            action(new FormData(formRef.current!));
          })(e);
        }}
        className="space-y-1"
      >
        {tenant && (
          <>
            <input type="hidden" name="tenantId" value={tenant.id} />
            <input
              type="hidden"
              name="unitId"
              value={tenant.unitId ?? undefined}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">First Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Last Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="john.doe@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Phone Number</FormLabel>
              <FormControl>
                <Input {...field} type="tel" placeholder="123456789" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termInMonths"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Term in Months</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaseStart"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Lease Start</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
              <input
                type="hidden"
                name={field.name}
                value={field.value?.toISOString()}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaseEnd"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Lease End</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  readOnly
                  value={field.value ? format(field.value, "PPP") : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="sm"
          variant="secondary"
          className="w-full font-bold text-lg"
          disabled={isPending}
        >
          {isPending
            ? !!tenant
              ? "Updating..."
              : "Adding..."
            : !!tenant
            ? "Update"
            : "Add"}
        </Button>
      </form>
    </Form>
  );
};

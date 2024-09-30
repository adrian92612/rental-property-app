"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { upsertProperty } from "@/lib/actions/property-actions";
import { AddPropertySchema } from "@/lib/zod-schemas/property";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Property } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

type PropertyFormProps = {
  closeDialog: () => void;
  property?: Property;
};

export const PropertyForm = ({ closeDialog, property }: PropertyFormProps) => {
  const [state, action, isPending] = useActionState(upsertProperty, {
    success: false,
    message: "",
  });
  const [toastShown, setToastShown] = useState<boolean>(false);

  const form = useForm<z.output<typeof AddPropertySchema>>({
    resolver: zodResolver(AddPropertySchema),
    mode: "onBlur",
    defaultValues: {
      name: property?.name,
      address: property?.address,
      units: 1,
      owner: property?.owner,
      contactInfo: property?.contactInfo,
      purchasePrice: property?.purchasePrice || undefined,
      monthlyExpense: property?.monthlyExpense || undefined,
      mortgagePayment: property?.mortgagePayment || undefined,
      ...(state?.fields ?? {}),
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleStateChange = useCallback(() => {
    if (state.success) closeDialog();
    if (state.message && !toastShown) {
      toast({
        title: state.message,
      });
      setToastShown(true);
    }
  }, [state, toast, closeDialog, toastShown]);

  useEffect(() => {
    handleStateChange();
  }, [handleStateChange]);

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
      >
        {state.message && <span>{state.message}</span>}
        <input type="hidden" name="propertyId" value={property?.id} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Prima Tower" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="0521 Perpetual St." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Owner's Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Contact Information</FormLabel>
              <FormControl>
                <Input {...field} placeholder="email or number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Purchase Price</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyExpense"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Monthly Expenses</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mortgagePayment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Mortgage Payment</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!property && (
          <>
            <FormField
              control={form.control}
              name="units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Number of Units</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={1} step={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Image</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      accept="image/*"
                      className="file:bg-primary-foreground file:rounded-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          type="submit"
          size="sm"
          className="rounded-sm font-bold mt-4 px-10 w-full"
          disabled={isPending}
        >
          {isPending
            ? !!property
              ? "Updating Property..."
              : "Adding Property..."
            : !!property
            ? "Update Property"
            : "Add Property"}
        </Button>
      </form>
    </Form>
  );
};

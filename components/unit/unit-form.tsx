"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UnitSchema } from "@/lib/zod-schemas/unit";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import {
  getPropertyIdsAndNames,
  UnitIncludeTenant,
  UnitsTableInfo,
  upsertUnit,
} from "@/lib/actions/unit-actions";

type UnitFormProps = {
  closeDialog: () => void;
  unit?: UnitIncludeTenant | UnitsTableInfo;
};

export const UnitForm = ({ closeDialog, unit }: UnitFormProps) => {
  const [properties, setProperties] = useState<
    { id: string; name: string }[] | null
  >([]);

  const [state, action, isPending] = useActionState(upsertUnit, {
    message: "",
  });

  const form = useForm<z.output<typeof UnitSchema>>({
    resolver: zodResolver(UnitSchema),
    defaultValues: {
      number: unit?.number ?? "",
      rentAmount: unit?.rentAmount ?? 0,
      dueDate: unit?.dueDate ?? 1,
      ...(state?.fields ?? {}),
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Fetch properties when component is mounted
    const fetchProperties = async () => {
      const fetchedProperties = await getPropertyIdsAndNames();
      setProperties(fetchedProperties);
    };

    fetchProperties();
  }, []);

  console.log(state);

  if (state.success) closeDialog();

  if (!properties) {
    return <h2>No Properties available</h2>;
  }

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
        {state.message && <span>{state.message}</span>}
        {unit && <input type="hidden" name="unitId" value={unit.id} />}

        {unit ? (
          <FormField
            control={form.control}
            name="propertyId"
            defaultValue={unit.propertyId}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-primary border p-2 max-h-52 overflow-y-auto">
                    <SelectItem value={unit.propertyId}>
                      {unit.property.name}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="propertyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-primary border p-2 max-h-52 overflow-y-auto">
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Unit Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Unit XX" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Rent Amount</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Due Date</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={1} max={31} step={1} />
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
            ? !!unit
              ? "Updating..."
              : "Adding..."
            : !!unit
            ? "Update"
            : "Add"}
        </Button>
      </form>
    </Form>
  );
};

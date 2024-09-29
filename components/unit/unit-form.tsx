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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UnitSchema } from "@/lib/zod-schemas/unit";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { UnitFormData, upsertUnit } from "@/lib/actions/unit-actions";
import { useToast } from "@/hooks/use-toast";

type UnitFormProps = {
  closeDialog: () => void;
  unit?: UnitFormData;
  properties?: { id: string; name: string }[];
};

export const UnitForm = ({ closeDialog, unit, properties }: UnitFormProps) => {
  const [state, action, isPending] = useActionState(upsertUnit, {
    message: "",
  });

  const form = useForm<z.output<typeof UnitSchema>>({
    resolver: zodResolver(UnitSchema),
    defaultValues: {
      number: unit?.number,
      rentAmount: unit?.rentAmount ?? 0,
      dueDate: unit?.dueDate ?? 1,
      ...(state?.fields ?? {}),
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: `Unit has been succesfully ${unit ? "updated" : "added"}`,
      });
      state.success = false;
      closeDialog();
    }
  }, [state.success, toast, unit, closeDialog]);

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
        {unit && (
          <>
            <input type="hidden" name="unitId" value={unit.id} />
            <input type="hidden" name="tenantId" value={unit.tenant?.id} />
          </>
        )}

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
                  <SelectContent className="border p-2 max-h-52 overflow-y-auto">
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
                  <SelectContent className="border p-2 overflow-y-auto">
                    {properties?.map((property) => (
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
          defaultValue={unit?.number}
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
                <Input {...field} type="number" />
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
                <Input {...field} type="number" step={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="sm"
          className="w-full mt-4 font-bold "
          disabled={isPending}
        >
          {isPending
            ? !!unit
              ? "Updating Unit..."
              : "Adding Unit..."
            : !!unit
            ? "Update Unit"
            : "Add Unit"}
        </Button>
      </form>
    </Form>
  );
};

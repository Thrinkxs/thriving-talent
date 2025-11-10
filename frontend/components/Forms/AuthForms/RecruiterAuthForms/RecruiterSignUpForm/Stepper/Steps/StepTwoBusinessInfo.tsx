"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function StepTwoBusinessInfo({ nextStep, prevStep }: any) {
  const { control } = useFormContext();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-center">Business Info</h2>

      <FormField
        name="roleInOrganization"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Role</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Your role in the organization"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="numberOfEmployees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Employees</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Number of employees in the organization"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
                // {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="address"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Address</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Business Address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import {
  businessIndustries,
  businessSectors,
  employeeSizes,
} from "@/lib/recruiterOnboardingData";

export default function StepTwoBusinessInfo({ nextStep, prevStep }: any) {
  const { control } = useFormContext();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-center">Business Info</h2>

      <FormField
        name="businessRole"
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
        name="employees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Employees</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="md:h-12 w-full rounded text-gray-500">
                  <SelectValue placeholder="How many employees do you have?" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectGroup>
                    <SelectLabel>Business Sector</SelectLabel>
                    {employeeSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="businessAddress"
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

"use client";
import { Form, useFormContext } from "react-hook-form";
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
import {
  businessIndustries,
  businessSectors,
} from "@/lib/recruiterOnboardingData";

export default function StepOneBusinessDetails({
  nextStep,
}: {
  nextStep: () => void;
}) {
  const { control } = useFormContext();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-center">Business Details</h2>

      <FormField
        name="fullName"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Full Name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="companyName"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Business Name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="email"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Email</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Company Email"
                type="email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="registrationNumber"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Registration Number</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Business Registration Number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sector"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Sector</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="md:h-12 w-full rounded text-gray-500">
                  <SelectValue placeholder="Select your business sector" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectGroup>
                    <SelectLabel>Business Sector</SelectLabel>
                    {businessSectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
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
        control={control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Industry</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="md:h-12 w-full rounded text-gray-500">
                  <SelectValue placeholder="Select your business industry" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectGroup>
                    <SelectLabel>Business Industry</SelectLabel>
                    {businessIndustries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
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
    </div>
  );
}

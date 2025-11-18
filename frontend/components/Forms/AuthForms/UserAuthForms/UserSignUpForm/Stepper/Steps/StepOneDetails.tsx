
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

export default function StepOneDetails({ nextStep }: { nextStep: () => void }) {
  const { control } = useFormContext();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-center">
        Personal Information
      </h2>

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
        name="email"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Email"
                type="email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="phone"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                className="rounded text-gray-500"
                placeholder="Phone Number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="birthday"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <DatePicker
                value={field.value || null}
                onChange={field.onChange}
                label="When's your birthday?"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sex</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="md:h-12 w-full rounded text-gray-500">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectGroup>
                    <SelectLabel>Sex</SelectLabel>
                    <SelectItem value="Male">
                      <div className="flex gap-2">
                        <div> Male</div>{" "}
                      </div>
                    </SelectItem>

                    <SelectItem value="Female">
                      <div className="flex gap-2">
                        <div> Female</div>{" "}
                      </div>
                    </SelectItem>
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

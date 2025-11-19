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
import "@/components/SearchBar/google-autocomplete.css";
import {
  useJsApiLoader,
  Autocomplete,
  LoadScriptProps,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { SOUTH_AFRICAN_CITIES } from "@/utils/data";
import { ChevronDown } from "lucide-react";

const googleMapsLibraries: LoadScriptProps["libraries"] = ["places"];

export default function StepOneDetails() {
  const { control, setValue, watch } = useFormContext();
  const addressValue = watch("address"); // Watch the form value

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
    libraries: googleMapsLibraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const address = place.formatted_address || place.name || "";

      // Update the form value directly using react-hook-form
      setValue("address", address, {
        shouldValidate: true, // Trigger validation
        shouldDirty: true, // Mark field as dirty
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update form value on manual input as well
    setValue("address", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  if (!isLoaded)
    return (
      <div>
        <TbLoader2 className="animate-spin text-thrive-blue" />
      </div>
    );

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
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-black">Location</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 border border-gray-300 text-black px-4 py-3 text-base focus:ring-0 focus:border-thrive-blue">
                  <SelectValue
                    placeholder="Select your city"
                    className="text-gray-500 placeholder:text-gray-500"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  {SOUTH_AFRICAN_CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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

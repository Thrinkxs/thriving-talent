"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

export default function StepThreePassword() {
  const { control } = useFormContext();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-center">Set Your Password</h2>
      <FormField
        name="password"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel> Password </FormLabel>
            <FormControl>
              <PasswordInput placeholder="Password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput placeholder="Confirm Password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

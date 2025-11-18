"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordFormSchema } from "@/lib/schema";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { PasswordInput } from "@/components/ui/password-input";
import { UserRole } from "@/lib/types/user-types/user-types";
import { useUpdateInternPassword } from "@/hooks/intern/intern";
import { useUpdateRecruiterPassword } from "@/hooks/recruiter/recruiter";

interface ResetPasswordFormProps {
  userType: UserRole.INTERN | UserRole.RECRUITER;
}

const ResetPasswordForm = ({ userType }: ResetPasswordFormProps) => {
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: submitInternPassword, isPending: isInternPending } =
    useUpdateInternPassword();
  const { mutate: submitRecruiterPassword, isPending: isRecruiterPending } =
    useUpdateRecruiterPassword();

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    if (userType === UserRole.INTERN) {
      submitInternPassword({
        password: values.password,
        currentPassword: values.confirmPassword,
      });
    } else if (userType === UserRole.RECRUITER) {
      submitRecruiterPassword({
        password: values.password,
        currentPassword: values.confirmPassword,
      });
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-4 rounded-xl"
        >
          <div className="grid gap-5 sm:w-6/12">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      placeholder="Current Password"
                      {...field}
                      autoComplete="off"
                      className="bg-thrive-input"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      placeholder="New Password"
                      {...field}
                      autoComplete="off"
                      className="bg-thrive-input"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirm Password"
                      {...field}
                      autoComplete="off"
                      className="bg-thrive-input"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-start">
            <Button
              type="submit"
              className="rounded-xl px-20 bg-black hover:bg-black/85"
            >
              {isInternPending || isRecruiterPending ? (
                <TbLoader2 className="ml-2 h-5 w-5 animate-spin" />
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;

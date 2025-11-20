"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordFormSchema } from "@/lib/schema";
import { PasswordInput } from "@/components/ui/password-input";
import { UserRole } from "@/lib/types/user-types/user-types";
import { useUpdateInternPassword } from "@/hooks/intern/intern";
import { useupdateEmployerPassword } from "@/hooks/employer/employer";
import { Loader2 } from "lucide-react";

interface ResetPasswordFormProps {
  userType: UserRole.INTERN | UserRole.EMPLOYER;
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
  const { mutate: submitEmployerPassword, isPending: isEmployerPending } =
    useupdateEmployerPassword();

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    if (userType === UserRole.INTERN) {
      submitInternPassword({
        password: values.password,
        currentPassword: values.confirmPassword,
      });
    } else if (userType === UserRole.EMPLOYER) {
      submitEmployerPassword({
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
              {isInternPending || isEmployerPending ? (
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
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

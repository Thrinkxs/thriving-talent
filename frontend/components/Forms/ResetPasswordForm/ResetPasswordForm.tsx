"use client";

import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { resetPasswordFormSchema } from "@/lib/schema";
import { Axios } from "@/utils/Axios/Axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { ArrowLeftSquareIcon } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string | null>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    try {
      const response = await Axios.post("/api/business/reset-password", {
        email: email,
        password: values.password,
      });
      if (response.status === 200) {
        toast.success("Password reset successful");
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred, please try again");
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      placeholder="Password "
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
                      placeholder="Confirm Password "
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
              Change password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;

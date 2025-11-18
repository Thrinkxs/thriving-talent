/**
 * This is the login form for the users
 */

"use client";

import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { userSignInSchema } from "@/lib/schema";
import { Axios } from "@/utils/Axios/Axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { MailIcon } from "lucide-react";
import { PasswordInput } from "../../../../ui/password-input";
import Cookies from "js-cookie";
import { useRecruiterStore } from "@/lib/store/recruiter-store";
import { UserRole } from "@/lib/types/user-types/user-types";

const RecruiterSignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const setRecruiter = useRecruiterStore((state) => state.setRecruiter);
  const form = useForm<z.infer<typeof userSignInSchema>>({
    resolver: zodResolver(userSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSignInSchema>) => {
    setLoading(true);
    try {
      const response = await Axios.post(
        "/api/client/employer/auth/login",
        values
      );
      if (response.status === 200) {
        toast.success("Successfully signed in. Welcome");
        const { employer } = response.data.data;

        setRecruiter(employer);
        Cookies.set("role", UserRole.RECRUITER);
        router.push("/dashboard/recruiter/home");
      }
    } catch (error) {
      setLoading(false);
      toast.error((error as Error).message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center pt-[100px] bg-thrive-dark-blue min-h-screen text-white">
      <div>
        <div className="py-6 px-10 w-full md:w-[650px] shadow-md rounded-md">
          <h1 className="text-4xl font-semibold text-center mb-5 text-white">
            Welcome back
          </h1>
          <div className="flex justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:w-[400px]"
              >
                <div className="grid gap-7">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            {...field}
                            type="email"
                            suffix={<MailIcon />}
                            className="rounded"
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
                            placeholder="Password "
                            {...field}
                            autoComplete="off"
                            className="rounded"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    className="rounded w-full px-10 bg-thrive-blue hover:bg-thrive-blue/90"
                  >
                    {loading ? (
                      <TbLoader2 className="animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-start md:w-[400px]">
            <Link
              href="/forgot-password"
              className="text-my-gray-text mt-1 hover:text-blue-400 text-xs"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-start mt-4 md:w-[400px] text-xs">
            <p className="text-my-gray-text">Don&#39;t have an account? </p>
            <div className="ml-3 font-bold">
              <Link href="/recruiter/signup" className="hover:text-blue-400">
                {" "}
                Sign up
              </Link>
              <hr className=" h-[2px] bg-black " />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterSignInForm;

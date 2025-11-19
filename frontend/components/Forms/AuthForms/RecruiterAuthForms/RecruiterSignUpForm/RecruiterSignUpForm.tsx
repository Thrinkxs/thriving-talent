/**
 * This is the sign up form for the interns
 */

"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Axios } from "@/utils/Axios/Axios";
import { recruiterSignUpSchema } from "@/lib/schema";
import { Stepper } from "./Stepper/Stepper";
import StepOneDetails from "./Stepper/Steps/StepOneBusinessDetails";
import StepTwoBusinessInfo from "./Stepper/Steps/StepTwoBusinessInfo";
import StepThreePassword from "./Stepper/Steps/StepThreePassword";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecruiterStore } from "@/lib/store/recruiter-store";
import { UserRole } from "@/lib/types/user-types/user-types";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";

export default function RecruiterSignUpForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<z.infer<typeof recruiterSignUpSchema>>({
    resolver: zodResolver(recruiterSignUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      companyName: "",
      registrationNumber: "",
      email: "",
      industry: "",
      sector: "",
      roleInOrganization: "",
      numberOfEmployees: undefined,
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [step, setStep] = useState(0);
  const steps = ["Business Details", "Business Info", "Password"];

  const nextStep = async () => {
    let stepFields: (keyof z.infer<typeof recruiterSignUpSchema>)[] = [];

    if (step === 0)
      stepFields = [
        "fullName",
        "companyName",
        "email",
        "registrationNumber",
        "sector",
        "industry",
      ];
    if (step === 1)
      stepFields = ["roleInOrganization", "numberOfEmployees", "address"];
    if (step === 2) stepFields = ["password", "confirmPassword"];

    const isValid = await methods.trigger(stepFields, { shouldFocus: true });

    if (!isValid) {
      toast.error("Please complete all required fields before continuing.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const router = useRouter();
  const setRecruiter = useRecruiterStore((state) => state.setRecruiter);

  const onSubmit = async (
    formValues: z.infer<typeof recruiterSignUpSchema>
  ) => {
    setLoading(true);
    try {
      const response = await Axios.post(
        "/api/client/employer/auth/register",
        formValues
      );
      if (response.status === 201) {
        toast.success("Successfully created your account. Welcome");
        const { employer } = response.data.data;

        setRecruiter(employer);
        Cookies.set("role", UserRole.RECRUITER);
        router.push("/dashboard/recruiter/home");
      }
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{ message?: string }>;
      toast.error(axiosErr.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen text-black flex justify-center items-center">
      <div className="p-10 rounded-xl w-full max-w-lg">
        <Stepper steps={steps} currentStep={step} />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            {step === 0 && <StepOneDetails />}
            {step === 1 && <StepTwoBusinessInfo />}
            {step === 2 && <StepThreePassword />}

            <div className="flex justify-between mt-6">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="bg-gray-700 text-white"
                >
                  Back
                </Button>
              )}
              {step < steps.length - 1 && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-thrive-blue hover:bg-thrive-blue/90 text-white rounded"
                >
                  Next
                </Button>
              )}
              {step === steps.length - 1 && (
                <Button
                  type="submit"
                  className="bg-thrive-blue hover:bg-thrive-blue/90"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>

            <div className="flex justify-center">
              <div className="flex justify-start mt-4 md:w-[400px] text-xs">
                <p className="text-my-gray-text">Already have an account? </p>
                <div className="ml-3 font-bold">
                  <Link
                    href="/recruiter/signin"
                    className="hover:text-thrive-blue"
                  >
                    {" "}
                    Sign in
                  </Link>
                  <hr className=" h-[2px] bg-black " />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}

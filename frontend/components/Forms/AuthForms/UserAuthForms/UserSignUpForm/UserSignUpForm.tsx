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
import { userSignUpSchema } from "@/lib/schema";
import { Stepper } from "./Stepper/Stepper";
import StepOneDetails from "./Stepper/Steps/StepOneDetails";
import StepTwoCVUpload from "./Stepper/Steps/StepTwoCVUpload";
import StepThreeVideoUpload from "./Stepper/Steps/StepThreeVideoUpload";
import StepFourPassword from "./Stepper/Steps/StepFourPassword";
import Cookies from "js-cookie";
import Link from "next/link";

export default function UserSignUpForm() {
  const methods = useForm<z.infer<typeof userSignUpSchema>>({
    resolver: zodResolver(userSignUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthday: undefined,
      sex: undefined,
      cv: "",
      video: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [step, setStep] = useState(0);
  const steps = ["Personal Details", "Upload CV", "Upload Video", "Password"];

  const nextStep = async () => {
    let stepFields: (keyof z.infer<typeof userSignUpSchema>)[] = [];

    if (step === 0) stepFields = ["name", "email", "phone", "birthday", "sex"];
    if (step === 1) stepFields = ["cv"];
    if (step === 2) stepFields = ["video"];
    if (step === 3) stepFields = ["password", "confirmPassword"];

    const isValid = await methods.trigger(stepFields, { shouldFocus: true });

    if (!isValid) {
      toast.error("Please complete all required fields before continuing.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (formValues: z.infer<typeof userSignUpSchema>) => {
    console.log("Submitting form with values:", formValues);
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    try {
      const response = await Axios.post("/api/intern/signup", formData);
      if (response.status === 201) {
        toast.success("Successfully created your account. Welcome");
        const data = await response.data;
        Cookies.set("access-token", data.business.token);
        Cookies.set("refresh-token", data.business.refreshToken, {
          httOnly: true,
        });
        toast.success("Signup successful!");
        console.log(response.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
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
            {step === 0 && <StepOneDetails nextStep={nextStep} />}
            {step === 1 && (
              <StepTwoCVUpload nextStep={nextStep} prevStep={prevStep} />
            )}
            {step === 2 && (
              <StepThreeVideoUpload nextStep={nextStep} prevStep={prevStep} />
            )}
            {step === 3 && <StepFourPassword prevStep={prevStep} />}

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
                  Submit
                </Button>
              )}
            </div>

            <div className="flex justify-center">
              <div className="flex justify-start mt-4 md:w-[400px] text-xs">
                <p className="text-my-gray-text">Already have an account? </p>
                <div className="ml-3 font-bold">
                  <Link href="/user/signin" className="hover:text-thrive-blue">
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

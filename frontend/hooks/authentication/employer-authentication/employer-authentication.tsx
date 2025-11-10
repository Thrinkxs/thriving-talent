import { EmployerSignupPayload } from "@/lib/types/payload-types/payload-types";
import { Axios } from "@/utils/Axios/Axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const signupEmployer = async (
  payload: EmployerSignupPayload
): Promise<EmployerResponse> => {
  try {
    const response = await Axios.post(
      "/api/client/employer/auth/register",
      payload
    );
    if (response.status !== 201) {
      throw new Error("Failed to sign up employer");
    }

    const data: EmployerResponse = response.data;
    return data;
  } catch (error) {
    console.log("could not sign up employer");
    throw error;
  }
};

export const useEmployerSignup = () => {
  return useMutation({
    mutationFn: (data: EmployerSignupPayload) => signupEmployer(data),
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      console.log("Signup success:", data);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong.";
      toast.error(message);
      console.error("Signup error:", error);
    },
  });
};

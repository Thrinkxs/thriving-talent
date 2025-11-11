import { RecruiterSignupPayload } from "@/lib/types/payload-types/payload-types";
import { RecruiterResponse } from "@/lib/types/response-types/response-types";
import { Axios } from "@/utils/Axios/Axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const signupRecruiter = async (
  payload: RecruiterSignupPayload
): Promise<RecruiterResponse> => {
  try {
    const response = await Axios.post(
      "/api/client/employer/auth/register",
      payload
    );
    if (response.status !== 201) {
      throw new Error("Failed to sign up recruiter");
    }

    const data: RecruiterResponse = response.data;
    return data;
  } catch (error) {
    console.log("could not sign up recruiter");
    throw error;
  }
};

export const useRecruiterSignup = () => {
  return useMutation({
    mutationFn: (data: RecruiterSignupPayload) => signupRecruiter(data),
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

import {
  RecruiterSignupPayload,
  ResetUserPasswordPayload,
} from "@/lib/types/payload-types/payload-types";
import { RecruiterResponse } from "@/lib/types/response-types/response-types";
import { Axios } from "@/utils/Axios/Axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchRecruiterProfile = async () => {
  try {
    const response = await Axios.get("/api/client/employer/profile");

    if (response.status !== 200) {
      throw new Error("Could not fetch recruiter profile");
    }
    const data: RecruiterResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("An error occured");
    throw error;
  }
};

export const useFetchRecruiterProfile = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: () => fetchRecruiterProfile(),
    retry: 3,
    retryDelay: 500,
  });
};

const updateRecruiterProfile = async (
  payload: Partial<RecruiterSignupPayload>
): Promise<RecruiterResponse> => {
  try {
    const response = await Axios.patch("/api/client/employer/profile", payload);

    if (response.status !== 200) {
      throw new Error("failed to update recruiter profile");
    }
    const data: RecruiterResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("an error occured somewhere");
    throw error;
  }
};

export const useUpdateRecruiterProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<RecruiterSignupPayload>) =>
      updateRecruiterProfile(payload),
    onSuccess: (data) => {
      // Invalidate and refetch the recruiter profile after update
      queryClient.invalidateQueries({ queryKey: ["data"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    },
  });
};

const updateRecruiterPassword = async (
  payload: ResetUserPasswordPayload
): Promise<RecruiterResponse> => {
  try {
    const response = await Axios.patch(
      "/api/client/employer/password",
      payload
    );

    if (response.status !== 200) {
      throw new Error("failed to update recruiter profile");
    }
    const data: RecruiterResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("an error occured somewhere");
    throw error;
  }
};

export const useUpdateRecruiterPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ResetUserPasswordPayload) =>
      updateRecruiterPassword(payload),
    onSuccess: (data) => {
      // Invalidate and refetch the recruiter profile after update
      queryClient.invalidateQueries({ queryKey: ["data"] });
      toast.success("Password updated successfully");
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
      toast.error("Failed to update password");
    },
  });
};

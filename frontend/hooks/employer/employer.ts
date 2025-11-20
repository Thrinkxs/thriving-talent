import {
  EmployerSignupPayload,
  ResetUserPasswordPayload,
} from "@/lib/types/payload-types/payload-types";
import { EmployerResponse } from "@/lib/types/response-types/response-types";
import { Axios } from "@/utils/Axios/Axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchEmployerProfile = async () => {
  try {
    const response = await Axios.get("/api/client/employer/profile");

    if (response.status !== 200) {
      throw new Error("Could not fetch employer profile");
    }
    const data: EmployerResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("An error occured");
    throw error;
  }
};

export const useFetchEmployerProfile = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: () => fetchEmployerProfile(),
    retry: 3,
    retryDelay: 500,
  });
};

const updateEmployerProfile = async (
  payload: Partial<EmployerSignupPayload>
): Promise<EmployerResponse> => {
  try {
    const response = await Axios.patch("/api/client/employer/profile", payload);

    if (response.status !== 200) {
      throw new Error("failed to update employer profile");
    }
    const data: EmployerResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("an error occured somewhere");
    throw error;
  }
};

export const useupdateEmployerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<EmployerSignupPayload>) =>
      updateEmployerProfile(payload),
    onSuccess: (data) => {
      // Invalidate and refetch the employer profile after update
      queryClient.invalidateQueries({ queryKey: ["data"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    },
  });
};

const updateEmployerPassword = async (
  payload: ResetUserPasswordPayload
): Promise<EmployerResponse> => {
  try {
    const response = await Axios.patch(
      "/api/client/employer/password",
      payload
    );

    if (response.status !== 200) {
      throw new Error("failed to update employer profile");
    }
    const data: EmployerResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("an error occured somewhere");
    throw error;
  }
};

export const useupdateEmployerPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ResetUserPasswordPayload) =>
      updateEmployerPassword(payload),
    onSuccess: (data) => {
      // Invalidate and refetch the employer profile after update
      queryClient.invalidateQueries({ queryKey: ["data"] });
      toast.success("Password updated successfully");
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
      toast.error("Failed to update password");
    },
  });
};

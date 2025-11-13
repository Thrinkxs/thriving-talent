import {
  InternSignupPayload,
  ResetUserPasswordPayload,
} from "@/lib/types/payload-types/payload-types";
import { InternResponse } from "@/lib/types/response-types/response-types";
import { Axios } from "@/utils/Axios/Axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchInternProfile = async () => {
  try {
    const response = await Axios.get("/api/client/intern/profile");

    if (response.status !== 200) {
      throw new Error("Could not fetch intern profile");
    }
    const data: InternResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("An error occured");
    throw error;
  }
};

export const useFetchInternProfile = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: () => fetchInternProfile(),
    retry: 3,
    retryDelay: 500,
  });
};

const updateInternProfile = async (
  payload: Partial<InternSignupPayload>
): Promise<InternResponse> => {
  try {
    const response = await Axios.patch("/api/client/intern/profile", payload);

    if (response.status !== 200) {
      throw new Error("failed to update intern profile");
    }
    const data: InternResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("an error occured somewhere");
    throw error;
  }
};

export const useUpdateInternProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<InternSignupPayload>) =>
      updateInternProfile(payload),
    onSuccess: (data) => {
      // Invalidate and refetch the intern profile after update
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
    },
  });
};

const updateInternPassword = async (
  payload: ResetUserPasswordPayload
): Promise<InternResponse> => {
  try {
    const response = await Axios.patch("/api/client/intern/password", payload);

    if (response.status !== 200) {
      throw new Error("failed to update intern profile");
    }
    const data: InternResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("an error occured somewhere");
    throw error;
  }
};

export const useUpdateInternPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ResetUserPasswordPayload) =>
      updateInternPassword(payload),
    onSuccess: (data) => {
      // Invalidate and refetch the intern profile after update
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
    },
  });
};

const fetchInternById = async (internId: string) => {
  try {
    const response = await Axios.get(`/api/client/intern/${internId}`);

    if (response.status !== 200) {
      throw new Error("Could not fetch intern");
    }
    const data: InternResponse = response.data.internData;
    return data;
  } catch (error) {
    console.log("An error occured");
    throw error;
  }
};

export const useFetchInternById = (internId: string) => {
  return useQuery({
    queryKey: ["internData", internId],
    queryFn: () => fetchInternById(internId),
    retry: 3,
    retryDelay: 500,
  });
};

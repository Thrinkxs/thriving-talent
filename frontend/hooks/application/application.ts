import {
  ApplicationParams,
  ApplicationPayload,
  UpdateApplicationParams,
} from "@/lib/types/payload-types/payload-types";
import { ApplicationResponse } from "@/lib/types/response-types/response-types";
import { Axios } from "@/utils/Axios/Axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchApplications = async ({
  search,
  page,
  limit,
  internId,
  jobId,
  status,
}: ApplicationParams) => {
  try {
    const response = await Axios.get("/api/client/application/", {
      params: {
        ...(search && { search }),
        ...(page && { page }),
        ...(limit && { limit }),
        ...(internId && { internId }),
        ...(jobId && { jobId }),
        ...(status && { status }),
      },
    });
    if (response.status !== 200) {
      throw new Error("Could not fetch applications");
    }

    const data: ApplicationResponse[] = response.data.data.data;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useFetchApplications = (options: ApplicationParams) => {
  return useQuery({
    queryKey: ["data", options],
    queryFn: () => fetchApplications(options),
    retry: 3,
    retryDelay: 500,
  });
};

const fetchApplicationById = async (id: string) => {
  try {
    const response = await Axios.get(`/api/client/application/${id}`);
    if (response.status !== 200) {
      throw new Error("Could not fetch application by id");
    }

    const data: ApplicationResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useFetchApplicationById = (id: string) => {
  return useQuery({
    queryKey: ["data", id],
    queryFn: () => fetchApplicationById(id),
    enabled: !!id, // only run if id exists
    retry: 3,
    retryDelay: 500,
  });
};

const fetchApplicationsPersonal = async ({
  search,
  page,
  limit,
  internId,
  jobId,
  status,
}: ApplicationParams) => {
  try {
    const response = await Axios.get("/api/client/application/personal/", {
      params: {
        ...(search && { search }),
        ...(page && { page }),
        ...(limit && { limit }),
        ...(internId && { internId }),
        ...(jobId && { jobId }),
        ...(status && { status }),
      },
    });
    if (response.status !== 200) {
      throw new Error("Could not fetch applications");
    }

    const data: ApplicationResponse[] = response.data.data.data;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useFetchApplicationsPersonal = (options: ApplicationParams) => {
  return useQuery({
    queryKey: ["data", options],
    queryFn: () => fetchApplicationsPersonal(options),
    retry: 3,
    retryDelay: 500,
  });
};

const createApplication = async (payload: Partial<ApplicationPayload>) => {
  try {
    const response = await Axios.post("/api/client/application/", payload);
    if (response.status !== 201) {
      throw new Error("Could not create application");
    }

    const data: ApplicationResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      toast.success("Application created successfully!");
      // Invalidate and refetch application list to show the new one
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: () => {
      toast.error("Failed to create application. Please try again.");
    },
  });
};

const updateApplication = async ({
  applicationId,
  payload,
}: UpdateApplicationParams) => {
  try {
    const response = await Axios.patch(
      `/api/client/application/${applicationId}`,
      payload
    );
    if (response.status !== 200) {
      throw new Error("Could not update job");
    }

    const data: ApplicationResponse = response.data.data;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      toast.success("application updated successfully!");
      // Invalidate and refetch application list to show the new one
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: () => {
      toast.error("Failed to update application. Please try again.");
    },
  });
};

const deleteApplication = async (applicationId: string) => {
  try {
    const response = await Axios.delete(
      `/api/client/application/${applicationId}`
    );
    if (response.status !== 200) {
      throw new Error("Could not delete application");
    }

    const message = response.data.message;
    return message;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      toast.success("Application deleted successfully!");
      // ✅ Invalidate and refetch job list to show the new one
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: () => {
      toast.error("Failed to delete application. Please try again.");
    },
  });
};

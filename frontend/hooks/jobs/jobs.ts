import {
  FetchJobsParams,
  JobPayload,
} from "@/lib/types/payload-types/payload-types";
import {
  JobResponse,
  RecuiterDashboardMetricsResponse,
} from "@/lib/types/response-types/response-types";
import { Axios } from "@/utils/Axios/Axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchJobs = async ({ search, page, limit }: FetchJobsParams) => {
  try {
    const response = await Axios.get("/api/client/job/personal", {
      params: {
        ...(search && { search }),
        ...(page && { page }),
        ...(limit && { limit }),
      },
    });
    if (response.status !== 200) {
      throw new Error("Could not fetch jobs");
    }

    const data: JobResponse[] = response.data.data.jobsData;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useFetchJobs = (options: FetchJobsParams) => {
  return useQuery({
    queryKey: ["jobsData", options],
    queryFn: () => fetchJobs(options),
    retry: 3,
    retryDelay: 500,
  });
};

const createJob = async (payload: Partial<JobPayload>) => {
  try {
    const response = await Axios.post("/api/client/job/personal", payload);
    if (response.status !== 201) {
      throw new Error("Could not create job");
    }

    const data: JobResponse = response.data.newJobData;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success("Job created successfully!");
      // ✅ Invalidate and refetch job list to show the new one
      queryClient.invalidateQueries({ queryKey: ["jobsData"] });
      queryClient.invalidateQueries({ queryKey: ["newJobData"] });
    },
    onError: () => {
      toast.error("Failed to create job. Please try again.");
    },
  });
};

const updateJob = async (payload: Partial<JobPayload>) => {
  try {
    const response = await Axios.patch("/api/client/job/personal", payload);
    if (response.status !== 200) {
      throw new Error("Could not update job");
    }

    const data: JobResponse = response.data.updatedJobData;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      toast.success("Job updated successfully!");
      // ✅ Invalidate and refetch job list to show the new one
      queryClient.invalidateQueries({ queryKey: ["jobsData"] });
      queryClient.invalidateQueries({ queryKey: ["updatedJobData"] });
    },
    onError: () => {
      toast.error("Failed to update job. Please try again.");
    },
  });
};

const deleteJob = async (jobId: string) => {
  try {
    const response = await Axios.delete("/api/client/job/personal", {
      params: {
        jobID: jobId,
      },
    });
    if (response.status !== 200) {
      throw new Error("Could not delete job");
    }

    const message = response.data.message;
    return message;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success("Job deleted successfully!");
      // ✅ Invalidate and refetch job list to show the new one
      queryClient.invalidateQueries({ queryKey: ["jobsData"] });
    },
    onError: () => {
      toast.error("Failed to delete job. Please try again.");
    },
  });
};

const fetchRecruiterDashboardMetrics = async () => {
  try {
    const response = await Axios.get(
      "/api/client/job/employer-dashboard-metrics"
    );
    if (response.status !== 200) {
      throw new Error("Could not recruiter dashboard metrics.");
    }

    const data: RecuiterDashboardMetricsResponse =
      response.data.employerJobMetricsData;
    return data;
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

export const useFetchRecruiterDashboardMetrics = () => {
  return useQuery({
    queryKey: ["employerJobMetricsData"],
    queryFn: () => fetchRecruiterDashboardMetrics(),
    retry: 3,
    retryDelay: 500,
  });
};

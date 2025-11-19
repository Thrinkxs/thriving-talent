import {
  FetchInternsParams,
  InternSignupPayload,
  ResetUserPasswordPayload,
} from "@/lib/types/payload-types/payload-types";
import {
  InternByIdResponse,
  InternResponse,
  InfiniteInternsResponse,
} from "@/lib/types/response-types/response-types";
import { Axios } from "@/utils/Axios/Axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useDebounce } from "../use-debounce/use-debounce";
import { useInternFiltersStore } from "@/lib/store/intern-filter-store/intern-filter-store";

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
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
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
      toast.success("Password updated successfully");
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
      toast.error("Failed to update password");
    },
  });
};

const fetchInternById = async (internId: string) => {
  try {
    const response = await Axios.get(`/api/client/intern/${internId}`);

    if (response.status !== 200) {
      throw new Error("Could not fetch intern");
    }
    const data: InternByIdResponse = response.data.internData;
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

const fetchAllInterns = async ({
  pageParam = 1,
  queryKey,
}: any): Promise<InfiniteInternsResponse> => {
  const [_key, filters] = queryKey;
  const { search, address, gender, status } = filters;

  const response = await Axios.get("/api/client/intern/get-all-interns", {
    params: {
      search: search || "",
      address: address || "",
      gender: gender || "",
      status: status || "",
      page: pageParam,
      limit: 2, // adjust as needed
    },
  });

  return response.data;
};

export const useInfiniteFetchAllInterns = () => {
  const { search, address, gender, status } = useInternFiltersStore();
  const debouncedSearch = useDebounce(search, 400);
  const debouncedAddress = useDebounce(address, 400);

  const filters = {
    search: debouncedSearch,
    address: debouncedAddress,
    gender,
    status,
  };

  return useInfiniteQuery<InfiniteInternsResponse>({
    queryKey: ["internsData", filters],
    queryFn: fetchAllInterns,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.internsData.currentPage < lastPage.internsData.totalPages
        ? lastPage.internsData.currentPage + 1
        : undefined,
    staleTime: 1000 * 30, // 30 seconds
  });
};

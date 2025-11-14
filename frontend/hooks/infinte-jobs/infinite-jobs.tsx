import { useInfiniteQuery } from "@tanstack/react-query";
import { useJobsStore } from "@/lib/store/job-store";
import { Axios } from "@/utils/Axios/Axios";
import { useDebounce } from "@/hooks/use-debounce/use-debounce";

type InfiniteJobsResponse = {
  data: any[];
  currentPage: number;
  totalPages: number;
};

const fetchJobs = async ({
  pageParam = 1,
  queryKey,
}: any): Promise<InfiniteJobsResponse> => {
  const [_key, searchQuery] = queryKey;

  const response = await Axios.get("/api/client/job", {
    params: {
      search: searchQuery || "",
      page: pageParam,
      limit: 3,
    },
  });

  return response.data.jobsData;
};

export const useInfiniteJobs = () => {
  const { searchQuery } = useJobsStore();
  const debouncedSearch = useDebounce(searchQuery, 400);

  return useInfiniteQuery<InfiniteJobsResponse>({
    queryKey: ["infiniteJobs", debouncedSearch],
    queryFn: fetchJobs,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
    staleTime: 1000 * 30,
  });
};

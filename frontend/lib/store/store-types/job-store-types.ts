import { JobResponse } from "@/lib/types/response-types/response-types";

export interface JobsStoreState {
  searchQuery: string;
  setSearchQuery: (v: string) => void;

  sortBy: "newest" | "popular";
  setSortBy: (v: "newest" | "popular") => void;

  viewMode: "list" | "grid";
  setViewMode: (v: "list" | "grid") => void;

  jobType: string;
  setJobType: (v: string) => void;

  category: string;
  setCategory: (v: string) => void;

  location: string;
  setLocation: (v: string) => void;

  selectedJob: JobResponse | null;
  setSelectedJob: (job: JobResponse | null) => void;

  showFilters: boolean;
  setShowFilters: (v: boolean) => void;

  showDetails: boolean;
  setShowDetails: (v: boolean) => void;

  expandDescription: boolean;
  setExpandDescription: (v: boolean) => void;

  page: number;
  setPage: (page: number) => void;
}

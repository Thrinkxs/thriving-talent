import { create } from "zustand";
import { JobsStoreState } from "@/lib/store/store-types/job-store-types";

export const useJobsStore = create<JobsStoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (v) => set({ searchQuery: v }),

  sortBy: "newest",
  setSortBy: (v) => set({ sortBy: v }),

  viewMode: "list",
  setViewMode: (v) => set({ viewMode: v }),

  jobType: "all",
  setJobType: (v) => set({ jobType: v }),

  category: "all",
  setCategory: (v) => set({ category: v }),

  location: "all",
  setLocation: (v) => set({ location: v }),

  selectedJob: null,
  setSelectedJob: (job) => set({ selectedJob: job }),

  showFilters: false,
  setShowFilters: (v) => set({ showFilters: v }),

  showDetails: false,
  setShowDetails: (v) => set({ showDetails: v }),

  expandDescription: false,
  setExpandDescription: (v) => set({ expandDescription: v }),

  page: 1,
  setPage: (page) => set({ page }),
}));

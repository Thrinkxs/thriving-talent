import { create } from "zustand";
import { InternFilterState } from "@/lib/store/store-types/intern-filter-types";

export const useInternFiltersStore = create<InternFilterState>((set) => ({
  search: "",
  address: "",
  gender: "",
  status: "",
  page: 1,

  setSearch: (search) => set({ search, page: 1 }),
  setAddress: (address) => set({ address, page: 1 }),
  setGender: (gender) => set({ gender, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
  clearFilters: () =>
    set({
      search: "",
      address: "",
      gender: "",
      status: "",
      page: 1,
    }),
}));

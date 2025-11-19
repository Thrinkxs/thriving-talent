export interface InternFilterState {
  search: string;
  address: string;
  gender: string;
  status: string;
  page: number;

  setSearch: (value: string) => void;
  setAddress: (value: string) => void;
  setGender: (value: string) => void;
  setStatus: (value: string) => void;
  setPage: (value: number) => void;
  clearFilters: () => void;
}

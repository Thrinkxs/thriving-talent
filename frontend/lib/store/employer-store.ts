import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Axios } from "@/utils/Axios/Axios";
import { toast } from "sonner";
import { StateEmployerTypes } from "./store-types/employer-store-types";

interface EmployerState {
  employer: StateEmployerTypes | null;
  setEmployer: (employer: StateEmployerTypes) => void;
  updateEmployer: (updates: Partial<StateEmployerTypes>) => void;
  logout: (onSuccess?: () => void) => void;
}

export const useEmployerStore = create<EmployerState>()(
  persist(
    (set, get) => ({
      employer: null,
      setEmployer: (employer) => set({ employer }),
      updateEmployer: (updates) => {
        const currentEmployer = get().employer;
        if (currentEmployer) {
          set({
            employer: {
              ...currentEmployer,
              ...updates,
            },
          });
        }
      },
      logout: async (onSuccess?: () => void) => {
        // Optional: Make a request to the server to invalidate refresh token
        try {
          const response = await Axios.delete(
            "/api/client/employer/auth/logout/"
          );

          if (response.status === 200) {
            localStorage.clear();
            set({ employer: null }); // resets the employer user to null
            toast.success("You have successfully logged out");
          }

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          console.error("Failed to logout user:", error);
          toast.error("Failed to logout");
        }
      },
    }),
    {
      name: "employer-storage", //localStorage key
    }
  )
);

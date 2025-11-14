import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Axios } from "@/utils/Axios/Axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { StateRecruiterTypes } from "./store-types/recruiter-store-types";

interface RecruiterState {
  recruiter: StateRecruiterTypes | null;
  setRecruiter: (recruiter: StateRecruiterTypes) => void;
  logout: (onSuccess?: () => void) => void;
}

export const useRecruiterStore = create<RecruiterState>()(
  persist(
    (set) => ({
      recruiter: null,
      setRecruiter: (recruiter) => set({ recruiter }),
      logout: async (onSuccess?: () => void) => {
        // Optional: Make a request to the server to invalidate refresh token
        try {
          const response = await Axios.delete(
            "/api/client/employer/auth/logout/"
          );

          if (response.status === 200) {
            localStorage.clear();
            set({ recruiter: null }); // resets the recruiter user to null
            toast.success("You have successfully logged out");
          }

          if (onSuccess) {
            onSuccess();
          }
        } catch (error: any) {
          console.error("Failed to logout user:", error);
          toast.error("Failed to logout");
        }
      },
    }),
    {
      name: "recruiter-storage", //localStorage key
    }
  )
);

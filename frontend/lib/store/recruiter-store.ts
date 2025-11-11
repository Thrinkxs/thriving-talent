import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RecruiterResponse } from "@/lib/types/response-types/response-types";
import { Axios } from "@/utils/Axios/Axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface RecruiterState {
  recruiter: RecruiterResponse | null;
  setRecruiter: (recruiter: RecruiterResponse) => void;
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
          // const response = await Axios.delete(
          //   "/api/client/employer/auth/logout/"
          // );

          // if (response.status === 200) {
          //   localStorage.clear();
          //   Cookies.remove("accessToken"); // only removes the token I set in the frontend
          //   Cookies.remove("refreshToken");
          //   set({ recruiter: null }); // resets the recruiter user to null
          //   toast.success("You have successfully logged out");
          // }
          Cookies.remove("access-token"); // only removes the token I set in the frontend
          Cookies.remove("refresh-token");
          set({ recruiter: null }); // resets the recruiter user to null
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

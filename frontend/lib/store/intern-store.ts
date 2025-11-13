import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Axios } from "@/utils/Axios/Axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { StateInternTypes } from "./store-types/intern-store-types";

interface InternState {
  intern: StateInternTypes | null;
  setIntern: (intern: StateInternTypes) => void;
  logout: (onSuccess?: () => void) => void;
}

export const useInternStore = create<InternState>()(
  persist(
    (set) => ({
      intern: null,
      setIntern: (intern) => set({ intern }),
      logout: async (onSuccess?: () => void) => {
        try {
          // const response = await Axios.delete(
          //   "/api/client/intern/auth/logout/", {

          //   }
          // );

          // if (response.status === 200) {
          //   localStorage.clear();
          //   Cookies.remove("accessToken"); // only removes the token I set in the frontend
          //   Cookies.remove("refreshToken");
          //   set({ intern: null }); // resets the intern user back to null
          //   toast.success("You have successfully logged out");
          // }
          Cookies.remove("accessToken"); // only removes the token I set in the frontend
          Cookies.remove("refreshToken");
          set({ intern: null }); // resets the intern user back to null
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
      name: "intern-storage", // localStorage key
    }
  )
);

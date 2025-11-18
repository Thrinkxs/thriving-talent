import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Axios } from "@/utils/Axios/Axios";
import { toast } from "sonner";
import { StateInternTypes } from "./store-types/intern-store-types";

interface InternState {
  intern: StateInternTypes | null;
  setIntern: (intern: StateInternTypes) => void;
  updateIntern: (updates: Partial<StateInternTypes>) => void;
  logout: (onSuccess?: () => void) => void;
}

export const useInternStore = create<InternState>()(
  persist(
    (set, get) => ({
      intern: null,
      setIntern: (intern) => set({ intern }),
      updateIntern: (updates) => {
        const currentIntern = get().intern;
        if (currentIntern) {
          set({
            intern: {
              ...currentIntern,
              ...updates,
            },
          });
        }
      },
      logout: async (onSuccess?: () => void) => {
        try {
          const response = await Axios.delete(
            "/api/client/intern/auth/logout/"
          );

          if (response.status === 200) {
            localStorage.clear();
            set({ intern: null }); // resets the intern user back to null
            toast.success("You have successfully logged out");
          }

          // set({ intern: null }); // resets the intern user back to null
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
      name: "intern-storage", // localStorage key
    }
  )
);

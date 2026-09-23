import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser } from "../services/authApi";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({
          loading: true,
          error: null,
        });

        try {
          const user = await loginUser(email, password);

          set({
            user,
            isAuthenticated: true,
            loading: false,
          });

          return true;
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });

          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

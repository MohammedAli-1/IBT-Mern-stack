import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getClasses } from "../services/classApi";

export const useClassStore = create(
  persist(
    (set) => ({
      // =========================
      // STATE
      // =========================

      classes: [],
      loading: false,
      error: null,

      // =========================
      // GET CLASSES
      // =========================

      fetchClasses: async () => {
        set({
          loading: true,
          error: null,
        });

        try {
          const data = await getClasses();

          set({
            classes: data,
            loading: false,
          });
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
        }
      },

      // =========================
      // ADD CLASS
      // =========================

      addClass: (newClass) =>
        set((state) => ({
          classes: [
            ...state.classes,
            {
              ...newClass,
              id: Date.now(),
              grade: Number(newClass.grade),
            },
          ],
        })),

      // =========================
      // DELETE CLASS
      // =========================

      deleteClass: (id) =>
        set((state) => ({
          classes: state.classes.filter((schoolClass) => schoolClass.id !== id),
        })),

      // =========================
      // UPDATE CLASS
      // =========================

      updateClass: (id, updatedClass) =>
        set((state) => ({
          classes: state.classes.map((schoolClass) =>
            schoolClass.id === id
              ? {
                  ...schoolClass,
                  ...updatedClass,
                  grade: Number(updatedClass.grade),
                }
              : schoolClass,
          ),
        })),
    }),
    {
      name: "classes-storage",
    },
  ),
);

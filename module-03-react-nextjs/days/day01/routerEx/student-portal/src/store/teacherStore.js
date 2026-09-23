import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTeachers } from "../services/teacherApi";

export const useTeacherStore = create(
  persist(
    (set) => ({
      teachers: [],
      loading: false,
      error: null,

      fetchTeachers: async () => {
        set({
          loading: true,
          error: null,
        });

        try {
          const data = await getTeachers();

          set({
            teachers: data,
            loading: false,
          });
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
        }
      },

      addTeacher: (teacher) =>
        set((state) => ({
          teachers: [
            ...state.teachers,
            {
              ...teacher,
              id: Date.now(),
              experience: Number(teacher.experience),
            },
          ],
        })),

      deleteTeacher: (id) =>
        set((state) => ({
          teachers: state.teachers.filter((teacher) => teacher.id !== id),
        })),

      updateTeacher: (id, updatedTeacher) =>
        set((state) => ({
          teachers: state.teachers.map((teacher) =>
            teacher.id === id
              ? {
                  ...teacher,
                  ...updatedTeacher,
                  experience: Number(updatedTeacher.experience),
                }
              : teacher,
          ),
        })),
    }),
    {
      name: "teachers-storage",
    },
  ),
);

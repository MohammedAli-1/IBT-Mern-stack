import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCourses } from "../services/courseApi";

export const useCourseStore = create(
  persist(
    (set) => ({
      courses: [],
      loading: false,
      error: null,

      fetchCourses: async () => {
        set({
          loading: true,
          error: null,
        });

        try {
          const data = await getCourses();

          set({
            courses: data,
            loading: false,
          });
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
        }
      },

      addCourse: (course) =>
        set((state) => ({
          courses: [
            ...state.courses,
            {
              ...course,
              id: Date.now(),
              grade: Number(course.grade),
              creditHours: Number(course.creditHours),
            },
          ],
        })),

      deleteCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== id),
        })),

      updateCourse: (id, updatedCourse) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === id
              ? {
                  ...course,
                  ...updatedCourse,
                  grade: Number(updatedCourse.grade),
                  creditHours: Number(updatedCourse.creditHours),
                }
              : course,
          ),
        })),
    }),
    {
      name: "courses-storage",
    },
  ),
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getStudents } from "../services/studentApi";

export const useStudentStore = create(
  persist(
    (set) => ({
    
      students: [],
      loading: false,
      error: null,

      
      fetchStudents: async () => {
        set({
          loading: true,
          error: null,
        });

        try {
          const data = await getStudents();

          set({
            students: data,
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
      // ADD STUDENT
      // =========================

      addStudent: (student) =>
        set((state) => ({
          students: [
            ...state.students,
            {
              ...student,
              id: Date.now(),
              grade: Number(student.grade),
            },
          ],
        })),

      // =========================
      // DELETE STUDENT
      // =========================

      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((student) => student.id !== id),
        })),

      // =========================
      // UPDATE STUDENT
      // =========================

      updateStudent: (id, updatedStudent) =>
        set((state) => ({
          students: state.students.map((student) =>
            student.id === id
              ? {
                  ...student,
                  ...updatedStudent,
                  grade: Number(updatedStudent.grade),
                }
              : student,
          ),
        })),
    }),

    // =========================
    // LOCAL STORAGE
    // =========================

    {
      name: "students-storage",
    },
  ),
);

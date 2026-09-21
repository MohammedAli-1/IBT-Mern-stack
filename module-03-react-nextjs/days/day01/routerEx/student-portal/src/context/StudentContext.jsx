
import { createContext, useContext, useState } from "react";

import { students as initialStudents } from "../Data/students";


const StudentContext = createContext();


export function StudentProvider({ children }) {

  const [students, setStudents] = useState(initialStudents);

  const addStudent = (student) => {

    setStudents((previousStudents) => [
      ...previousStudents,
      {
        ...student,
        id: Date.now(),
        grade: Number(student.grade),
      },
    ]);

  };


  // ==========================================
  // DELETE STUDENT
  // ==========================================

  const deleteStudent = (id) => {

    setStudents((previousStudents) =>
      previousStudents.filter(
        (student) => student.id !== id
      )
    );

  };


  // ==========================================
  // UPDATE STUDENT
  // ==========================================

  const updateStudent = (id, updatedStudent) => {

    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              ...updatedStudent,
              grade: Number(updatedStudent.grade),
            }
          : student
      )
    );

  };


  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    students,
    addStudent,
    deleteStudent,
    updateStudent,
  };


  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}


// ============================================
// CUSTOM HOOK
// ============================================

export function useStudents() {

  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudents must be used inside StudentProvider"
    );
  }

  return context;
}



import { createContext, useContext, useReducer } from "react";
import { students as initialStudents } from "../Data/students";
import { studentReducer } from "../Reducers/studentReducer";

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, dispatch] = useReducer(
    studentReducer,
    initialStudents
  );

  const addStudent = (student) => {
    dispatch({
      type: "ADD_STUDENT",
      payload: student,
    });
  };

  const deleteStudent = (id) => {
    dispatch({
      type: "DELETE_STUDENT",
      payload: id,
    });
  };

  const updateStudent = (id, updatedStudent) => {
    dispatch({
      type: "UPDATE_STUDENT",
      payload: {
        id,
        student: updatedStudent,
      },
    });
  };

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

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudents must be used inside StudentProvider"
    );
  }

  return context;
}


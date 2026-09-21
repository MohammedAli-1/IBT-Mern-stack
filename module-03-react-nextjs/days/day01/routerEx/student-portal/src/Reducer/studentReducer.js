export function studentReducer(state, action) {
  switch (action.type) {
    case "ADD_STUDENT":
      return [
        ...state,
        {
          ...action.payload,
          id: Date.now(),
          grade: Number(action.payload.grade),
        },
      ];

    case "DELETE_STUDENT":
      return state.filter((student) => student.id !== action.payload);

    case "UPDATE_STUDENT":
      return state.map((student) =>
        student.id === action.payload.id
          ? {
              ...student,
              ...action.payload.student,
              grade: Number(action.payload.student.grade),
            }
          : student,
      );

    default:
      return state;
  }
}

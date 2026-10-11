function cartReducer(state, action) {
  switch (action.type) {
    case "Add":
      {
        const existingItem = state.find(
          (item) => item.id === action.payload.id,
        );
        if (existingItem) {
          return state.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "Increase":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    case "Decrease":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    case "Remove":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}
export default cartReducer;

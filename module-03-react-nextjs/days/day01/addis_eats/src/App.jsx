import Header from "./component/Header";
import Main from "./component/Main";
import React, { useContext, createContext, useReducer } from "react";
import "./css/style.css";
import Payment from "./component/Payment";
export const cartContext = createContext();
// const user = {
//   name: "Moammed",
//   id: "3515",
//   phone: "0928942829",
// };
function cartReducer(state, action) {
  switch (action.type) {
    case "Add":
      return [...state, action.payload];
    case "Remove":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}
function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
 
  return (
    <>
      <cartContext.Provider value={{ cart, dispatch }}>
        <Header />
        <Main />
      </cartContext.Provider>
      <Payment/>
    </>
  );
}
export default App;

import Dish from "./Dish";
import { useState } from "react";
import OrderForm from "./OrderForm";
import CategoryBar from "./CategoryBar";
function Main() {
  const menu = [
    // 🍗 Chicken
    {
      name: "Chicken Tikka",
      price: 12.99,
      id: 1,
      isSlice: true,
      category: "chicken",
    },
    {
      name: "Chicken Burger",
      price: 10.99,
      id: 2,
      isSlice: false,
      category: "chicken",
    },
    {
      name: "Grilled Chicken",
      price: 13.99,
      id: 3,
      isSlice: false,
      category: "chicken",
    },

    // 🥩 Beef
    {
      name: "Beef Burger",
      price: 9.99,
      id: 4,
      isSlice: false,
      category: "beef",
    },
    {
      name: "Beef Steak",
      price: 15.99,
      id: 5,
      isSlice: false,
      category: "beef",
    },
    {
      name: "Beef Pizza",
      price: 12.99,
      id: 6,
      isSlice: true,
      category: "beef",
    },

    // 🥗 Vegetarian
    {
      name: "Veggie Pizza",
      price: 11.99,
      id: 7,
      isSlice: true,
      category: "vegetarian",
    },
    {
      name: "Vegetable Pasta",
      price: 10.99,
      id: 8,
      isSlice: false,
      category: "vegetarian",
    },
    {
      name: "Garden Salad",
      price: 8.99,
      id: 9,
      isSlice: false,
      category: "vegetarian",
    },
  ];
  const chicken = menu.filter((item) => item.category == "chicken");
  const vegetarian = menu.filter((item) => item.category == "vegetarian");
  const beef = menu.filter((item) => item.category == "beef");

  const [total, setTotal] = useState(0);
  // const [category, setCategory] = useState("All");
  // const show =
  //   category === "All"
  //     ? menu
  //     : category === "chicken"
  //       ? chicken
  //       : category === "vegetarian"
  //         ? vegetarian
  //         : beef;

  const [category, setCategory] = useState("All");
  const show =
    category === "All"
      ? menu
      : category === "chicken"
        ? chicken
        : category === "vegetarian"
          ? vegetarian
          : beef;
  function addToOrder(price) {
    setTotal(total + price);
  }
  return (
    <>
      <CategoryBar selectCategory={setCategory} />
      <h1>Total:{total}</h1>

      <div className="dish">
        {show.map((item) => {
          return <Dish key={item.id} {...item} onAdd={addToOrder} />;
        })}
      </div>

      <OrderForm />
    </>
  );
}

export default Main;

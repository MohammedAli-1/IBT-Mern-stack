import Dish from "./Dish";
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
  function addToOrder(price){
    console.log(price)
  }
  return (
    <>
      <h2>Chicken Types</h2>
      <div className="dish">
        {chicken.map((item) => {
          return <Dish key={item.id} {...item} onAdd={addToOrder} />;
        })}
      </div>
      <h2>vegetarian Types</h2>
      <div className="dish">
        {vegetarian.map((item) => {
          return <Dish key={item.id} {...item} onAdd={addToOrder} />;
        })}
      </div>
      <h2>Beef Types</h2>
      <div className="dish">
        {beef.map((item) => {
          return <Dish key={item.id} {...item} onAdd={addToOrder}/>;
        })}
      </div>
    </>
  );
}

export default Main;

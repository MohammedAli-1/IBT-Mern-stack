import Dish from "./Dish";
import { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import CategoryBar from "./CategoryBar";
function Main() {
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("All");
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`menu.json?category=${category}`);
        if (!res.ok) {
          throw new Error("data could't load");
        }
        const data = await res.json();
        // console.log(data.items);
        setMenu(data.items);
      } catch (error) {
        console.log("data not load", error);
        setError(true);
      } finally {
        setLoding(false);
      }
    }
    getData();
  }, [category]);
  // console.log(category);
  useEffect(() => {
    document.title = `${menu.length} dishes`;
  }, [menu.length]);

  function addToOrder(price) {
    setTotal(total + price);
  }
  return (
    <>
      <CategoryBar selectCategory={setCategory} />
      <h1>Total:{total}</h1>

      <div className="dish">
        {loading && <p>Loading Menu ...</p>}
        {error && <p>Errror occured</p>}
        {!loading &&
          !error &&
          menu.map((item) => {
            return <Dish key={item.id} {...item} onAdd={addToOrder} />;
          
          })}
          {menu.length===0 && <p>No dish Found</p>}
      </div>

      <OrderForm />
    </>
  );
}

export default Main;

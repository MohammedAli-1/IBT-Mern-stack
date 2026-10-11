import { useState, useCallback } from "react";

import useFetch from "./hooks/useFetch";
import { ThemedApp, ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import CartSection from "./component/Cart";
import MenuSection from "./component/Menu";
import Header from "./component/Header";
import useCart from "./hooks/useCart";
function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { data: menu, error, loading } = useFetch("menu.json");

  const { cart, dispatch } = useCart();
  const totals = cart.reduce(
    (sum, item) => item.price * item.quantity + sum,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = useCallback(
    (item) => {
      dispatch({
        type: "Add",
        payload: item,
      });
    },
    [dispatch],
  );
  function removeFromCart(id) {
    dispatch({
      type: "Remove",
      payload: id,
    });
  }
  function increaseQuantity(id) {
    dispatch({
      type: "Increase",
      payload: id,
    });
  }
  function decreaseQuantity(id) {
    dispatch({
      type: "Decrease",
      payload: id,
    });
  }
  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Sorry, we could not load the menu.</p>;
  }
  return (
    <ThemeProvider>
      <ThemedApp>
        <main>
          <Header cartCount={cartCount} />
          <MenuSection
            menu={menu}
            category={category}
            setCategory={setCategory}
            search={search}
            setSearch={setSearch}
            onAddToCart={handleAddToCart}
          />
          <section>
            <CartSection
              cart={cart}
              total={totals}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          </section>
        </main>
      </ThemedApp>
    </ThemeProvider>
  );
}

export default App;

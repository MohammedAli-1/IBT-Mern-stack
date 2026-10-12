import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./component/RequireAuth";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/not-found";
import FoodDetails from "./pages/FoodDetails";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import useFetch from "./hooks/useFetch";
import { useCartContext, CartProvider } from "./context/CartContext";
import { ThemedApp, ThemeProvider } from "./context/ThemeContext";

import MainLayout from "./layouts/MainLayout";

import "./index.css";

function AppContent() {
  const [search, setSearch] = useState("");

  const { data: menu, error, loading } = useFetch("/menu.json");

  const { cart, dispatch } = useCartContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const totals = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
        <Routes>
          {/* Login page */}
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />

          {/* Main application layout */}
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Home
                  menu={menu}
                  search={search}
                  setSearch={setSearch}
                  onAddToCart={handleAddToCart}
                />
              }
            />

            <Route
              path="cart"
              element={
                <Cart
                  cart={cart}
                  total={totals}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeFromCart}
                />
              }
            />

            <Route path="foods/:id" element={<FoodDetails />} />

            {/* Protected checkout */}
            <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
              <Route path="checkout" element={<Checkout />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemedApp>
    </ThemeProvider>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;

import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./component/RequireAuth";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/not-found";
import FoodDetails from "./pages/FoodDetails";
import Login from "./pages/Login";

import useFetch from "./hooks/useFetch";

import { ThemeProvider, ThemedApp } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";

import "./index.css";

// Load these pages only when their routes are visited.
const Checkout = lazy(() => import("./pages/Checkout"));
const Receipt = lazy(() => import("./pages/Receipt"));

function LoadingSkeleton() {
  return (
    <main className="checkout-page" aria-live="polite">
      <div className="checkout-heading">
        <span className="checkout-eyebrow">ADDIS EATS</span>
        <h1>Loading page...</h1>
        <p>Please wait while we prepare your page.</p>
      </div>

      <div className="loading-skeleton" aria-hidden="true">
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-block" />
      </div>
    </main>
  );
}

function AppContent() {
  const [search, setSearch] = useState("");

  const { data: menu, error, loading } = useFetch("/menu.json");

  const { isAuthenticated, login } = useAuth();

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
          <Route path="/login" element={<Login onLogin={login} />} />

          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Home menu={menu} search={search} setSearch={setSearch} />
              }
            />

            <Route path="cart" element={<Cart />} />

            <Route path="foods/:id" element={<FoodDetails />} />

            <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
              <Route
                path="checkout"
                element={
                  <Suspense fallback={<LoadingSkeleton />}>
                    <Checkout />
                  </Suspense>
                }
              />

              <Route
                path="receipt"
                element={
                  <Suspense fallback={<LoadingSkeleton />}>
                    <Receipt />
                  </Suspense>
                }
              />
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

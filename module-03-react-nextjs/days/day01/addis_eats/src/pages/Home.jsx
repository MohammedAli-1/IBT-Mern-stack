import { useSearchParams, useNavigate } from "react-router-dom";

import MenuSection from "../component/Menu";
import ErrorBoundary from "../component/ErrorBoundary";
import useCartStore from "../store/cartStore";

function Home({ menu, search, setSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const addItem = useCartStore((state) => state.addItem);

  const category = searchParams.get("category") || "All";

  function handleCategoryChange(newCategory) {
    const params = new URLSearchParams(searchParams);

    if (newCategory === "All") {
      params.delete("category");
    } else {
      params.set("category", newCategory);
    }

    setSearchParams(params);
  }

  return (
    <main>
      <button type="button" onClick={() => navigate("/cart")}>
        Go to Cart
      </button>

      <ErrorBoundary
        fallback={
          <section role="alert" className="menu-error">
            <h2>Menu temporarily unavailable</h2>
            <p>
              We couldn't display the menu. Please refresh the page and try
              again.
            </p>
          </section>
        }
      >
        <MenuSection
          menu={menu}
          category={category}
          setCategory={handleCategoryChange}
          search={search}
          setSearch={setSearch}
          onAddToCart={addItem}
        />
      </ErrorBoundary>
    </main>
  );
}

export default Home;

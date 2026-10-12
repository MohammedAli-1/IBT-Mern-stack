
import MenuSection from "../component/Menu";
import { useSearchParams, useNavigate } from "react-router-dom";
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
      <button onClick={() => navigate("/cart")}>
        Go to Cart
      </button>

      <MenuSection
        menu={menu}
        category={category}
        setCategory={handleCategoryChange}
        search={search}
        setSearch={setSearch}
        onAddToCart={addItem}
      />
    </main>
  );
}

export default Home;

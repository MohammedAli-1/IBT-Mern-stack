import MenuSection from "../component/Menu";
import { useSearchParams, useNavigate } from "react-router-dom";

function Home({ menu, search, setSearch, onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
      <button onClick={() => navigate("/cart")}>Go to Cart</button>

      <MenuSection
        menu={menu}
        category={category}
        setCategory={handleCategoryChange}
        search={search}
        setSearch={setSearch}
        onAddToCart={onAddToCart}
      />
    </main>
  );
}

export default Home;

import Dish from "./Dish";
import CategoryBar from "./CategoryBar";
import { useMemo } from "react";
function MenuSection({
  menu,
  category,
  setCategory,
  search,
  setSearch,
  onAddToCart,
}) {
  const filteredMenu = useMemo(() => {
    // console.log("Filtering menu...");

    return menu.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menu, category, search]);
  return (
    <section>
      <h2>Our Menu</h2>

      <input
        type="text"
        placeholder="Search dishes..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <CategoryBar
        selectedCategory={category}
        onSelectedCategory={setCategory}
      />

      {filteredMenu.length === 0 ? (
        <p>No dishes found. Try another search.</p>
      ) : (
        <section>
          {filteredMenu.map((item) => (
            <Dish
              key={item.id}
              id={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              isSlice={item.isSlice}
              onAddToCart={onAddToCart}
            />
          ))}
        </section>
      )}
    </section>
  );
}

export default MenuSection;

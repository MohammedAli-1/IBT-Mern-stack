function CategoryBar({ selectedCategory, onSelectedCategory }) {
  const categories = ["All", "Chicken", "Beef", "Vegetarian"];

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "category-btn active"
              : "category-btn"
          }
          onClick={() => onSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;

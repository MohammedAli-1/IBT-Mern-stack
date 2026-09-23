import { useEffect, useState } from "react";

import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [sort, setSort] = useState("default");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // =========================
  // SORT
  // =========================

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") {
      return a.price - b.price;
    }

    if (sort === "high") {
      return b.price - a.price;
    }

    if (sort === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <main className="products-page">
      <div className="products-header">
        <div>
          <h2>Our Products</h2>

          <p>Discover useful products for your daily life.</p>
        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {/* FILTERS */}

      <div className="products-filters">
        <div>
          <label>Category</label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>

        <div>
          <label>Sort By</label>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">Default</option>

            <option value="low">Price: Low to High</option>

            <option value="high">Price: High to Low</option>

            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* RESULT COUNT */}

      <p className="product-count">Showing {sortedProducts.length} products</p>

      {/* PRODUCTS */}

      {sortedProducts.length === 0 ? (
        <div className="empty-products">
          <h3>No products found</h3>

          <p>Try changing your search or filter.</p>
        </div>
      ) : (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;

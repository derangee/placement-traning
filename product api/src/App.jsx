import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          "all",
          ...new Set(data.map((product) => product.category)),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fake Store Products</h1>

      <select
        value={selectedCategory}
        onChange={(e) => handleFilter(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
              }}
            />

            <h3>{product.title}</h3>
            <p>
              <strong>${product.price}</strong>
            </p>

            <p>{product.description.slice(0, 100)}...</p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
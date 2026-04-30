import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  // 1. Create a state to hold the products from MongoDB
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the data when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold animate-pulse dark:text-gray-400">
        Loading New Arrivals...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 dark:bg-gray-950">
      {/* Header Section */}
      <div className="mb-10 flex items-end justify-between border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight dark:text-gray-50">
            New Arrivals
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 italic">
            Carefully curated essentials for the modern developer.
          </p>
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
          {products.length} Items Found
        </span>
      </div>

      {/* The Grid - Now using the dynamic 'products' state */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => (
          /* We still use your ProductCard component exactly as you built it! */
          /* Note: MongoDB uses _id instead of id */
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </main>
  );
};

export default Home;
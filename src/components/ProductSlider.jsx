import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import HorizontalScroller from "./HorizontalScroller";
import { BASE_API_URL } from "../lib/api";

const ProductSlider = ({ title, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams({ limit: "10" });
        if (category) params.set("category", category);
        const url = `${BASE_API_URL}/api/products?${params.toString()}`;

        const response = await fetch(url);
        const data = await response.json();

        let fetchedProducts = [];
        if (Array.isArray(data)) {
          fetchedProducts = data.slice(0, 10);
        } else if (data && Array.isArray(data.products)) {
          fetchedProducts = data.products.slice(0, 10);
        }

        // If no products found from API, generate beautiful mock data
        if (fetchedProducts.length === 0) {
          fetchedProducts = Array.from({ length: 10 }).map((_, i) => ({
            _id: `mock-${category || "item"}-${i}`,
            name: `Premium ${category ? category.charAt(0).toUpperCase() + category.slice(1) : "Product"} Series ${i + 1}X`,
            price: Math.floor(Math.random() * 800) + 199,
            image: `https://placehold.co/400x400/f0ecf4/1b1b21?text=${category ? category.substring(0, 3).toUpperCase() : "ITM"}-${i + 1}`,
            stock: 10,
            category: category || "general",
          }));
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-4xl font-black italic tracking-widest text-[#1b1b21] uppercase">
          {title}
        </h2>
        <button className="bg-black text-white px-8 py-3 rounded-lg font-bold uppercase text-sm tracking-widest hover:bg-gray-800 transition">
          View All
        </button>
      </div>

      {loading ? (
        <div className="flex h-72 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#777682] shadow-sm border border-[#e5e1e9]">
          Loading Products...
        </div>
      ) : (
        <HorizontalScroller
          ariaLabel={`${title} products`}
          contentClassName="flex gap-6 pt-2"
        >
          {products.map((item) => (
            <div
              key={item._id ?? item.id}
              className="min-w-[280px] max-w-[280px] shrink-0"
            >
              <ProductCard product={item} />
            </div>
          ))}
          {products.length === 0 && (
            <div className="flex w-full h-72 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#777682] shadow-sm border border-[#e5e1e9]">
              No products available in this category.
            </div>
          )}
        </HorizontalScroller>
      )}
    </div>
  );
};

export default ProductSlider;

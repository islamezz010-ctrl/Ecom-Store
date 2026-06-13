import { useState } from "react";
import { useParams } from "react-router-dom";
import SubcategoryGrid from "../components/SubcategoryGrid";
import ProductSlider from "../components/ProductSlider";
import CategoryCarousel from "../components/CategoryCarousel";

const CategoryPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  // Create a nice display title from the URL id (e.g., "electronics" -> "Electronics")
  const displayTitle = id
    ? id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Category";

  return (
    <div className="bg-[#fcf8ff]">
      {/* Category Sub-nav for Electronics */}
      {id === "electronics" && (
        <div className="bg-white border-b border-[#e5e1e9]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-2 overflow-x-auto py-4 hide-scrollbar">
              {[
                "Electronics",
                "Mobiles",
                "Headsets",
                "Wearables",
                "Accessories",
                "Laptops",
                "Laptop Accessories",
                "Gaming",
                "TVs",
                "Cameras",
                "Appliances",
              ].map((tab, i) => (
                <button
                  key={tab}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                    i === 0
                      ? "bg-[#e5e8f0] text-[#1a146b] border border-[#d0d3db]"
                      : "bg-[#f6f2fa] text-[#474651] border border-transparent hover:bg-[#e5e8f0]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Sub-nav for Grocery */}
      {id === "grocery" && (
        <div className="bg-white border-b border-[#e5e1e9]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-2 overflow-x-auto py-4 hide-scrollbar">
              {[
                "All Groceries",
                "Grains & Cereals",
                "Spices & Seasonings",
                "Oils & Condiments",
                "Healthy Foods",
                "Beverages",
                "Baking Essentials",
                "Organic Products",
              ].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                    i === activeTab
                      ? "bg-[#e5e8f0] text-[#1a146b] border border-[#d0d3db]"
                      : "bg-[#f6f2fa] text-[#474651] border border-transparent hover:bg-[#e5e8f0]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Carousel Area */}
      <CategoryCarousel />

      {/* Subcategory Icon Grid - Only for non-grocery categories */}
      {id !== "grocery" && <SubcategoryGrid />}

      {/* Product Sliders based on category */}
      {id === "grocery" ? (
        <>
          <ProductSlider title="All Groceries" category="Grocery" />
          <ProductSlider title="Organic Products" category="Grocery" />
          <ProductSlider title="Popular Choices" category="Grocery" />
        </>
      ) : (
        <>
          <ProductSlider
            title="Mobiles and Accessories"
            category="smartphones"
          />
          <ProductSlider title="Top Rated Laptops" category="laptops" />
        </>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;

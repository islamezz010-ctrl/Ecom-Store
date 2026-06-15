import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryBar = () => {
  const categories = [
    "Electronics",
    "Fashion",
    "Grocery",
    "Beauty & Fragrance",
    "Home & Appliances",
    "Baby",
    "Toys & Games",
    "Sports & Outdoors",
    "Stationary & Books",
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.2;
    return 1;
  };

  return (
    <div className="bg-[#001a4d] border-b border-[#001a4d] sticky top-20 z-40 overflow-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 overflow-visible">
        <div
          className="flex items-center gap-6 overflow-x-auto py-3"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            paddingLeft: "1rem",
            paddingRight: "0.5rem",
          }}
        >
          {categories.map((category, index) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: `scale(${getScale(index)})`,
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transformOrigin: index === 0 ? "left center" : "center center",
              }}
              className="whitespace-nowrap text-sm font-semibold text-white hover:text-yellow-300 hover:underline transition-colors block"
            >
              {category}
            </Link>
          ))}
          <button className="ml-2 shrink-0 cursor-pointer p-1 text-white hover:text-yellow-300 transition-transform hover:scale-110">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryBar;

import { ChevronRight } from "lucide-react";
import { useState } from "react";

const CategoryBar = () => {
  const categories = [
    "Electronics",
    "Women's Fashion",
    "Men's Fashion",
    "Kids' Fashion",
    "Beauty & Fragrance",
    "Home & Appliances",
    "Baby",
    "Toys & Games",
    "Sports & Outdoors",
    "Books & Media",
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.2;
    return 1;
  };

  return (
    <div className="bg-[#001a4d] border-b border-[#001a4d] sticky top-20 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          className="flex items-center gap-6 overflow-x-auto py-3"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {categories.map((category, index) => (
            <a
              key={category}
              href="#"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: `scale(${getScale(index)})`,
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className="whitespace-nowrap text-sm font-semibold text-white hover:text-yellow-300 hover:underline transition-colors origin-center"
            >
              {category}
            </a>
          ))}
          <button className="ml-2 flex-shrink-0 cursor-pointer p-1 text-white hover:text-yellow-300 transition-transform hover:scale-110">
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

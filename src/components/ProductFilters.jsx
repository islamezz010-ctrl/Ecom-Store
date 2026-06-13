import { Check, X } from "lucide-react";

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sort,
  onSortChange,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-white p-6 shadow-sm border border-[#e5e1e9]">
      {/* Sort Section */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#777682] mb-3">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-lg border border-[#e5e1e9] bg-[#f6f2fa] p-3 text-sm font-semibold outline-none transition focus:border-[#1a146b] focus:ring-2 focus:ring-[#1a146b]/10 cursor-pointer"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <hr className="border-[#e5e1e9]" />

      {/* Categories Section */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#777682] mb-3">Categories</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onCategoryChange("")}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer ${
              selectedCategory === ""
                ? "bg-[#1a146b] text-white shadow-md"
                : "text-[#474651] hover:bg-[#f6f2fa]"
            }`}
          >
            All Categories
            {selectedCategory === "" && <Check size={16} />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold capitalize transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1a146b] text-white shadow-md"
                  : "text-[#474651] hover:bg-[#f6f2fa]"
              }`}
            >
              {cat}
              {selectedCategory === cat && <Check size={16} />}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-[#e5e1e9]" />

      {/* Price Section */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#777682] mb-3">Price Range</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-[#777682] font-semibold mb-1 block">Min ($)</label>
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-full rounded-lg border border-[#e5e1e9] bg-[#f6f2fa] p-2 text-sm outline-none transition focus:border-[#1a146b] focus:ring-2 focus:ring-[#1a146b]/10"
              placeholder="0"
            />
          </div>
          <span className="text-[#c8c5d3] mt-5 font-bold">-</span>
          <div className="flex-1">
            <label className="text-xs text-[#777682] font-semibold mb-1 block">Max ($)</label>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-full rounded-lg border border-[#e5e1e9] bg-[#f6f2fa] p-2 text-sm outline-none transition focus:border-[#1a146b] focus:ring-2 focus:ring-[#1a146b]/10"
              placeholder="Any"
            />
          </div>
        </div>
      </div>

      {(selectedCategory !== "" || minPrice !== "" || maxPrice !== "" || sort !== "newest") && (
        <button
          onClick={onClearFilters}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[#c8c5d3] py-2.5 text-sm font-bold text-[#474651] transition hover:bg-[#ffdad6]/40 hover:text-[#ba1a1a] hover:border-[#ba1a1a]/30 cursor-pointer"
        >
          <X size={16} />
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default ProductFilters;

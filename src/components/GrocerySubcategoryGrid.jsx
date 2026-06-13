const grocerySubcategories = [
  { name: "Snacks", img: "https://placehold.co/150x150/ffffff/000000?text=Snacks" },
  { name: "Beverages", img: "https://placehold.co/150x150/ffffff/000000?text=Bev" },
  { name: "Laundry\nCare", img: "https://placehold.co/150x150/ffffff/000000?text=Wash" },
  { name: "Cleaning\nSupplies", img: "https://placehold.co/150x150/ffffff/000000?text=Clean" },
  { name: "Paper & Plastic\nWraps", img: "https://placehold.co/150x150/ffffff/000000?text=Paper" },
  { name: "Air Fresheners", img: "https://placehold.co/150x150/ffffff/000000?text=Air" },
  { name: "Cooking\n& Baking", img: "https://placehold.co/150x150/ffffff/000000?text=Cook" },
  { name: "Canned Food\n& Sauces", img: "https://placehold.co/150x150/ffffff/000000?text=Cans" },
  { name: "Baby\nEssentials", img: "https://placehold.co/150x150/ffffff/000000?text=Baby" },
  { name: "Health", img: "https://placehold.co/150x150/ffffff/000000?text=Health" },
  { name: "Personal Care", img: "https://placehold.co/150x150/ffffff/000000?text=Care" }
];

const GrocerySubcategoryGrid = () => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar justify-between">
          {grocerySubcategories.map((sub, i) => (
            <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group shrink-0 min-w-[90px] max-w-[90px]">
              {/* The rounded green background for the icon */}
              <div className="w-20 h-20 rounded-2xl bg-[#a0d8b3] flex items-center justify-center transition-transform group-hover:-translate-y-1 overflow-hidden p-2">
                <img src={sub.img} alt={sub.name.replace('\n', ' ')} className="w-full h-full object-cover mix-blend-multiply bg-white rounded-lg" />
              </div>
              <span className="text-xs font-semibold text-center text-gray-800 leading-snug whitespace-pre-line">
                {sub.name}
              </span>
            </div>
          ))}
        </div>
      </div>
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

export default GrocerySubcategoryGrid;

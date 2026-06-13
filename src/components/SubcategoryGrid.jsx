const mockSubcategories = [
  { name: "Powerbanks", img: "https://placehold.co/150x150/e2e8f0/475569?text=PB" },
  { name: "Wearables", img: "https://placehold.co/150x150/e2e8f0/475569?text=Wear" },
  { name: "Headphones", img: "https://placehold.co/150x150/e2e8f0/475569?text=Audio" },
  { name: "TVs", img: "https://placehold.co/150x150/e2e8f0/475569?text=TV" },
  { name: "Gaming", img: "https://placehold.co/150x150/e2e8f0/475569?text=Game" },
  { name: "Data Storage", img: "https://placehold.co/150x150/e2e8f0/475569?text=HDD" },
  { name: "Laptops", img: "https://placehold.co/150x150/e2e8f0/475569?text=Lap" },
  { name: "Mobiles", img: "https://placehold.co/150x150/e2e8f0/475569?text=Phone" },
  { name: "Cameras", img: "https://placehold.co/150x150/e2e8f0/475569?text=Cam" },
  { name: "Tablets", img: "https://placehold.co/150x150/e2e8f0/475569?text=Tab" },
  { name: "Networking", img: "https://placehold.co/150x150/e2e8f0/475569?text=Net" },
  { name: "Printers", img: "https://placehold.co/150x150/e2e8f0/475569?text=Print" },
  { name: "Controllers", img: "https://placehold.co/150x150/e2e8f0/475569?text=Ctrl" },
  { name: "Covers", img: "https://placehold.co/150x150/e2e8f0/475569?text=Cov" },
  { name: "Games", img: "https://placehold.co/150x150/e2e8f0/475569?text=Game" },
  { name: "Home Audio", img: "https://placehold.co/150x150/e2e8f0/475569?text=Spk" },
  { name: "Monitors", img: "https://placehold.co/150x150/e2e8f0/475569?text=Mon" },
  { name: "Input Devices", img: "https://placehold.co/150x150/e2e8f0/475569?text=Key" },
  { name: "Speakers", img: "https://placehold.co/150x150/e2e8f0/475569?text=Spk" },
  { name: "Receivers", img: "https://placehold.co/150x150/e2e8f0/475569?text=Rec" },
  { name: "Chargers & Cables", img: "https://placehold.co/150x150/e2e8f0/475569?text=Chg" },
  { name: "Surveillance Cameras", img: "https://placehold.co/150x150/e2e8f0/475569?text=Cam" },
  { name: "Small Appliances", img: "https://placehold.co/150x150/e2e8f0/475569?text=App" },
  { name: "Large Appliances", img: "https://placehold.co/150x150/e2e8f0/475569?text=App" }
];

const SubcategoryGrid = () => {
  return (
    <div className="bg-gradient-to-r from-[#e3eef8] via-[#f7e3e7] to-[#fae5e6]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-10 gap-x-2">
          {mockSubcategories.map((sub, i) => (
            <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-transform group-hover:-translate-y-2">
                <img src={sub.img} alt={sub.name} className="max-w-full max-h-full object-contain mix-blend-multiply rounded-md" />
              </div>
              <span className="text-xs font-bold text-center text-gray-800 leading-tight">
                {sub.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryGrid;

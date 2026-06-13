const CouponSection = () => {
  const coupons = [
    {
      code: "CLEAN100",
      brand: "Persil, Xtra",
      offer: "GET\n100 EGP OFF",
      img: "https://placehold.co/100x150/ffffff/000000?text=Persil"
    },
    {
      code: "B2G15",
      brand: "L'Oréal Paris",
      offer: "BUY 2,\nGET 15% OFF",
      img: "https://placehold.co/100x150/ffffff/000000?text=Loreal"
    },
    {
      code: "OFF50",
      brand: "Beverages & more",
      offer: "GET\n50 EGP OFF",
      img: "https://placehold.co/100x150/ffffff/000000?text=Evian"
    }
  ];

  return (
    <div className="bg-[#e9f0ea] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex justify-center items-center gap-3 mb-8">
          <h2 className="text-4xl font-serif italic text-black">Buy more,</h2>
          <h2 className="text-5xl font-black text-[#56b185] uppercase tracking-tighter">SAVE MORE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coupons.map((coupon, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between h-64 group cursor-pointer hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 bg-[#56b185] text-white text-xs font-bold px-4 py-2 rounded-br-2xl">
                Use code: <span className="text-base">{coupon.code}</span>
              </div>
              
              <div className="mt-8 z-10">
                <p className="text-gray-900 font-bold mb-4">{coupon.brand}</p>
                <h3 className="text-[#56b185] text-3xl font-black leading-tight whitespace-pre-line">
                  {coupon.offer}
                </h3>
              </div>

              <img 
                src={coupon.img} 
                alt={coupon.brand} 
                className="absolute -bottom-4 -right-4 w-32 h-40 object-contain transform group-hover:scale-105 transition-transform" 
              />
            </div>
          ))}

          {/* Shop All Coupons Card */}
          <div className="bg-white rounded-3xl p-6 flex items-center justify-center h-64 cursor-pointer hover:shadow-md transition-shadow">
            <h3 className="text-[#56b185] text-4xl font-black text-center leading-none tracking-tight">
              SHOP ALL<br />COUPONS
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponSection;

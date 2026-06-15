import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#40916c]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#d8f3dc] tracking-widest uppercase">
            ORGANIC & FRESH
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mt-2">
            FROM FARM TO
            <br />
            YOUR FAMILY'S
            <br />
            TABLE
          </h1>
          <button className="mt-8 bg-[#d8f3dc] text-[#1b4332] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Shop Fresh Produce
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Organic grains"
            className="absolute left-10 w-48 h-64 object-cover rounded-3xl shadow-2xl transform -rotate-12 border-4 border-white"
          />
          <img
            src="https://images.unsplash.com/photo-1553787434-dd5e2cd0e110?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Olive oil bottle"
            className="absolute right-10 w-52 h-72 object-cover rounded-3xl shadow-2xl transform rotate-6 border-8 border-white z-10"
          />
        </div>
      </>
    ),
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-amber-100 tracking-widest uppercase">
            PANTRY STAPLES & BEVERAGES
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mt-2">
            MORNING
            <br />
            REFRESHMENTS
          </h1>
          <p className="mt-4 text-xl text-amber-100 font-light">
            Fine coffee, green tea, and 100% pure organic juices.
          </p>
          <button className="mt-8 bg-white text-amber-900 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-amber-50 transition-colors shadow-lg cursor-pointer">
            Explore Beverages
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Cold brew coffee bottle"
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl transform rotate-3"
          />
        </div>
      </>
    ),
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#e2e8f0] to-[#cbd5e1]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-slate-600 tracking-widest uppercase">
            CRUNCHY & SWEET
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter mt-2">
            DELICIOUS
            <br />
            HEALTHY SNACKS
          </h1>
          <button className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-colors shadow-xl cursor-pointer">
            Shop Premium Snacks
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Snack nuts"
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white"
          />
        </div>
      </>
    ),
  },
];

const GroceryCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full overflow-hidden h-64 sm:h-80 md:h-112.5">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-0"
          } ${slide.bg}`}
        >
          <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between">
            {slide.content}
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center backdrop-blur-sm transition-colors text-white cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center backdrop-blur-sm transition-colors text-white cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              idx === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GroceryCarousel;

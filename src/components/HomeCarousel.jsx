import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#e8dfd8] via-[#dfd3c9] to-[#cebea9]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#6e5843] tracking-widest uppercase">
            INTERIOR DESIGN
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#3b2d20] leading-tight tracking-tight mt-2">
            COMFORT &<br />
            HARMONY FOR
            <br />
            YOUR SPACE
          </h1>
          <button className="mt-8 bg-[#3b2d20] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Shop Living Room
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Living room sofa"
            className="absolute left-10 w-48 h-64 object-cover rounded-3xl shadow-2xl transform -rotate-12 border-4 border-white"
          />
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Wooden side table"
            className="absolute right-10 w-52 h-72 object-cover rounded-3xl shadow-2xl transform rotate-6 border-8 border-white z-10"
          />
        </div>
      </>
    ),
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[#2d3748] via-[#4a5568] to-[#1a202c]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#a0aec0] tracking-widest uppercase">
            SMART LIVING
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mt-2">
            INTELLIGENT
            <br />
            APPLIANCES
          </h1>
          <p className="mt-4 text-xl text-gray-300 font-light">
            Engineered for clean, automated homes.
          </p>
          <button className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors shadow-lg cursor-pointer">
            Shop Smart Appliances
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Smart robot vacuum"
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl transform rotate-3"
          />
        </div>
      </>
    ),
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#eed8ce] via-[#e2c1b2] to-[#ce9b84]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-[#8c5740] tracking-widest uppercase">
            KITCHEN ESSENTIALS
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#5c311c] leading-none tracking-tighter mt-2">
            THE HEART OF
            <br />
            YOUR KITCHEN
          </h1>
          <button className="mt-8 bg-[#5c311c] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#442110] transition-colors shadow-xl cursor-pointer">
            Shop Cookware & Blenders
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Espresso maker"
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white"
          />
        </div>
      </>
    ),
  },
];

const HomeCarousel = () => {
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

export default HomeCarousel;

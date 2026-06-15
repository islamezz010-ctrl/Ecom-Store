import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#ebd6c8] via-[#ebd2c1] to-[#deb9a0]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#7c4d3a] tracking-widest uppercase">
            SUMMER COLLECTION
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#2e1c14] leading-tight tracking-tight mt-2">
            EFFORTLESS
            <br />
            STYLE FOR
            <br />
            EVERY DAY
          </h1>
          <button className="mt-8 bg-[#2e1c14] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Explore Collection
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Casual shirt"
            className="absolute left-10 w-48 h-64 object-cover rounded-3xl shadow-2xl transform -rotate-6 border-4 border-white"
          />
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Women's style"
            className="absolute right-10 w-52 h-72 object-cover rounded-3xl shadow-2xl transform rotate-6 border-8 border-white z-10"
          />
        </div>
      </>
    ),
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#0f172a]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#38bdf8] tracking-widest uppercase">
            STREETWEAR
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mt-2">
            URBAN
            <br />
            MOVEMENT
          </h1>
          <p className="mt-4 text-xl text-slate-300 font-light">
            Engineered for the city explorer.
          </p>
          <button className="mt-8 bg-[#38bdf8] text-slate-900 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#0ea5e9] transition-colors shadow-lg cursor-pointer">
            Shop Shoes & Jackets
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Streetwear shoes"
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl mix-blend-screen transform rotate-3"
          />
        </div>
      </>
    ),
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#f5f5f5] via-[#eaeaea] to-[#dedede]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">
            FINE JEWELRY & WATCHES
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter mt-2">
            TIMELESS
            <br />
            DETAILS
          </h1>
          <button className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors shadow-xl cursor-pointer">
            Discover Accessories
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Classic watch"
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white"
          />
        </div>
      </>
    ),
  },
];

const FashionCarousel = () => {
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

export default FashionCarousel;

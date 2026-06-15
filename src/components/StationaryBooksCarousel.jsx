import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#f5e6d3] via-[#ebd2b6] to-[#dcbba0]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#8b5e3c] tracking-widest uppercase">CREATIVE JOURNALING</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#5c3c21] leading-tight tracking-tight mt-2">
            WRITE IT. PLAN IT.<br />CREATE YOUR STORY.
          </h1>
          <button className="mt-8 bg-[#5c3c21] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Shop Notebooks
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583f7270bfbb?auto=format&fit=crop&q=80&w=400&h=500" 
            alt="Hardcover notebook" 
            className="absolute left-10 w-48 h-64 object-cover rounded-3xl shadow-2xl transform -rotate-12 border-4 border-white" 
          />
          <img 
            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400&h=500" 
            alt="Bullet journal setup" 
            className="absolute right-10 w-52 h-72 object-cover rounded-3xl shadow-2xl transform rotate-6 border-8 border-white z-10" 
          />
        </div>
      </>
    )
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[#7d8a7e] via-[#9bb1a1] to-[#cbd7c9]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-white tracking-widest uppercase">ART SUPPLIES & MARKERS</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mt-2">
            BOLD COLORS,<br />SHARP NOTES
          </h1>
          <p className="mt-4 text-xl text-slate-100 font-light">Fine pens, permanent markers, and watercolor paint sets.</p>
          <button className="mt-8 bg-white text-[#556b2f] px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-50 transition-colors shadow-lg cursor-pointer">
            Shop Pens & Art Kits
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Coloring pencils and highlighters" 
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl transform rotate-3" 
          />
        </div>
      </>
    )
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#8b2e2e] via-[#6d1a1a] to-[#2b0c0c]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-red-300 tracking-widest uppercase">MUST-READ LITERATURE</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mt-2">
            COZY READS &<br />FICTION BUNDLES
          </h1>
          <button className="mt-8 bg-white text-[#6d1a1a] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-50 transition-colors shadow-xl cursor-pointer">
            Explore Books & Novels
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-between">
          <img 
            src="https://images.unsplash.com/photo-1495446815901-a7297e3ffe02?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Bestselling books collection" 
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white" 
          />
        </div>
      </>
    )
  }
];

const StationaryBooksCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full overflow-hidden h-64 sm:h-80 md:h-[450px]">
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

export default StationaryBooksCarousel;

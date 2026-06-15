import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#e7ede5] via-[#dbe4d8] to-[#c7d5c3]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#4a5f43] tracking-widest uppercase">ORGANIC CARE</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#222e1f] leading-tight tracking-tight mt-2">
            PURE & RAW<br />SKIN THERAPY
          </h1>
          <button className="mt-8 bg-[#4a5f43] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Shop Skincare
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=400&h=500" 
            alt="Natural lotion" 
            className="absolute left-10 w-48 h-64 object-cover rounded-3xl shadow-2xl transform -rotate-12 border-4 border-white" 
          />
          <img 
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400&h=500" 
            alt="Vitamin C Serum" 
            className="absolute right-10 w-52 h-72 object-cover rounded-3xl shadow-2xl transform rotate-6 border-8 border-white z-10" 
          />
        </div>
      </>
    )
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[#fdfbf7] via-[#f8f3e5] to-[#ebdca9]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#8c6d12] tracking-widest uppercase">EXCLUSIVE SCENTS</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter mt-2">
            SIGNATURE<br />SCENTS
          </h1>
          <p className="mt-4 text-xl text-gray-700 font-light">Bold expressions, quiet whispers.</p>
          <button className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors shadow-lg cursor-pointer">
            Explore Fragrances
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Fragrance perfume" 
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl transform rotate-3" 
          />
        </div>
      </>
    )
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#fce4ec] to-[#f8bbd0]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-[#c2185b] tracking-widest uppercase">PROFESSIONAL MAKEUP</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#880e4f] leading-none tracking-tighter mt-2">
            DEFINE YOUR<br />GLOW
          </h1>
          <button className="mt-8 bg-[#880e4f] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#ad1457] transition-colors shadow-xl cursor-pointer">
            Shop Makeup
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Makeup brushes and palettes" 
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white" 
          />
        </div>
      </>
    )
  }
];

const BeautyCarousel = () => {
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

export default BeautyCarousel;

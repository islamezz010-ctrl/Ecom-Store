import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#faf0e6] via-[#f5e6d3] to-[#e6d0b8]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#8c6239] tracking-widest uppercase">SUPER SOFT FABRICS</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#5c3e21] leading-tight tracking-tight mt-2">
            DELICATE & COZY<br />ON BABY'S SKIN
          </h1>
          <button className="mt-8 bg-[#5c3e21] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Shop Baby Clothing
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=400&h=500" 
            alt="Baby onesie" 
            className="absolute left-10 w-48 h-64 object-cover rounded-3xl shadow-2xl transform -rotate-12 border-4 border-white" 
          />
          <img 
            src="https://images.unsplash.com/photo-1519689680058-2b0e6019e484?auto=format&fit=crop&q=80&w=400&h=500" 
            alt="Baby shoes knit" 
            className="absolute right-10 w-52 h-72 object-cover rounded-3xl shadow-2xl transform rotate-6 border-8 border-white z-10" 
          />
        </div>
      </>
    )
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#0369a1] tracking-widest uppercase">TRAVEL GEAR</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0c4a6e] leading-none tracking-tighter mt-2">
            SAFE & SMART<br />EXPLORING
          </h1>
          <p className="mt-4 text-xl text-[#0369a1] font-light">Engineered for comfort and top safety standards.</p>
          <button className="mt-8 bg-[#0c4a6e] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#075985] transition-colors shadow-lg cursor-pointer">
            Explore Car Seats & Strollers
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Safety stroller" 
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl transform rotate-3" 
          />
        </div>
      </>
    )
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-[#15803d] tracking-widest uppercase">FEEDING ESSENTIALS</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#14532d] leading-none tracking-tighter mt-2">
            HEALTHY & HAPPY<br />MEALTIMES
          </h1>
          <button className="mt-8 bg-[#14532d] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#166534] transition-colors shadow-xl cursor-pointer">
            Shop Bottles & Bibs
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Baby bottle set" 
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white" 
          />
        </div>
      </>
    )
  }
];

const BabyCarousel = () => {
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

export default BabyCarousel;

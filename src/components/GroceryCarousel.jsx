import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    bg: "bg-[#0b4d2c]", // Dark green background
    content: (
      <>
        <div className="z-10 max-w-lg py-12 pl-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f2d87e] leading-tight font-serif">
            The heart of<br />your kitchen
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-white font-medium">
            Everything you need,<br />for every meal & moment
          </p>
          <button className="mt-8 bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors shadow-lg cursor-pointer">
            Shop Now
          </button>
        </div>
        <div className="hidden md:block relative z-10 w-1/2 h-full">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-luminosity opacity-40"></div>
           <div className="absolute inset-0 flex items-center justify-center gap-4 p-8">
              <img src="https://placehold.co/150x300/1e3a8a/ffffff?text=Pasta" alt="Pasta" className="w-24 h-48 object-cover rotate-[-10deg] shadow-xl" />
              <img src="https://placehold.co/150x200/dc2626/ffffff?text=Sauce" alt="Sauce" className="w-24 h-32 object-cover shadow-xl z-10" />
              <img src="https://placehold.co/200x300/fcd34d/000000?text=Oil" alt="Oil" className="w-32 h-48 object-cover rotate-[5deg] shadow-xl" />
           </div>
        </div>
      </>
    )
  },
  {
    id: 2,
    bg: "bg-[#8b5a2b]", // Warm brown background
    content: (
      <>
        <div className="z-10 max-w-lg py-12 pl-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight">
            Beverages
          </h1>
          <p className="mt-2 text-4xl text-white italic font-light signature-font">
            All your go-tos,<br />one place
          </p>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center gap-6">
           <img src="https://placehold.co/100x200/1e40af/ffffff?text=Energy" alt="Drink" className="w-20 h-40 object-cover rotate-[-15deg] shadow-xl" />
           <img src="https://placehold.co/150x250/ef4444/ffffff?text=Juice" alt="Juice" className="w-32 h-48 object-cover shadow-xl z-10 -translate-y-4" />
           <img src="https://placehold.co/120x220/f59e0b/ffffff?text=Coffee" alt="Coffee" className="w-24 h-44 object-cover rotate-[10deg] shadow-xl" />
        </div>
        <div className="absolute right-10 bottom-10 z-20">
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors shadow-lg cursor-pointer">
            Shop Now
          </button>
        </div>
      </>
    )
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#e2e8f0] to-[#f8fafc]", // Light grey gradient
    content: (
      <>
        <div className="z-10 max-w-lg py-12 pl-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black leading-tight italic">
            Start your week
          </h1>
          <p className="mt-2 text-3xl text-gray-800 font-light">
            with a sparkling home!
          </p>
          <button className="mt-8 bg-black text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors shadow-lg cursor-pointer">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center gap-4">
           <img src="https://placehold.co/200x300/ec4899/ffffff?text=Detergent" alt="Detergent" className="w-40 h-56 object-cover shadow-xl z-10" />
           <img src="https://placehold.co/150x250/22c55e/ffffff?text=Cleaner" alt="Cleaner" className="w-24 h-48 object-cover shadow-xl translate-y-4" />
           <img src="https://placehold.co/100x200/ffffff/000000?text=Brush" alt="Brush" className="w-20 h-32 object-cover shadow-xl translate-y-8" />
        </div>
      </>
    )
  },
  {
    id: 4,
    bg: "bg-[#4ade80]", // Green background
    content: (
      <>
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20">
          <div className="w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="z-10 flex flex-col items-center justify-center w-full text-center py-8">
          <p className="text-3xl text-white font-serif italic">Supermarket</p>
          <div className="flex items-center gap-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight">
              Weekend Sale
            </h1>
            <div className="text-white text-left leading-none">
               <span className="text-2xl font-bold block">UP TO</span>
               <span className="text-6xl font-black block">70<span className="text-3xl">%</span></span>
               <span className="text-xl font-bold block">OFF</span>
            </div>
          </div>
          <p className="text-4xl text-[#fde047] font-bold tracking-widest mt-2 uppercase">Summer Edition</p>
          <button className="mt-6 bg-white text-black px-10 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors shadow-lg cursor-pointer">
            Shop Now
          </button>
        </div>
        {/* Floating elements */}
        <img src="https://placehold.co/120x160/ef4444/ffffff?text=Chips" alt="Chips" className="absolute left-10 top-1/2 -translate-y-1/2 w-24 h-32 rotate-[-15deg] shadow-xl z-10" />
        <img src="https://placehold.co/80x160/f59e0b/ffffff?text=Syrup" alt="Syrup" className="absolute left-40 top-1/4 w-16 h-32 rotate-[15deg] shadow-xl z-10" />
        <img src="https://placehold.co/150x250/22c55e/ffffff?text=Ariel" alt="Ariel" className="absolute right-40 top-1/2 -translate-y-1/2 w-32 h-48 rotate-[-10deg] shadow-xl z-10" />
        <img src="https://placehold.co/120x240/a855f7/ffffff?text=Shampoo" alt="Shampoo" className="absolute right-10 top-1/4 w-24 h-48 rotate-[10deg] shadow-xl z-10" />
      </>
    )
  }
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
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full overflow-hidden h-64 sm:h-80 md:h-[400px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-0"
          } ${slide.bg}`}
        >
          <div className="relative h-full mx-auto max-w-7xl flex items-center justify-between overflow-hidden">
            {slide.content}
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
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

      {/* Dots */}
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

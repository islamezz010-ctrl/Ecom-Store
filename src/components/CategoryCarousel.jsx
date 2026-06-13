import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#8bb0c4] via-[#c6d7e0] to-[#9cbccf]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            CRYSTAL-<span className="italic font-light">clear</span><br />
            SOUNDS<br />
            <span className="italic font-light">& immersive</span><br />
            EXPERIENCES
          </h1>
          <button className="mt-8 bg-white text-[#1b1b21] px-8 py-3 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400&h=400" 
            alt="Earbuds" 
            className="absolute left-10 top-1/4 w-48 h-48 object-cover rounded-3xl shadow-2xl transform -rotate-12 mix-blend-multiply" 
          />
          <img 
            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400&h=400" 
            alt="Smartwatch" 
            className="absolute right-10 top-1/3 w-56 h-56 object-cover rounded-full shadow-2xl transform rotate-6 border-8 border-white" 
          />
        </div>
      </>
    )
  },
  {
    id: 2,
    bg: "bg-[#5b9bd5]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter">
            IMMERSIVE<br />SOUND
          </h1>
          <p className="mt-2 text-2xl text-white italic font-light">Unmatched clarity.</p>
          <button className="mt-8 bg-white text-[#1b1b21] px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors shadow-lg cursor-pointer">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1606220588913-b3eea4ce447a?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Black Earbuds" 
            className="w-80 h-80 object-cover object-center rounded-3xl mix-blend-multiply" 
          />
        </div>
      </>
    )
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#e6f0f9] to-[#fce4ec]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <h2 className="text-2xl font-black text-black tracking-widest uppercase">Your go-to for</h2>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black leading-none tracking-tighter mt-1">
            ELECTRONIC<br />DEVICES
          </h1>
          <button className="mt-8 bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors shadow-xl cursor-pointer">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Electronics setup" 
            className="w-full max-w-md object-cover rounded-3xl mix-blend-multiply" 
          />
        </div>
      </>
    )
  },
  {
    id: 4,
    bg: "bg-[#1a1a1a]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <h1 className="text-5xl sm:text-6xl md:text-6xl font-bold text-white leading-tight">
            Premium mobiles
          </h1>
          <p className="mt-2 text-3xl text-[#f36b22] font-light">Performance like no other ✨</p>
          <button className="mt-8 bg-white text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors shadow-lg cursor-pointer">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
           <img 
            src="https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&q=80&w=400&h=400" 
            alt="Premium Phone" 
            className="w-64 h-80 object-cover rounded-3xl rotate-12" 
          />
        </div>
      </>
    )
  },
  {
    id: 5,
    bg: "bg-gradient-to-r from-[#2c1313] to-[#4a2211]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <h2 className="text-4xl text-gray-300 font-light tracking-wide">Your perfect</h2>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tighter italic">
            SET UP!
          </h1>
          <button className="mt-8 bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors shadow-lg cursor-pointer">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&q=80&w=600&h=400" 
            alt="Gaming Setup" 
            className="w-full max-w-lg object-cover rounded-2xl shadow-2xl" 
          />
        </div>
      </>
    )
  }
];

const CategoryCarousel = () => {
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
          {/* subtle background overlay effect */}
          {index === 0 && <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>}
          
          <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between">
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

export default CategoryCarousel;

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#1e272e] via-[#2d3436] to-[#0f0c1b]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#00d2d3] tracking-widest uppercase">TRAIN HARDER</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mt-2">
            PUSH YOUR LIMITS,<br />BUILD YOUR STRENGTH
          </h1>
          <button className="mt-8 bg-[#00d2d3] text-[#1e272e] px-8 py-3 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Explore Fitness Gear
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400&h=500" 
            alt="Dumbbell Gym Workout" 
            className="absolute left-10 w-48 h-64 object-cover rounded-3xl shadow-2xl transform -rotate-12 border-4 border-[#00d2d3]" 
          />
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400&h=500" 
            alt="Gym accessories" 
            className="absolute right-10 w-52 h-72 object-cover rounded-3xl shadow-2xl transform rotate-6 border-8 border-white z-10" 
          />
        </div>
      </>
    )
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[#3867d6] via-[#4b7bec] to-[#2d3436]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#fed330] tracking-widest uppercase">OUTDOOR ADVENTURE</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mt-2">
            EXPLORE THE<br />WILDERNESS
          </h1>
          <p className="mt-4 text-xl text-indigo-100 font-light">Tents, sleeping bags, and heavy duty hiking backpacks.</p>
          <button className="mt-8 bg-[#fed330] text-gray-900 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#f7b731] transition-colors shadow-lg cursor-pointer">
            Shop Camping Gear
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Camping Tent in nature" 
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl transform rotate-3" 
          />
        </div>
      </>
    )
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#2c3e50] via-[#e67e22] to-[#d35400]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-white tracking-widest uppercase">HIGH SPEED CYCLING</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mt-2">
            SPEED & ROAD<br />ENDURANCE
          </h1>
          <button className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors shadow-xl cursor-pointer">
            Shop Bicycles & Helmets
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1557803175-2dfb8fce9dbe?auto=format&fit=crop&q=80&w=500&h=500" 
            alt="Cycling cyclist helmet" 
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white" 
          />
        </div>
      </>
    )
  }
];

const SportsCarousel = () => {
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

export default SportsCarousel;

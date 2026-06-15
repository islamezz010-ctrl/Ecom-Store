import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[#ff9f43] via-[#ffb85f] to-[#ffcd85]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#b33925] tracking-widest uppercase">
            CREATIVE PLAY
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#6b1d10] leading-tight tracking-tight mt-2">
            IMAGINE, DESIGN
            <br />& BUILD WONDERS
          </h1>
          <button className="mt-8 bg-[#6b1d10] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl cursor-pointer">
            Shop Building Blocks
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1587654780014-d1e6a5ca0f0d?auto=format&fit=crop&q=80&w=400&h=500"
            alt="LEGO Building Blocks"
            className="absolute left-10 w-48 h-64 object-cover rounded-3xl shadow-2xl transform -rotate-12 border-4 border-white"
          />
          <img
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400&h=500"
            alt="Toy blocks"
            className="absolute right-10 w-52 h-72 object-cover rounded-3xl shadow-2xl transform rotate-6 border-8 border-white z-10"
          />
        </div>
      </>
    ),
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[#6c5ce7] via-[#8575f4] to-[#a29bfe]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <span className="text-sm font-bold text-[#dff9fb] tracking-widest uppercase">
            FAMILY GAME NIGHT
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mt-2">
            UNPLUG & PLAY
            <br />
            TOGETHER
          </h1>
          <p className="mt-4 text-xl text-indigo-100 font-light">
            Classic chess, trivia, and modern strategic games.
          </p>
          <button className="mt-8 bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-indigo-50 transition-colors shadow-lg cursor-pointer">
            Browse Board Games
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Chess board game"
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl transform rotate-3"
          />
        </div>
      </>
    ),
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[#00cec9] via-[#81ecec] to-[#a8e6cf]",
    content: (
      <>
        <div className="z-10 max-w-lg flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-[#0984e3] tracking-widest uppercase">
            OUTDOOR SPORT & PLAY
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0f2c59] leading-none tracking-tighter mt-2">
            ACTIVE FUN IN
            <br />
            THE SUNshine
          </h1>
          <button className="mt-8 bg-[#0f2c59] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1e3a8a] transition-colors shadow-xl cursor-pointer">
            Explore Outdoor Toys
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Active kids play"
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white"
          />
        </div>
      </>
    ),
  },
];

const ToysCarousel = () => {
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

export default ToysCarousel;

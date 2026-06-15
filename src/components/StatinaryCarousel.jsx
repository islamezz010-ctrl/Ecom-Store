import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    bg: "bg-[#f5e6d3]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#8b2e2e] leading-tight tracking-tight">
            Write It.
            <br />
            Plan It.
            <br />
            Slay It
          </h1>
          <p className="mt-3 text-xl text-[#666] font-semibold">Notebooks</p>
          <button className="mt-8 bg-[#1a1a1a] text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#333] transition-colors shadow-lg cursor-pointer rounded">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583f7270bfbb?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Notebooks"
            className="w-full max-w-sm object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </>
    ),
  },
  {
    id: 2,
    bg: "bg-[#f9ede1]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#ff6b4a] leading-tight tracking-tight">
            Markers and
            <br />
            highlighters
          </h1>
          <p className="mt-3 text-xl text-[#666] font-semibold">
            Bold color for clear notes!
          </p>
          <button className="mt-8 bg-[#1a1a1a] text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#333] transition-colors shadow-lg cursor-pointer rounded">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Markers"
            className="w-full max-w-sm object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </>
    ),
  },
  {
    id: 3,
    bg: "bg-[#7d8a7e]",
    content: (
      <>
        <div className="z-10 max-w-lg">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight">
            ALL YOUR
            <br />
            OFFICE
            <br />
            ESSENTIALS,
            <span className="italic font-light text-4xl"> in-one-place</span>
          </h1>
          <button className="mt-8 bg-white text-[#1a1a1a] px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors shadow-lg cursor-pointer rounded">
            Shop Now
          </button>
        </div>
        <div className="hidden md:flex relative z-10 w-1/2 h-full items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1612548403641-d8c50ba89177?auto=format&fit=crop&q=80&w=500&h=500"
            alt="Office Essentials"
            className="w-full max-w-sm object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </>
    ),
  },
];

const StatinaryCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden rounded-lg">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`${slide.bg} w-full h-full flex items-center px-6 sm:px-8 md:px-12`}
          >
            {slide.content}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#1a1a1a] p-2 rounded-full shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#1a1a1a] p-2 rounded-full shadow-lg transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StatinaryCarousel;

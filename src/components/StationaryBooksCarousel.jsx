import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    bg: "bg-[#f5e6d3]",
    title: "Write It. Plan It. Slay It",
    subtitle: "Notebooks",
    titleColor: "text-[#8b2e2e]",
    textColor: "text-[#1a1a1a]",
    image:
      "https://images.unsplash.com/photo-1507842217343-583f7270bfbb?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 2,
    bg: "bg-[#f9ede1]",
    title: "Markers and highlighters",
    subtitle: "Bold color for clear notes!",
    titleColor: "text-[#ff6b4a]",
    textColor: "text-[#1a1a1a]",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 3,
    bg: "bg-[#7d8a7e]",
    title: "ALL YOUR OFFICE ESSENTIALS",
    subtitle: "in-one-place",
    titleColor: "text-white",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1612548403641-d8c50ba89177?auto=format&fit=crop&q=80&w=400&h=500",
  },
];

const StationaryBooksCarousel = () => {
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

  const currentSlideData = slides[currentSlide];

  return (
    <div className="mx-auto max-w-md">
      {/* Main Carousel Container - Vertical/Tall */}
      <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-xl">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`${slide.bg} w-full h-full flex flex-col items-center justify-between p-6`}
            >
              {/* Text Content */}
              <div className="flex flex-col items-center justify-center flex-1 text-center pt-4">
                <h1
                  className={`text-2xl sm:text-3xl font-black leading-tight tracking-tight mb-2 ${slide.titleColor}`}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-base sm:text-lg font-semibold ${slide.textColor}`}
                >
                  {slide.subtitle}
                </p>
              </div>

              {/* Image */}
              <div className="w-full flex justify-center mb-4">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-40 h-48 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Button */}
              <button
                className={`px-6 py-2 font-bold uppercase tracking-widest text-sm rounded hover:opacity-90 transition-opacity shadow-md ${
                  index === 2
                    ? "bg-white text-[#1a1a1a]"
                    : "bg-[#1a1a1a] text-white"
                }`}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#1a1a1a] p-2 rounded-full shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#1a1a1a] p-2 rounded-full shadow-lg transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationaryBooksCarousel;

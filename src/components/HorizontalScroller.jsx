import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const HorizontalScroller = ({
  children,
  className = "",
  contentClassName = "",
  ariaLabel = "Scrollable items",
}) => {
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    setCanScrollLeft(scroller.scrollLeft > 2);
    setCanScrollRight(scroller.scrollLeft < maxScrollLeft - 2);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const frameId = requestAnimationFrame(updateScrollState);
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(scroller);
    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, children]);

  const scrollByPage = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * Math.max(scroller.clientWidth * 0.8, 240),
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative horizontal-scroller ${className}`}>
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        disabled={!canScrollLeft}
        aria-label={`Scroll ${ariaLabel} left`}
        className="absolute left-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a146b] shadow-md ring-1 ring-black/10 transition hover:bg-[#1a146b] hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        className={`horizontal-scroller__viewport overflow-x-auto scroll-smooth pb-4 ${contentClassName}`}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => scrollByPage(1)}
        disabled={!canScrollRight}
        aria-label={`Scroll ${ariaLabel} right`}
        className="absolute right-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a146b] shadow-md ring-1 ring-black/10 transition hover:bg-[#1a146b] hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>
    </div>
  );
};

export default HorizontalScroller;

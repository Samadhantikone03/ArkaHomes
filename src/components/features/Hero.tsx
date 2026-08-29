import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

import heroVillaImg from "@/assets/hero-villa.jpg";
import sliderHyderabadImg from "@/assets/slider-hyderabad.jpg";
import sliderPuneImg from "@/assets/slider-pune.jpg";
import sliderChennaiImg from "@/assets/slider-chennai.jpg";
import sliderKeralaImg from "@/assets/slider-kerala.jpg";
import sliderHillsideImg from "@/assets/slider-hillside.jpg";
import sliderBluehourImg from "@/assets/slider-bluehour.jpg";

interface Slide {
  src: string;
  alt: string;
  location: string;
  /** Ken Burns variant — controls direction of pan */
  kb: "a" | "b" | "c" | "d" | "e" | "f" | "g";
}

const slides: Slide[] = [
  {
    src: heroVillaImg,
    alt: "Premium luxury villa with tropical landscaping and golden evening light — Bangalore",
    location: "Bangalore",
    kb: "a",
  },
  {
    src: sliderHyderabadImg,
    alt: "Contemporary villa at golden hour with cantilevered roof and reflective pool — Hyderabad",
    location: "Hyderabad",
    kb: "b",
  },
  {
    src: sliderPuneImg,
    alt: "Minimalist exposed concrete villa with private courtyard — Pune",
    location: "Pune",
    kb: "c",
  },
  {
    src: sliderChennaiImg,
    alt: "Luxury tropical villa with palm trees and open verandah — Chennai",
    location: "Chennai",
    kb: "d",
  },
  {
    src: sliderKeralaImg,
    alt: "Modern courtyard home with traditional Kerala architecture — Kerala",
    location: "Kerala",
    kb: "e",
  },
  {
    src: sliderHillsideImg,
    alt: "Contemporary hillside residence at blue hour with valley views — Bangalore Hills",
    location: "Bangalore Hills",
    kb: "f",
  },
  {
    src: sliderBluehourImg,
    alt: "Grand luxury residence at cinematic blue hour dusk — India",
    location: "India",
    kb: "g",
  },
];

const DISPLAY_DURATION = 5000; // ms each slide is shown
const TRANSITION_DURATION = 1200; // ms crossfade

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Touch / swipe state
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const goTo = useCallback(
    (nextIdx: number) => {
      if (transitioning) return;
      setPrev(current);
      setCurrent(nextIdx);
      setTransitioning(true);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, TRANSITION_DURATION + 50);
    },
    [current, transitioning]
  );

  const goNext = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );
  const goPrev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  );

  // Autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(goNext, DISPLAY_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, goNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 44) {
      delta < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Format slide number e.g. "01 / 07"
  const fmt = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-10 hero-fadein">
      <div className="max-w-8xl mx-auto">
        {/* ── Hero Container ── */}
        <div
          className="relative w-full rounded-3xl overflow-hidden min-h-[82vh] lg:min-h-[88vh]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* ══════════════════════════════════════
              BACKGROUND SLIDES — crossfade stack
          ══════════════════════════════════════ */}
          <div className="absolute inset-0" aria-hidden="true">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              const isPrev = idx === prev;
              const isVisible = isActive || isPrev;

              return (
                <div
                  key={idx}
                  className="absolute inset-0"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: reducedMotion
                      ? "none"
                      : `opacity ${TRANSITION_DURATION}ms ease-in-out`,
                    zIndex: isActive ? 2 : isPrev ? 1 : 0,
                  }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={
                      !reducedMotion && isVisible
                        ? {
                            animation: isActive
                              ? `kenburns-${slide.kb} 6500ms ease-out forwards`
                              : "none",
                          }
                        : undefined
                    }
                  />
                </div>
              );
            })}

            {/* Gradient overlays — always on top of images */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 3 }}
            >
              {/* Left-to-right gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-transparent" />
              {/* Top + bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-black/12" />
              {/* Vignette edges */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.32) 100%)",
                }}
              />
            </div>
          </div>

          {/* ══════════════════════════════════════
              CONTENT LAYER — stable above slides
          ══════════════════════════════════════ */}
          <div
            className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 min-h-[82vh] lg:min-h-[88vh]"
            style={{ zIndex: 10 }}
          >
            {/* ── Top: Headline + CTAs ── */}
            <div className="max-w-2xl pt-6 lg:pt-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B5905A]" />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/70">
                  Premium Home Construction
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.08] tracking-tight mb-6">
                Building exceptional
                <br />
                homes for the way
                <br />
                <span className="font-semibold">you live.</span>
              </h1>

              <p className="text-base lg:text-lg text-white/65 max-w-md leading-relaxed mb-10">
                From architecture to handover, we build thoughtfully designed
                homes with uncompromising quality.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleScroll("#contact")}
                  className="group inline-flex items-center gap-3 bg-white text-[#171717] text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-[#F0E6D3] hover:shadow-xl hover:shadow-black/20 hover:scale-[1.02]"
                >
                  Start Your Project
                  <span className="w-8 h-8 rounded-full bg-[#171717]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowUpRight size={14} />
                  </span>
                </button>

                <button className="group inline-flex items-center gap-3 text-white text-sm font-medium transition-all duration-300 hover:gap-4">
                  <span className="w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/20">
                    <Play size={14} className="ml-0.5 fill-white" />
                  </span>
                  Watch Our Story
                </button>
              </div>
            </div>

            {/* ── Bottom Row: Info card + Slider controls ── */}
            <div className="flex flex-col sm:flex-row items-end justify-between gap-6">
              {/* Info Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 max-w-[280px]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#B5905A]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#F0E6D3] text-sm">◈</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">Built around you</p>
                    <p className="text-white/65 text-xs leading-relaxed">
                      Every home is designed around your lifestyle, site and vision.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleScroll("#about")}
                  className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1.5 transition-all duration-200 hover:gap-2"
                >
                  Explore our approach
                  <ArrowUpRight size={12} />
                </button>
              </div>

              {/* ── Slider Controls ── */}
              <div className="flex items-center gap-3 select-none">
                {/* Dots */}
                <div className="hidden sm:flex items-center gap-1.5 mr-1">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className="relative flex items-center justify-center transition-all duration-300"
                      style={{ width: idx === current ? 24 : 8, height: 8 }}
                    >
                      <span
                        className="block rounded-full transition-all duration-500"
                        style={{
                          width: "100%",
                          height: idx === current ? 5 : 4,
                          backgroundColor:
                            idx === current
                              ? "rgba(255,255,255,0.95)"
                              : "rgba(255,255,255,0.35)",
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Counter */}
                <span className="text-white/70 text-xs font-semibold tracking-widest tabular-nums min-w-[48px] text-center">
                  {fmt(current)} / {fmt(slides.length - 1)}
                </span>

                {/* Prev */}
                <button
                  onClick={goPrev}
                  aria-label="Previous slide"
                  className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-white/25 hover:border-white/50 hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Next */}
                <button
                  onClick={goNext}
                  aria-label="Next slide"
                  className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-white/25 hover:border-white/50 hover:scale-110 active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Location pill — subtle current location indicator */}
            <div
              className="absolute top-8 sm:top-12 right-8 sm:right-12 pointer-events-none"
              aria-hidden="true"
            >
              <div
                key={current}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1.5 hero-location-pill"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B5905A] flex-shrink-0" />
                <span className="text-white/80 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {slides[current].location}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            {!reducedMotion && (
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 pointer-events-none"
                aria-hidden="true"
                style={{ zIndex: 10 }}
              >
                <div
                  key={`progress-${current}`}
                  className="h-full bg-white/50 hero-progress"
                  style={
                    paused
                      ? { animationPlayState: "paused" }
                      : undefined
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

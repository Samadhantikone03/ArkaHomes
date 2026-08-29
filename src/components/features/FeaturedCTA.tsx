import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import featuredImg from "@/assets/featured-villa.jpg";

export default function FeaturedCTA() {
  const bgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const offset = -rect.top * 0.22;
      bgRef.current.style.transform = `translateY(${offset}px) scale(1.12)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-10">
      <div className="max-w-8xl mx-auto">
        <div ref={sectionRef} className="relative rounded-3xl overflow-hidden min-h-[480px] lg:min-h-[580px]">
          {/* Background — parallax */}
          <img
            ref={bgRef}
            src={featuredImg}
            alt="Luxury Indian villa at dusk — cinematic architectural photography"
            className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
            style={{ transformOrigin: "center center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end h-full p-10 sm:p-14 lg:p-20 min-h-[480px] lg:min-h-[580px]">
            <div className="max-w-xl reveal">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-5">
                Your dream home —<br />
                built beautifully,
                <br />
                <span className="font-semibold">built to last.</span>
              </h2>
              <p className="text-base text-white/65 leading-relaxed mb-10 max-w-sm">
                Tell us about your vision and our team will help turn it into
                a thoughtfully designed, professionally built home.
              </p>
              <button
                onClick={handleScroll}
                className="group inline-flex items-center gap-3 bg-white text-[#171717] text-sm font-semibold px-7 py-4 rounded-full transition-all duration-300 hover:bg-[#F0E6D3] hover:shadow-2xl hover:shadow-black/30 hover:scale-[1.02]"
              >
                Get a Consultation
                <span className="w-8 h-8 rounded-full bg-[#171717]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowUpRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

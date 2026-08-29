import { ArrowUpRight } from "lucide-react";
import aboutImg from "@/assets/about-team.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left Image */}
          <div className="reveal img-zoom rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[520px]">
            <img
              src={aboutImg}
              alt="ARKA team reviewing architectural plans"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Content */}
          <div className="reveal reveal-delay-2 flex flex-col justify-center">
            <p className="section-label mb-5">About Us</p>

            <h2 className="text-4xl lg:text-5xl font-light text-[#171717] leading-[1.1] tracking-tight mb-7">
              Thoughtful design.
              <br />
              <span className="font-semibold">Exceptional execution.</span>
            </h2>

            <p className="text-base text-[#6B6B67] leading-[1.75] mb-10 max-w-md">
              We believe a home should be more than a structure. It should reflect the
              people who live in it. Our team brings together architecture, engineering
              and construction expertise to deliver homes that balance beauty, function
              and lasting quality.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-y border-[#E5E5E1]">
              {[
                { val: "15+", label: "Years building" },
                { val: "250+", label: "Homes delivered" },
                { val: "4", label: "Cities served" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-light text-[#171717] mb-0.5">{s.val}</p>
                  <p className="text-xs text-[#6B6B67] font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            <button className="group inline-flex items-center gap-3 bg-[#171717] text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-lg self-start">
              More About Us
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

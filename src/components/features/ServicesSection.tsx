import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ArchIcon = ({ active }: { active: boolean }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="1"
      y="1"
      width="10"
      height="13"
      rx="1.5"
      fill={active ? "white" : "#171717"}
    />
    <rect
      x="14"
      y="1"
      width="13"
      height="8"
      rx="1.5"
      fill={active ? "rgba(255,255,255,0.4)" : "#D0CFC9"}
    />
    <rect
      x="14"
      y="12"
      width="13"
      height="8"
      rx="1.5"
      fill={active ? "rgba(255,255,255,0.25)" : "#E5E5E1"}
    />
    <rect
      x="1"
      y="17"
      width="10"
      height="10"
      rx="1.5"
      fill={active ? "rgba(255,255,255,0.4)" : "#D0CFC9"}
    />
  </svg>
);

const BuildIcon = ({ active }: { active: boolean }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="4"
      y="14"
      width="20"
      height="13"
      rx="1.5"
      fill={active ? "white" : "#171717"}
    />
    <rect
      x="9"
      y="8"
      width="10"
      height="8"
      rx="1.5"
      fill={active ? "rgba(255,255,255,0.5)" : "#D0CFC9"}
    />
    <rect
      x="13"
      y="2"
      width="2"
      height="7"
      rx="1"
      fill={active ? "rgba(255,255,255,0.6)" : "#B0AFA9"}
    />
    <rect
      x="9"
      y="18"
      width="4"
      height="5"
      rx="1"
      fill={active ? "rgba(0,0,0,0.25)" : "white"}
    />
    <rect
      x="15"
      y="18"
      width="4"
      height="5"
      rx="1"
      fill={active ? "rgba(0,0,0,0.25)" : "white"}
    />
  </svg>
);

const InteriorIcon = ({ active }: { active: boolean }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="1"
      y="1"
      width="26"
      height="16"
      rx="2"
      fill={active ? "white" : "#171717"}
    />
    <rect
      x="3"
      y="3"
      width="10"
      height="12"
      rx="1"
      fill={active ? "rgba(0,0,0,0.2)" : "white"}
    />
    <rect
      x="15"
      y="3"
      width="10"
      height="5"
      rx="1"
      fill={active ? "rgba(0,0,0,0.15)" : "white"}
    />
    <rect
      x="1"
      y="20"
      width="8"
      height="7"
      rx="1.5"
      fill={active ? "rgba(255,255,255,0.45)" : "#D0CFC9"}
    />
    <rect
      x="11"
      y="20"
      width="16"
      height="7"
      rx="1.5"
      fill={active ? "rgba(255,255,255,0.25)" : "#E5E5E1"}
    />
  </svg>
);

const services: Service[] = [
  {
    id: "architecture",
    title: "Architecture & Design",
    description:
      "Thoughtful architectural design tailored to your site, lifestyle and vision.",
    icon: null,
  },
  {
    id: "construction",
    title: "Turnkey Construction",
    description:
      "Complete construction management from foundation to finishing, handled by one experienced team.",
    icon: null,
  },
  {
    id: "interiors",
    title: "Interiors & Finishing",
    description:
      "Beautiful interiors, premium materials and carefully executed finishing details.",
    icon: null,
  },
];

const ServiceIcon = ({
  id,
  active,
}: {
  id: string;
  active: boolean;
}) => {
  if (id === "architecture") return <ArchIcon active={active} />;
  if (id === "construction") return <BuildIcon active={active} />;
  return <InteriorIcon active={active} />;
};

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("architecture");

  return (
    <section
      id="services"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-[#F5F5F2]"
    >
      <div className="max-w-8xl mx-auto">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10 lg:mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-light text-[#171717] leading-[1.1] tracking-tight mb-4">
              Construction{" "}
              <span className="font-semibold">Services</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B67] leading-relaxed max-w-sm">
              From concept and planning to construction and handover, we provide
              complete solutions for building your dream home.
            </p>
          </div>

          {/* View All Services CTA */}
          <div className="flex-shrink-0 sm:pt-1">
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2.5 bg-[#171717] text-white text-xs font-bold tracking-[0.12em] uppercase px-5 py-3.5 rounded-full transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-md"
            >
              View All Services
              <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight size={11} />
              </span>
            </button>
          </div>
        </div>

        {/* ── Service Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#D5D5D1] rounded-2xl overflow-hidden">
          {services.map((svc, idx) => {
            const isActive = svc.id === activeId;
            const isLast = idx === services.length - 1;

            return (
              <button
                key={svc.id}
                className={[
                  "group relative flex flex-col justify-between text-left",
                  "min-h-[360px] lg:min-h-[400px] p-7 lg:p-8",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-inset",
                  // right border divider for all except last
                  !isLast
                    ? "border-b sm:border-b-0 sm:border-r border-[#D5D5D1]"
                    : "",
                  // last card on mobile needs no bottom border
                  isLast ? "" : "",
                  // Colors
                  isActive
                    ? "bg-[#1D1E20]"
                    : "bg-white hover:bg-[#1D1E20]",
                  // Transition
                  "transition-colors duration-[420ms] ease-in-out",
                  // Cursor
                  "cursor-pointer",
                ].join(" ")}
                onMouseEnter={() => setActiveId(svc.id)}
                onFocus={() => setActiveId(svc.id)}
                onClick={() => setActiveId(svc.id)}
                aria-pressed={isActive}
                aria-label={`${svc.title} service`}
              >
                {/* ── Top Row: Icon + Arrow ── */}
                <div className="flex items-start justify-between w-full">
                  {/* Icon block */}
                  <div
                    className={[
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-[420ms] flex-shrink-0",
                      isActive
                        ? "bg-white/15"
                        : "bg-[#F0F0EC] group-hover:bg-white/15",
                    ].join(" ")}
                  >
                    <ServiceIcon id={svc.id} active={isActive} />
                  </div>

                  {/* Arrow — shown on active/hover */}
                  <span
                    className={[
                      "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-[420ms] flex-shrink-0",
                      isActive
                        ? "border-white/30 text-white opacity-100"
                        : "border-[#D5D5D1] text-[#6B6B67] opacity-0 group-hover:opacity-100 group-hover:border-white/30 group-hover:text-white",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={14} />
                  </span>
                </div>

                {/* ── Bottom: Title + Description ── */}
                <div className="mt-auto">
                  {/* Description — only visible when active */}
                  <p
                    className={[
                      "text-sm leading-relaxed mb-4 max-w-[260px] transition-all duration-[420ms]",
                      isActive
                        ? "text-white/60 opacity-100 translate-y-0"
                        : "text-white/60 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0",
                    ].join(" ")}
                  >
                    {svc.description}
                  </p>

                  {/* Title */}
                  <h3
                    className={[
                      "text-[26px] lg:text-[28px] font-semibold leading-[1.15] tracking-tight transition-colors duration-[420ms]",
                      isActive
                        ? "text-white"
                        : "text-[#171717] group-hover:text-white",
                    ].join(" ")}
                  >
                    {svc.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

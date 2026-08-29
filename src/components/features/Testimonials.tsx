import { useRef } from "react";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  project: string;
  initials: string;
  bg: string; // initials bg colour
}

const ALL_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "From the first consultation to the final handover, everything was handled with remarkable attention to detail. We always knew what was happening at every stage — it made the whole experience genuinely enjoyable.",
    name: "Ananya & Rohan Verma",
    location: "Bangalore, Karnataka",
    project: "Villa Construction · 3,800 sq.ft.",
    initials: "AV",
    bg: "#2C2C2A",
  },
  {
    quote:
      "Building a home while living abroad seemed impossibly complicated, but ARKA's communication and project management made the entire experience incredibly smooth. Weekly updates, photo reports, everything.",
    name: "Vikram Mehta",
    location: "Dubai → Hyderabad",
    project: "Modern Residence · 4,100 sq.ft.",
    initials: "VM",
    bg: "#3A2A1A",
  },
  {
    quote:
      "They understood our requirements from day one and delivered a home that feels genuinely personal to our family. The design sensibility and craftsmanship were both exceptional.",
    name: "Priya & Suresh Nair",
    location: "Kochi, Kerala",
    project: "Courtyard Home · 2,600 sq.ft.",
    initials: "PN",
    bg: "#1A2A2A",
  },
  {
    quote:
      "The quality of workmanship and finishing exceeded our expectations. The team was professional, responsive and transparent at every stage. We would build with ARKA again without hesitation.",
    name: "Arjun & Neha Joshi",
    location: "Pune, Maharashtra",
    project: "Contemporary Villa · 3,200 sq.ft.",
    initials: "AJ",
    bg: "#2A1A2A",
  },
  {
    quote:
      "We wanted a modern home that still worked perfectly for a large joint family. ARKA understood that balance beautifully. The spatial planning and flexibility they brought to the brief were impressive.",
    name: "Karthik & Deepa Rao",
    location: "Chennai, Tamil Nadu",
    project: "Family Residence · 4,500 sq.ft.",
    initials: "KR",
    bg: "#1A1A2A",
  },
  {
    quote:
      "The biggest difference was the attention to small details. Every junction, every material, every finish felt carefully planned rather than simply executed. Our home feels truly bespoke.",
    name: "Sneha Kapoor",
    location: "Gurgaon, Haryana",
    project: "Minimalist Villa · 2,900 sq.ft.",
    initials: "SK",
    bg: "#2A2A1A",
  },
  {
    quote:
      "As first-time builders we were nervous, but ARKA guided us through every decision with patience and expertise. The transparency in costs and timeline removed all the anxiety.",
    name: "Rahul & Kavitha Sharma",
    location: "Whitefield, Bangalore",
    project: "4BHK Villa · 3,200 sq.ft.",
    initials: "RS",
    bg: "#1E2A1A",
  },
  {
    quote:
      "Our site had a challenging slope and a tight access road. ARKA turned what we thought was a problem into the defining character of the home. The terraced design is extraordinary.",
    name: "Prashanth Hegde",
    location: "Jubilee Hills, Hyderabad",
    project: "Hillside Residence · 3,700 sq.ft.",
    initials: "PH",
    bg: "#2A1E1A",
  },
  {
    quote:
      "The interior coordination was seamless. We didn't have to manage multiple contractors — ARKA handled everything from structure to final finishing. One point of contact, zero chaos.",
    name: "Meera & Ravi Krishnan",
    location: "Adyar, Chennai",
    project: "Turnkey Home · 3,000 sq.ft.",
    initials: "MK",
    bg: "#1A2A22",
  },
  {
    quote:
      "Five years later, our home still feels brand new. The quality of materials and waterproofing has held up perfectly through every monsoon. That's the real test of construction quality.",
    name: "Sunil & Pooja Bhat",
    location: "Mangalore, Karnataka",
    project: "Coastal Villa · 2,800 sq.ft.",
    initials: "SB",
    bg: "#221A2A",
  },
  {
    quote:
      "We gave ARKA a challenging brief — a home for a family with three generations living together. The solution they designed respected everyone's privacy while keeping the family connected beautifully.",
    name: "Lakshmi & Gopal Iyer",
    location: "Coimbatore, Tamil Nadu",
    project: "Multi-Gen Residence · 5,200 sq.ft.",
    initials: "LI",
    bg: "#1A221A",
  },
  {
    quote:
      "The project was completed four weeks ahead of schedule. That alone tells you something about how seriously they take planning and execution. The house is everything we dreamed of.",
    name: "Aditya & Roshni Patel",
    location: "Baner, Pune",
    project: "Contemporary Villa · 3,400 sq.ft.",
    initials: "AP",
    bg: "#2A1A1A",
  },
];

// Split into two rows
const ROW_1 = ALL_TESTIMONIALS.slice(0, 6);
const ROW_2 = ALL_TESTIMONIALS.slice(6, 12);

// Inline star SVG — avoids dependency issues
const Stars = () => (
  <div className="flex items-center gap-0.5 mb-5" aria-label="5 stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885l-3.09 1.624.59-3.44L2 4.632l3.455-.502L7 1z"
          fill="#B5905A"
        />
      </svg>
    ))}
  </div>
);

interface CardProps {
  t: Testimonial;
}

function TestimonialCard({ t }: CardProps) {
  return (
    <article
      className="
        testimonial-card
        flex-shrink-0
        w-[340px] sm:w-[380px] lg:w-[420px]
        bg-white
        border border-[#E8E8E4]
        rounded-[18px]
        p-7
        flex flex-col
        select-none
        transition-all duration-300
      "
      aria-label={`Testimonial by ${t.name}`}
    >
      <Stars />

      {/* Quote */}
      <p className="text-[#3A3A38] text-sm leading-[1.85] flex-1 mb-6">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Client */}
      <div className="flex items-center gap-3.5 pt-5 border-t border-[#F0F0EC]">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: t.bg }}
          aria-hidden="true"
        >
          <span className="text-white text-[11px] font-bold tracking-wide">
            {t.initials}
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#171717] truncate">
            {t.name}
          </p>
          <p className="text-[11px] text-[#B5905A] font-medium mt-0.5">
            {t.location}
          </p>
          <p className="text-[11px] text-[#9B9B97] mt-0.5 truncate">
            {t.project}
          </p>
        </div>
      </div>
    </article>
  );
}

interface MarqueeRowProps {
  items: Testimonial[];
  direction: "left" | "right";
  duration: number;
}

function MarqueeRow({ items, direction, duration }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Triple-duplicate for gapless infinite loop
  const loopItems = [...items, ...items, ...items];

  const animClass =
    direction === "left" ? "marquee-track-left" : "marquee-track-right";

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "running";
      }}
    >
      <div
        ref={trackRef}
        className={`flex gap-4 ${animClass} will-change-transform`}
        style={
          {
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
        aria-live="off"
      >
        {loopItems.map((t, idx) => (
          <TestimonialCard key={`${t.name}-${idx}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-[#F5F5F2] overflow-hidden"
    >
      {/* ── Section Header ── */}
      <div className="px-4 sm:px-6 lg:px-10 mb-14">
        <div className="max-w-8xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="reveal">
              <p className="section-label mb-4">Client Stories</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-light text-[#171717] leading-[1.1] tracking-tight">
                Trusted by homeowners
                <br />
                <span className="font-semibold">across India.</span>
              </h2>
            </div>
            <p className="text-sm text-[#6B6B67] leading-relaxed max-w-xs sm:text-right reveal reveal-delay-1">
              Real experiences from clients who trusted us to build their homes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Marquee Rows ── */}
      <div className="relative">
        {/* Left fade mask */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10"
          style={{
            background:
              "linear-gradient(to right, #F5F5F2 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        {/* Right fade mask */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10"
          style={{
            background:
              "linear-gradient(to left, #F5F5F2 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-4">
          {/* Row 1 — scrolls left */}
          <MarqueeRow items={ROW_1} direction="left" duration={40} />

          {/* Row 2 — scrolls right */}
          <MarqueeRow items={ROW_2} direction="right" duration={44} />
        </div>
      </div>
    </section>
  );
}

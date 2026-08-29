import { Shield, PenTool, CalendarCheck, Headphones } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

interface StatConfig {
  raw: number;       // numeric value to count up to
  suffix: string;    // e.g. "+" or "%"
  duration: number;  // ms
}

const cards = [
  {
    icon: Shield,
    title: "Quality Construction",
    description:
      "Premium materials, skilled workmanship and rigorous quality checks at every stage of your build.",
    stat: { raw: 15, suffix: "+", duration: 1600 } as StatConfig,
    statLabel: "Years of experience",
    delay: "reveal-delay-1",
  },
  {
    icon: PenTool,
    title: "Custom Design",
    description:
      "Every home is designed specifically around your land, lifestyle and requirements.",
    stat: { raw: 250, suffix: "+", duration: 1800 } as StatConfig,
    statLabel: "Projects delivered",
    delay: "reveal-delay-2",
  },
  {
    icon: CalendarCheck,
    title: "On-Time Delivery",
    description:
      "Transparent planning, regular updates and disciplined execution keep your project on track.",
    stat: { raw: 95, suffix: "%", duration: 1700 } as StatConfig,
    statLabel: "Projects on schedule",
    delay: "reveal-delay-3",
  },
  {
    icon: Headphones,
    title: "Complete Support",
    description:
      "One dedicated team from initial consultation through construction and handover.",
    stat: { raw: 100, suffix: "%", duration: 1600 } as StatConfig,
    statLabel: "Client-focused approach",
    delay: "reveal-delay-4",
  },
];

// ── Count-up hook ──────────────────────────────────────────────
function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const run = useCallback(
    (ts: number) => {
      if (startTimeRef.current === null) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(run);
      } else {
        setCount(target);
      }
    },
    [target, duration]
  );

  useEffect(() => {
    if (!start) return;
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(run);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, run]);

  return count;
}

// ── Individual stat card ───────────────────────────────────────
interface CardProps {
  card: (typeof cards)[0];
}

function StatCard({ card }: CardProps) {
  const Icon = card.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Detect reduced-motion preference
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // IntersectionObserver fires count-up once the card is in view
  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReduced) {
      setHasStarted(true); // show final value immediately
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReduced]);

  const displayCount = useCountUp(
    card.stat.raw,
    card.stat.duration,
    hasStarted
  );

  return (
    <div
      ref={cardRef}
      className={`reveal ${card.delay} bg-white rounded-2xl border border-[#E5E5E1] p-7 flex flex-col justify-between min-h-[260px] group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#D5D5D1]`}
    >
      <div>
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-[#F5F5F2] flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[#F0E6D3]">
          <Icon
            size={18}
            className="text-[#6B6B67] transition-colors duration-300 group-hover:text-[#B5905A]"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-base font-semibold text-[#171717] mb-2">
          {card.title}
        </h3>
        <p className="text-sm text-[#6B6B67] leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Statistic */}
      <div className="mt-6 pt-6 border-t border-[#E5E5E1]">
        <p
          className="text-4xl font-light text-[#171717] tracking-tight mb-0.5 tabular-nums"
          aria-label={`${card.stat.raw}${card.stat.suffix} ${card.statLabel}`}
        >
          {displayCount}
          {card.stat.suffix}
        </p>
        <p className="text-xs text-[#6B6B67] font-medium">{card.statLabel}</p>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────
export default function TrustSection() {
  return (
    <section id="why-us" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-lg">
            <p className="section-label mb-4">Why Choose Us</p>
            <h2 className="text-4xl lg:text-5xl font-light text-[#171717] leading-[1.1] tracking-tight reveal">
              Built on trust.
              <br />
              <span className="font-semibold">Driven by detail.</span>
            </h2>
          </div>
          <p className="text-base text-[#6B6B67] leading-relaxed max-w-sm reveal">
            We combine thoughtful design, experienced craftsmanship and disciplined
            project management to create homes that last for generations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <StatCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

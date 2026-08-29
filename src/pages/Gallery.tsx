import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Grid3X3, LayoutGrid } from "lucide-react";
import ProjectModal, { type ProjectData } from "@/components/features/ProjectModal";
import { ALL_PROJECTS } from "@/components/features/ProjectsSection";

type City = "All" | "Bangalore" | "Hyderabad" | "Pune" | "Chennai" | "Kerala";

const CITY_FILTERS: City[] = ["All", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kerala"];

// Flatten all images per project into gallery items
interface GalleryItem {
  src: string;
  alt: string;
  project: ProjectData;
  city: string;
  /** Tailwind span classes for masonry rhythm */
  spanClass: string;
}

// Alternate card sizes for masonry rhythm
const SIZE_PATTERN = [
  "row-span-2",   // tall
  "row-span-1",   // normal
  "row-span-1",   // normal
  "row-span-2",   // tall
  "row-span-1",
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-1",
];

function buildGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];
  let sizeIdx = 0;

  ALL_PROJECTS.forEach((project) => {
    const allImgs = [project.coverImage, ...project.images];
    allImgs.forEach((src, imgIdx) => {
      items.push({
        src,
        alt: `${project.name} — photo ${imgIdx + 1}`,
        project,
        city: project.city,
        spanClass: SIZE_PATTERN[sizeIdx % SIZE_PATTERN.length],
      });
      sizeIdx++;
    });
  });

  return items;
}

const ALL_ITEMS = buildGalleryItems();

export default function Gallery() {
  const navigate = useNavigate();
  const [activeCity, setActiveCity] = useState<City>("All");
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [compact, setCompact] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filtered =
    activeCity === "All"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.city === activeCity);

  return (
    <div className="min-h-screen bg-[#F5F5F2]">
      {/* ── Sticky Header ── */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#F5F5F2]/95 backdrop-blur-md shadow-sm py-3"
            : "bg-[#F5F5F2] py-5"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[#6B6B67] hover:text-[#171717] transition-colors duration-200 flex-shrink-0"
          >
            <span className="w-8 h-8 rounded-full border border-[#E5E5E1] bg-white flex items-center justify-center transition-all duration-200 group-hover:border-[#171717] group-hover:bg-[#171717] group-hover:text-white">
              <ArrowLeft size={14} />
            </span>
            <span className="hidden sm:inline">Back to Home</span>
          </button>

          {/* Title */}
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B5905A]" />
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#B5905A]">
                ARKA Homes
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-[#171717] tracking-tight">
              Project Gallery
            </h1>
          </div>

          {/* Layout toggle */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => setCompact(false)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                !compact
                  ? "bg-[#171717] text-white"
                  : "bg-white border border-[#E5E5E1] text-[#6B6B67] hover:text-[#171717]"
              }`}
              aria-label="Masonry layout"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setCompact(true)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                compact
                  ? "bg-[#171717] text-white"
                  : "bg-white border border-[#E5E5E1] text-[#6B6B67] hover:text-[#171717]"
              }`}
              aria-label="Grid layout"
            >
              <Grid3X3 size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        {/* ── Page headline ── */}
        <div className="mb-8 lg:mb-10">
          <p className="section-label mb-3">Selected Projects</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#171717] leading-tight tracking-tight">
              Homes designed for
              <br />
              <span className="font-semibold">the way you live.</span>
            </h2>
            <p className="text-sm text-[#6B6B67] max-w-xs leading-relaxed sm:text-right">
              {ALL_ITEMS.length} photos across {ALL_PROJECTS.length} completed projects.
            </p>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CITY_FILTERS.map((city) => {
            const count =
              city === "All"
                ? ALL_ITEMS.length
                : ALL_ITEMS.filter((i) => i.city === city).length;
            const isActive = activeCity === city;

            return (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#171717] text-white shadow-sm"
                    : "bg-white border border-[#E5E5E1] text-[#6B6B67] hover:border-[#171717] hover:text-[#171717]"
                }`}
              >
                {city}
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-[#F5F5F2] text-[#9B9B97]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Gallery Grid ── */}
        {!compact ? (
          // Masonry-style CSS grid
          <div
            className="grid gap-3 sm:gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gridAutoRows: "220px",
            }}
          >
            {filtered.map((item, idx) => (
              <MasonryCard
                key={`${item.project.name}-${idx}`}
                item={item}
                onClick={() => setActiveProject(item.project)}
              />
            ))}
          </div>
        ) : (
          // Uniform grid
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((item, idx) => (
              <button
                key={`${item.project.name}-${idx}`}
                onClick={() => setActiveProject(item.project)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#E5E5E1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-[11px] font-semibold truncate">
                    {item.project.name}
                  </p>
                  <p className="text-white/70 text-[10px]">{item.city}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#6B6B67] text-sm">No projects found for this filter.</p>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="mt-20 text-center py-16 border-t border-[#E5E5E1]">
          <p className="section-label mb-4">Start Your Project</p>
          <h3 className="text-3xl sm:text-4xl font-light text-[#171717] leading-tight tracking-tight mb-6">
            Ready to build your
            <br />
            <span className="font-semibold">dream home?</span>
          </h3>
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
            className="group inline-flex items-center gap-3 bg-[#171717] text-white text-sm font-semibold px-7 py-4 rounded-full transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-xl"
          >
            Book a Consultation
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowLeft size={14} className="rotate-180" />
            </span>
          </button>
        </div>
      </main>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

// ── Masonry Card ──
interface MasonryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

function MasonryCard({ item, onClick }: MasonryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden bg-[#E5E5E1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] ${item.spanClass}`}
      style={{ gridRow: `span ${item.spanClass === "row-span-2" ? 2 : 1}` }}
      aria-label={`Open ${item.project.name} gallery`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.04]"
        style={{ transitionDuration: "600ms" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* City badge — always visible */}
      <div className="absolute top-3 left-3">
        <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full">
          <span className="w-1 h-1 rounded-full bg-[#B5905A]" />
          {item.city}
        </span>
      </div>

      {/* Project info — reveal on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white font-semibold text-sm leading-tight mb-0.5 truncate">
          {item.project.name}
        </p>
        <p className="text-white/70 text-[11px] font-medium">
          {item.project.area} · {item.project.bedrooms}
        </p>
      </div>
    </button>
  );
}

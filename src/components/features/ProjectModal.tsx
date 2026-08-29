import { useEffect, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2, Calendar, Home } from "lucide-react";

export interface ProjectData {
  name: string;
  city: string;
  location: string;
  area: string;
  bedrooms: string;
  style: string;
  year: string;
  description: string;
  highlights: string[];
  images: string[];
  coverImage: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImg, setActiveImg] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setActiveImg(0);
  }, [project]);

  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const handlePrev = useCallback(() => {
    if (!project) return;
    setActiveImg((i) => (i - 1 + project.images.length) % project.images.length);
  }, [project]);

  const handleNext = useCallback(() => {
    if (!project) return;
    setActiveImg((i) => (i + 1) % project.images.length);
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose, handlePrev, handleNext]);

  if (!project) return null;

  const allImages = [project.coverImage, ...project.images];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} gallery`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="relative z-10 bg-white w-full sm:rounded-3xl overflow-hidden max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col lg:flex-row shadow-2xl animate-modal-in">

        {/* ── Left: Image Carousel ── */}
        <div className="relative lg:w-[58%] bg-[#0F0F0F] flex-shrink-0">
          {/* Main Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[240px] overflow-hidden">
            <img
              key={activeImg}
              src={allImages[activeImg]}
              alt={`${project.name} — view ${activeImg + 1}`}
              className="w-full h-full object-cover transition-opacity duration-400"
            />
            {/* gradient bottom */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Counter badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {activeImg + 1} / {allImages.length}
            </div>

            {/* Prev / Next */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:bg-black/70 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:bg-black/70 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === activeImg
                      ? "border-white scale-105 shadow-lg"
                      : "border-white/30 opacity-60 hover:opacity-90"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Details ── */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between p-6 lg:p-8 pb-5 border-b border-[#E5E5E1]">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={12} className="text-[#B5905A]" />
                <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#B5905A]">
                  {project.location}
                </span>
              </div>
              <h2 className="text-xl lg:text-2xl font-semibold text-[#171717] leading-tight">
                {project.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F5F5F2] border border-[#E5E5E1] flex items-center justify-center text-[#6B6B67] transition-all duration-200 hover:bg-[#171717] hover:text-white hover:border-[#171717] flex-shrink-0 ml-4"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-px bg-[#E5E5E1] border-b border-[#E5E5E1]">
            {[
              { icon: Maximize2, label: "Total Area", value: project.area },
              { icon: Home, label: "Bedrooms", value: project.bedrooms },
              { icon: Calendar, label: "Completed", value: project.year },
              { icon: MapPin, label: "City", value: project.city },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white px-5 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5F5F2] flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-[#6B6B67]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-[#6B6B67] font-medium uppercase tracking-wide leading-none mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-[#171717]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="p-6 lg:p-8 flex-1">
            <div className="mb-1">
              <span className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B5905A] bg-[#F0E6D3] px-2.5 py-1 rounded-full mb-4">
                {project.style}
              </span>
            </div>
            <p className="text-sm text-[#6B6B67] leading-[1.8] mb-7">
              {project.description}
            </p>

            {/* Highlights */}
            <div>
              <p className="text-xs font-semibold text-[#171717] uppercase tracking-[0.1em] mb-4">
                Project Highlights
              </p>
              <ul className="space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-[#6B6B67]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B5905A] flex-shrink-0 mt-1.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 lg:p-8 pt-0 border-t border-[#E5E5E1] mt-auto">
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
              className="group w-full flex items-center justify-center gap-3 bg-[#171717] text-white text-sm font-semibold px-6 py-4 rounded-xl transition-all duration-300 hover:bg-[#2a2a2a]"
            >
              Build a similar home
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ChevronRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

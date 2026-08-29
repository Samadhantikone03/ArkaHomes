import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import bangaloreImg from "@/assets/project-bangalore.jpg";
import bangalore2Img from "@/assets/project-bangalore-2.jpg";
import bangalore3Img from "@/assets/project-bangalore-3.jpg";
import hyderabadImg from "@/assets/project-hyderabad.jpg";
import hyderabad2Img from "@/assets/project-hyderabad-2.jpg";
import hyderabadIntImg from "@/assets/project-hyderabad-int.jpg";
import puneImg from "@/assets/project-pune.jpg";
import puneIntImg from "@/assets/project-pune-int.jpg";
import pune3Img from "@/assets/project-pune-3.jpg";
import chennaiImg from "@/assets/project-chennai.jpg";
import chennai2Img from "@/assets/project-chennai-2.jpg";
import chennaiExt2Img from "@/assets/proj-chennai-ext2.jpg";
import keralaImg from "@/assets/project-kerala.jpg";
import kerala2Img from "@/assets/project-kerala-2.jpg";
import keralaExt2Img from "@/assets/proj-kerala-ext2.jpg";
import hillsideImg from "@/assets/slider-hillside.jpg";
import hillside2Img from "@/assets/project-hillside-2.jpg";
import hillside3Img from "@/assets/project-hillside-3.jpg";

import ProjectModal, { type ProjectData } from "./ProjectModal";

export const ALL_PROJECTS: (ProjectData & { delay: string })[] = [
  {
    name: "Villa in Bangalore",
    city: "Bangalore",
    location: "Whitefield, Bangalore",
    area: "3,200 sq.ft.",
    bedrooms: "4 Bedrooms",
    style: "Contemporary",
    year: "2024",
    description:
      "A contemporary family villa nestled in Whitefield, designed around natural light and tropical landscaping. The home features double-height living spaces, natural stone cladding, and a private infinity pool — all carefully oriented to capture cross-ventilation and garden views.",
    highlights: [
      "South-facing orientation for optimal daylighting",
      "Natural Kota stone and teak wood detailing throughout",
      "12,000-litre underground rainwater harvesting system",
      "Automated home systems (lighting, curtains, security)",
      "Private infinity pool with stone deck",
    ],
    coverImage: bangaloreImg,
    images: [bangalore2Img, bangalore3Img],
    delay: "reveal-delay-1",
  },
  {
    name: "Residence in Hyderabad",
    city: "Hyderabad",
    location: "Jubilee Hills, Hyderabad",
    area: "4,100 sq.ft.",
    bedrooms: "5 Bedrooms",
    style: "Modern Luxury",
    year: "2024",
    description:
      "A sprawling modern luxury residence in Jubilee Hills, designed for a multi-generational family. The project features a distinctive concrete and glass façade, a chef's kitchen, dedicated home theatre, and lushly landscaped terraced gardens on a sloped plot.",
    highlights: [
      "Sloped-site design with terraced landscaping",
      "Dedicated home theatre and media room",
      "Chef's kitchen with imported stone countertops",
      "5-car basement parking with lift access",
      "Solar panels covering 60% of electrical load",
    ],
    coverImage: hyderabadImg,
    images: [hyderabad2Img, hyderabadIntImg],
    delay: "reveal-delay-2",
  },
  {
    name: "Villa in Pune",
    city: "Pune",
    location: "Baner, Pune",
    area: "2,800 sq.ft.",
    bedrooms: "4 Bedrooms",
    style: "Minimal Contemporary",
    year: "2023",
    description:
      "A refined minimal contemporary villa in Baner, designed to disappear into its surroundings. Clean geometry, a restrained material palette of exposed concrete, and a private courtyard garden create a home that feels calm and grounded — a deliberate contrast to the city beyond.",
    highlights: [
      "Private internal courtyard with water feature",
      "Exposed concrete and natural teak finish",
      "Passive cooling design — no air conditioning needed in monsoon",
      "Rooftop terrace with city views",
      "Custom wooden louvre screening for privacy",
    ],
    coverImage: puneImg,
    images: [puneIntImg, pune3Img],
    delay: "reveal-delay-3",
  },
  {
    name: "Villa in Chennai",
    city: "Chennai",
    location: "Adyar, Chennai",
    area: "3,600 sq.ft.",
    bedrooms: "4 Bedrooms",
    style: "Tropical Contemporary",
    year: "2024",
    description:
      "A tropical contemporary villa in Adyar designed to work beautifully with Chennai's warm, humid climate. Deep overhangs, natural cross-ventilation, and a lush planted courtyard keep the home cool and connected to the outdoors throughout the year.",
    highlights: [
      "Deep overhangs and screens for passive shading",
      "Open-plan living area opening to tropical garden",
      "Natural stone and timber throughout",
      "Lap pool integrated into landscape design",
      "Rainwater harvesting and solar water heating",
    ],
    coverImage: chennaiImg,
    images: [chennai2Img, chennaiExt2Img],
    delay: "reveal-delay-1",
  },
  {
    name: "Courtyard Home in Kerala",
    city: "Kerala",
    location: "Thrissur, Kerala",
    area: "3,000 sq.ft.",
    bedrooms: "4 Bedrooms",
    style: "Contemporary Kerala",
    year: "2023",
    description:
      "A thoughtful reinterpretation of the traditional Kerala nalukettu — a courtyard home — updated for contemporary living. Laterite stone, polished wood and open courtyards create a home that is deeply rooted in place, while meeting every modern expectation of comfort and luxury.",
    highlights: [
      "Central open courtyard as the heart of the home",
      "Traditional laterite stone and polished rosewood",
      "Climate-responsive design — minimal mechanical cooling",
      "Vastu-compliant planning integrated with modern layout",
      "Heritage craftsmanship by local Kerala artisans",
    ],
    coverImage: keralaImg,
    images: [kerala2Img, keralaExt2Img],
    delay: "reveal-delay-2",
  },
  {
    name: "Hillside Residence, Bangalore",
    city: "Bangalore",
    location: "Nandi Hills Road, Bangalore",
    area: "4,800 sq.ft.",
    bedrooms: "5 Bedrooms",
    style: "Contemporary Hillside",
    year: "2025",
    description:
      "A dramatic hillside residence that transforms a challenging sloped site into its defining architectural feature. The home steps down the hill in a series of terraced levels, each commanding sweeping views of the Bangalore valley below, with an infinity pool that appears to merge with the horizon at dusk.",
    highlights: [
      "Terraced design stepping down a natural slope",
      "Infinity-edge pool with panoramic valley views",
      "Double-height glazed living pavilion",
      "Floating concrete staircase with oak treads",
      "Fully off-grid capable with solar and battery storage",
    ],
    coverImage: hillsideImg,
    images: [hillside2Img, hillside3Img],
    delay: "reveal-delay-3",
  },
];

// Home page shows only first 3 projects
const PREVIEW_PROJECTS = ALL_PROJECTS.slice(0, 3);

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <section id="projects" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="section-label mb-4">Selected Projects</p>
              <h2 className="text-4xl lg:text-5xl font-light text-[#171717] leading-[1.1] tracking-tight reveal">
                Homes designed for
                <br />
                <span className="font-semibold">the way you live.</span>
              </h2>
            </div>
            <button
              onClick={() => navigate("/gallery")}
              className="group inline-flex items-center gap-2.5 border border-[#E5E5E1] bg-white text-[#171717] text-sm font-semibold px-5 py-3 rounded-full transition-all duration-300 hover:border-[#171717] hover:shadow-md self-start sm:self-end whitespace-nowrap"
            >
              View All Projects
              <span className="w-6 h-6 rounded-full bg-[#F5F5F2] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight size={12} />
              </span>
            </button>
          </div>

          {/* Projects Grid — first 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PREVIEW_PROJECTS.map((project) => (
              <article
                key={project.name}
                className={`reveal ${project.delay} group bg-white rounded-2xl border border-[#E5E5E1] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
                onClick={() => setActiveProject(project)}
              >
                {/* Image */}
                <div className="img-zoom aspect-[4/3] rounded-t-2xl overflow-hidden relative">
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="w-1 h-1 rounded-full bg-white" />
                    {1 + project.images.length} photos
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#B5905A] mb-1">
                      {project.city} · {project.year}
                    </p>
                    <h3 className="text-base font-semibold text-[#171717] mb-1.5">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[#6B6B67] font-medium">
                      {project.area} · {project.bedrooms} · {project.style}
                    </p>
                  </div>

                  <div className="mt-5 pt-5 border-t border-[#F0F0EC]">
                    <button
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#171717] transition-all duration-200 hover:gap-3"
                      tabIndex={-1}
                    >
                      View Project
                      <span className="w-7 h-7 rounded-full border border-[#E5E5E1] flex items-center justify-center transition-all duration-300 group-hover:border-[#171717] group-hover:bg-[#171717] group-hover:text-white">
                        <ArrowUpRight size={13} />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All teaser strip */}
          <div className="mt-8 text-center reveal">
            <button
              onClick={() => navigate("/gallery")}
              className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[#6B6B67] hover:text-[#171717] transition-colors duration-200"
            >
              +3 more projects — see the full gallery
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}

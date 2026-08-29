import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WhatsAppButton from "@/components/features/WhatsAppButton";
import Header from "@/components/layout/Header";
import Hero from "@/components/features/Hero";
import TrustSection from "@/components/features/TrustSection";
import ServicesSection from "@/components/features/ServicesSection";
import ProjectsSection from "@/components/features/ProjectsSection";
import FeaturedCTA from "@/components/features/FeaturedCTA";
import ProcessSection from "@/components/features/ProcessSection";
import AboutSection from "@/components/features/AboutSection";
import Testimonials from "@/components/features/Testimonials";
import ContactCTA from "@/components/features/ContactCTA";
import Footer from "@/components/layout/Footer";
import Gallery from "@/pages/Gallery";

// ── Reveal observer — re-runs on route change ──────────────────
function RevealObserver() {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Small delay so newly mounted elements are in the DOM
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal:not(.visible)");
      elements.forEach((el) => observer.observe(el));
    }, 80);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}

// ── Home page ──────────────────────────────────────────────────
function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F2]">
      <Header />
      <main>
        <Hero />
        <TrustSection />
        <ServicesSection />
        <ProjectsSection />
        <FeaturedCTA />
        <ProcessSection />
        <AboutSection />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// ── App shell with router ──────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <RevealObserver />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#F5F5F2]/95 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group" aria-label="ARKA Homes">
            <div className="w-8 h-8 bg-[#171717] rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-12">
              <span className="text-white text-xs font-bold tracking-wider">A</span>
            </div>
            <span className="text-[#171717] font-bold text-xl tracking-tight">ARKA</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-[#6B6B67] hover:text-[#171717] transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick("#contact")}
              className="group hidden sm:inline-flex items-center gap-2.5 bg-[#171717] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-[#2a2a2a] hover:shadow-md"
            >
              Get a Consultation
              <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight size={12} />
              </span>
            </button>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#171717] hover:bg-[#E5E5E1] rounded-full transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 py-6 border-t border-[#E5E5E1] bg-[#F5F5F2]/98 backdrop-blur-md rounded-2xl px-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-base font-medium text-[#6B6B67] hover:text-[#171717] hover:bg-white rounded-xl transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-5 px-4">
              <button
                onClick={() => handleNavClick("#contact")}
                className="group w-full flex items-center justify-center gap-2.5 bg-[#171717] text-white text-sm font-semibold px-5 py-3.5 rounded-full transition-all duration-300"
              >
                Get a Consultation
                <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                  <ArrowUpRight size={12} />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

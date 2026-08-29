import { Instagram, Facebook, Linkedin, Youtube, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#F5F5F2] border-t border-[#E5E5E1]">
      {/* Main Footer */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#171717] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-[#171717] font-bold text-lg tracking-tight">ARKA</span>
            </div>
            <p className="text-sm text-[#6B6B67] leading-relaxed max-w-[200px]">
              Building modern homes for better living.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6B6B67] mb-5">Navigation</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm text-[#171717] hover:text-[#6B6B67] transition-colors duration-200 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6B6B67] mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="text-sm text-[#171717] hover:text-[#B5905A] transition-colors font-medium"
              >
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@arkahomes.in"
                className="text-sm text-[#171717] hover:text-[#B5905A] transition-colors font-medium"
              >
                hello@arkahomes.in
              </a>
              <p className="text-sm text-[#6B6B67]">
                Indiranagar, Bangalore
                <br />
                Karnataka — 560038
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#6B6B67] mb-5">Follow Us</p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[#E5E5E1] bg-white flex items-center justify-center text-[#6B6B67] hover:text-[#171717] hover:border-[#D0CFC9] hover:shadow-sm transition-all duration-200"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-5 border-t border-[#E5E5E1]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6B67]">
            © 2026 ARKA Homes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-[#6B6B67]">Privacy Policy</span>
            <span className="text-xs text-[#6B6B67]">Terms of Use</span>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-[#E5E5E1] bg-white flex items-center justify-center text-[#6B6B67] hover:text-[#171717] hover:border-[#D0CFC9] hover:shadow-sm transition-all duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

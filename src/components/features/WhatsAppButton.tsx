import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "919876543210"; // India: +91 98765 43210
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi ARKA Homes! I'm interested in building a home and would like to know more about your services. Could you please share details?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-6 right-6 z-[300] group flex items-center gap-0 overflow-hidden rounded-full bg-[#151515] border border-[#2a2a2a] shadow-[0_8px_32px_rgba(0,0,0,0.28)] transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        hover:gap-3 hover:pr-5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.38)]`}
    >
      {/* Icon container */}
      <span className="w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center">
        {/* WhatsApp SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            fill="#25D366"
          />
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.659 1.438 5.168L2 22l4.975-1.419A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
            stroke="#25D366"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Label — expands on hover */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-white text-sm font-semibold tracking-tight transition-all duration-500 group-hover:max-w-[120px]">
        Chat with us
      </span>
    </a>
  );
}

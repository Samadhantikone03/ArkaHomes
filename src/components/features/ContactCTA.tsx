import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      <div className="max-w-8xl mx-auto">
        <div className="bg-[#151515] rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-10 sm:p-14 lg:p-20 flex flex-col justify-between min-h-[480px]">
              <div>
                <p className="section-label text-white/40 mb-5">Get in Touch</p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6">
                  Ready to build
                  <br />
                  <span className="font-semibold">your dream home?</span>
                </h2>
                <p className="text-base text-white/55 leading-relaxed max-w-sm mb-10">
                  Tell us about your project, and let's create something
                  exceptional together.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="group inline-flex items-center gap-3 bg-white text-[#171717] text-sm font-semibold px-7 py-4 rounded-full transition-all duration-300 hover:bg-[#F0E6D3] hover:shadow-xl hover:scale-[1.02]">
                    Book a Consultation
                    <span className="w-8 h-8 rounded-full bg-[#171717]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                      <ArrowUpRight size={14} />
                    </span>
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={15} className="text-white/60" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/35 mb-1">Call us</p>
                    <p className="text-sm text-white/80 font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={15} className="text-white/60" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/35 mb-1">Email</p>
                    <p className="text-sm text-white/80 font-medium">hello@arkahomes.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={15} className="text-white/60" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/35 mb-1">Office</p>
                    <p className="text-sm text-white/80 font-medium">Indiranagar, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white/5 border-l border-white/8 p-10 sm:p-14 lg:p-20 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-white mb-8">Tell us about your project</h3>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 font-medium mb-2 tracking-wide uppercase">First Name</label>
                    <input
                      type="text"
                      placeholder="Rahul"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 font-medium mb-2 tracking-wide uppercase">Last Name</label>
                    <input
                      type="text"
                      placeholder="Sharma"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2 tracking-wide uppercase">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2 tracking-wide uppercase">City / Location</label>
                  <input
                    type="text"
                    placeholder="Bangalore, Hyderabad, Pune..."
                    className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 font-medium mb-2 tracking-wide uppercase">Tell us about your project</label>
                  <textarea
                    rows={3}
                    placeholder="3BHK villa, plot size 2400 sq.ft., looking to start in 6 months..."
                    className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 bg-white text-[#171717] text-sm font-semibold px-6 py-4 rounded-xl transition-all duration-300 hover:bg-[#F0E6D3] hover:shadow-lg mt-2"
                >
                  Send Enquiry
                  <span className="w-7 h-7 rounded-full bg-[#171717]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowUpRight size={13} />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

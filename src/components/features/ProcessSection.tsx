const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understand your site, lifestyle, budget and vision.",
  },
  {
    number: "02",
    title: "Design",
    description: "Develop architecture, interiors and detailed plans.",
  },
  {
    number: "03",
    title: "Planning",
    description: "Finalize estimates, materials, timelines and approvals.",
  },
  {
    number: "04",
    title: "Construction",
    description: "Execute with experienced teams and rigorous quality control.",
  },
  {
    number: "05",
    title: "Handover",
    description: "Complete finishing, inspections and final handover.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
          <div>
            <p className="section-label mb-4">Our Process</p>
            <h2 className="text-4xl lg:text-5xl font-light text-[#171717] leading-[1.1] tracking-tight reveal">
              From idea to
              <br />
              <span className="font-semibold">inspiration.</span>
            </h2>
          </div>
          <p className="lg:ml-auto text-sm text-[#6B6B67] max-w-xs leading-relaxed lg:mb-1 reveal">
            A clear, structured process that keeps you informed and your project on track from start to finish.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${idx + 1} relative group`}
            >
              {/* Step Card */}
              <div className="py-8 pr-8 lg:pr-10 transition-all duration-300">
                {/* Number */}
                <p className="text-5xl lg:text-6xl font-light text-[#E5E5E1] leading-none mb-6 transition-colors duration-300 group-hover:text-[#D5CFBF]">
                  {step.number}
                </p>

                {/* Divider */}
                <div className="w-8 h-0.5 bg-[#E5E5E1] mb-5 transition-colors duration-300 group-hover:bg-[#B5905A] group-hover:w-12" />

                <h3 className="text-base font-semibold text-[#171717] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6B6B67] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Vertical Divider (between items, not after last) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 w-px h-20 bg-[#E5E5E1]" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-2 h-px bg-gradient-to-r from-[#E5E5E1] via-[#B5905A]/20 to-transparent" />
      </div>
    </section>
  );
}

import { motion } from "motion/react";

export default function ClientLogos() {
  const brands = [
    { name: "AIIMS", type: "Healthcare" },
    { name: "BYJU'S", type: "EdTech" },
    { name: "RADISSON", type: "Hospitality" },
    { name: "PRIDE HOTELS", type: "Luxury Stay" },
    { name: "JOVE", type: "Scientific Video" },
    { name: "NARAYANA", type: "Health Group" },
    { name: "NYSA", type: "Real Estate" },
    { name: "KIAN", type: "International" },
    { name: "OLIVAFLIX", type: "Cinema Systems" },
  ];

  // Duplicate list to achieve a seamless drift effect
  const displayBrands = [...brands, ...brands, ...brands];

  return (
    <section className="relative py-12 md:py-16 bg-[#070B14] overflow-hidden border-b border-border-dark/30 select-none">
      {/* Structural style for hardware-accelerated marquee */}
      <style>{`
        @keyframes drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33333%);
          }
        }
        .animate-brand-marquee {
          animation: drift 35s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase">
          COLLABORATING WITH LEADING ENTERPRISES & MODERN VENTURES
        </p>
      </div>

      <div className="relative flex items-center justify-start overflow-hidden w-full">
        {/* Soft fading edges for professional cinematic look */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#070B14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#070B14] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 md:gap-20 animate-brand-marquee whitespace-nowrap py-3">
          {displayBrands.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="inline-flex items-center gap-2.5 group cursor-default transition-all duration-300"
            >
              {/* Sleek geometric emblem */}
              <div className="w-2 h-2 rounded-full bg-stroke/50 group-hover:bg-[#00D1FF] group-hover:scale-125 transition-all duration-300" />
              
              {/* Brand Typography */}
              <span className="text-lg md:text-xl font-display font-black tracking-widest text-[#F5F7FF]/25 group-hover:text-text-luxury transition-all duration-300">
                {brand.name}
              </span>
              
              {/* Tiny industry tag */}
              <span className="text-[8px] font-mono uppercase text-muted/30 group-hover:text-[#6C63FF]/70 tracking-wider transition-all duration-300 -mt-2">
                {brand.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

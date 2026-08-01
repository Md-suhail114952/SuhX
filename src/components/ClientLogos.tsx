import { motion } from "motion/react";
import { 
  Activity, 
  GraduationCap, 
  Building2, 
  Crown, 
  Microscope, 
  HeartPulse, 
  Building, 
  Sparkles,
  ExternalLink
} from "lucide-react";

export default function ClientLogos() {
  const brands = [
    { name: "AIIMS", type: "Healthcare", icon: HeartPulse, color: "#00D1FF", url: "https://www.aiims.edu/index.php/en" },
    { name: "BYJU'S", type: "EdTech", icon: GraduationCap, color: "#6C63FF", url: "https://byjus.com/" },
    { name: "RADISSON", type: "Hospitality", icon: Building2, color: "#A855F7", url: "https://www.radissonhotels.com/" },
    { name: "PRIDE HOTELS", type: "Luxury Stay", icon: Crown, color: "#EAB308", url: "https://www.pridehotel.com/" },
    { name: "JOVE", type: "Scientific Video", icon: Microscope, color: "#10B981", url: "https://www.jove.com/" },
    { name: "NARAYANA", type: "Health Group", icon: Activity, color: "#EC4899", url: "https://narayanagroup.com/" },
    { name: "NYSA", type: "Real Estate", icon: Building, color: "#3B82F6", url: "https://www.nysaluxuryhomes.com/" },
    { name: "ROYALE HEALTH", type: "Wellness Gummies", icon: Sparkles, color: "#F59E0B", url: "https://www.royalehealthgummies.com/" },
  ];

  // Duplicate list to achieve a seamless drift effect
  const displayBrands = [...brands, ...brands, ...brands];

  return (
    <section className="relative py-12 md:py-16 bg-[#070B14] overflow-hidden border-b border-border-dark/30 select-none">
      {/* Hardware-accelerated smooth marquee keyframes */}
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
          animation: drift 32s linear infinite;
        }
        .animate-brand-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase">
          TRUSTED BY LEADING ENTERPRISES & MODERN VENTURES
        </p>
      </div>

      <div className="relative flex items-center justify-start overflow-hidden w-full">
        {/* Soft fading edges for professional cinematic look */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#070B14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#070B14] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 md:gap-8 animate-brand-marquee whitespace-nowrap py-4">
          {displayBrands.map((brand, idx) => {
            const IconComponent = brand.icon;
            return (
              <a
                key={`${brand.name}-${idx}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit official website: ${brand.name}`}
                className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-surface-dark/50 border border-border-dark/60 hover:border-[#00D1FF]/50 hover:bg-[#00D1FF]/10 hover:shadow-[0_0_20px_rgba(0,209,255,0.15)] transition-all duration-300 group cursor-pointer relative"
              >
                {/* Animated Brand Icon Ring */}
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                  style={{ 
                    backgroundColor: `${brand.color}15`,
                    borderColor: `${brand.color}40`,
                    borderWidth: '1px'
                  }}
                >
                  <IconComponent 
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                    style={{ color: brand.color }} 
                  />
                </div>
                
                {/* Brand Details */}
                <div className="flex flex-col text-left pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm md:text-base font-display font-bold tracking-wider text-text-sub group-hover:text-white transition-colors duration-300">
                      {brand.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-muted/40 group-hover:text-[#00D1FF] transition-colors duration-300 opacity-0 group-hover:opacity-100" />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-muted/60 group-hover:text-[#00D1FF] transition-colors duration-300">
                    {brand.type}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}


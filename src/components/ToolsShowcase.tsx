import { useState, useEffect, ReactNode } from "react";
import { motion } from "motion/react";
import { Cpu, Zap, Compass, Sparkles } from "lucide-react";

interface ToolCard {
  id: string;
  name: string;
  tagline: string;
  glowGradient: string;
  accentColor: string;
  borderColor: string;
  dotColor: string;
  logo: ReactNode;
}

export default function ToolsShowcase() {
  const [loopKey, setLoopKey] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive listener to check for mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tools: ToolCard[] = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      tagline: "Conversational Intelligence",
      glowGradient: "from-[#10a37f]/20 via-[#6C63FF]/15 to-transparent",
      accentColor: "#10a37f",
      borderColor: "border-[#10a37f]/25",
      dotColor: "#10a37f",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2a4 4 0 014 4v2.5a4.5 4.5 0 014.5 4.5V17a4 4 0 01-4 4h-1a3.5 3.5 0 01-3.5-3.5v-1a1.5 1.5 0 00-1.5-1.5h-2a1.5 1.5 0 00-1.5 1.5v1A3.5 3.5 0 015 21H4a4 4 0 01-4-4v-4a4.5 4.5 0 014.5-4.5V6a4 4 0 014-4h4z"
            fill="url(#chatgpt-grad)"
            opacity="0.9"
          />
          <circle cx="9" cy="10" r="1.5" fill="#ffffff" />
          <circle cx="15" cy="10" r="1.5" fill="#ffffff" />
          <path d="M10 14h4a2 2 0 01-2 2 2 2 0 01-2-2z" fill="#ffffff" />
          <defs>
            <linearGradient id="chatgpt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10A37F" />
              <stop offset="100%" stopColor="#6C63FF" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: "claude",
      name: "Claude",
      tagline: "Advanced Reasoning",
      glowGradient: "from-[#D97706]/25 via-[#F59E0B]/10 to-transparent",
      accentColor: "#F59E0B",
      borderColor: "border-[#F59E0B]/25",
      dotColor: "#F59E0B",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.5L14.2 8h5.8l-4.7 3.5 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5L4 8h5.8z"
            fill="url(#claude-grad)"
            stroke="#ffffff"
            strokeWidth="0.5"
          />
          <path
            d="M12 6.5l.8 2h2l-1.6 1.2.6 1.8-1.5-1.1-1.5 1.1.6-1.8-1.6-1.2h2z"
            fill="#ffffff"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="claude-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: "midjourney",
      name: "Midjourney",
      tagline: "Generative Artistry",
      glowGradient: "from-[#4F46E5]/25 via-[#06B6D4]/15 to-transparent",
      accentColor: "#00D1FF",
      borderColor: "border-[#00D1FF]/25",
      dotColor: "#00D1FF",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 18s2.5-4 8-4 8 4 8 4H4z"
            fill="url(#mj-grad)"
          />
          <path
            d="M8 12s1.5-6 4-6 4 6 4 6H8z"
            fill="url(#mj-grad)"
            opacity="0.75"
          />
          <circle cx="12" cy="7" r="1" fill="#ffffff" />
          <circle cx="16" cy="10" r="0.75" fill="#ffffff" />
          <circle cx="8" cy="10" r="0.75" fill="#ffffff" />
          <defs>
            <linearGradient id="mj-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C63FF" />
              <stop offset="100%" stopColor="#00D1FF" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: "stitch",
      name: "Google Stitch",
      tagline: "Intelligent Pipeline",
      glowGradient: "from-[#00D1FF]/20 via-[#10B981]/15 to-transparent",
      accentColor: "#10B981",
      borderColor: "border-[#10B981]/25",
      dotColor: "#10B981",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#stitch-grad)" />
          <path d="M7 12h10M12 7v10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="stitch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D1FF" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: "lovable",
      name: "Lovable",
      tagline: "Full-Stack Generation",
      glowGradient: "from-[#EC4899]/25 via-[#8B5CF6]/15 to-transparent",
      accentColor: "#EC4899",
      borderColor: "border-[#EC4899]/25",
      dotColor: "#EC4899",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#lovable-grad)"
          />
          <defs>
            <linearGradient id="lovable-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: "gamma",
      name: "Gamma",
      tagline: "Aesthetic Presentations",
      glowGradient: "from-[#2563EB]/25 via-[#7C3AED]/15 to-transparent",
      accentColor: "#6C63FF",
      borderColor: "border-[#6C63FF]/25",
      dotColor: "#6C63FF",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16v16H4V4z" fill="url(#gamma-grad)" rx="2" />
          <path d="M8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" fill="#ffffff" />
          <defs>
            <linearGradient id="gamma-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      id: "adobe",
      name: "Adobe Creative Suite",
      tagline: "Infinite Editing Suite",
      glowGradient: "from-[#EF4444]/25 via-[#EC4899]/15 to-transparent",
      accentColor: "#EF4444",
      borderColor: "border-[#EF4444]/25",
      dotColor: "#EF4444",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="url(#adobe-grad)" />
          <path d="M12 5l6.5 13H15l-3-6.5L9 18H5.5L12 5z" fill="#ffffff" />
          <defs>
            <linearGradient id="adobe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      )
    }
  ];

  // Number of cards to show based on responsive state
  const visibleCardsCount = 5;
  const cardsToShow = tools.slice(0, visibleCardsCount);

  // Dynamic rotations for a natural "loose pile" scattering feel
  const rotations = [-5, 4, -3, 5, -2, 3, -1];
  const xOffsets = [-15, 20, -10, 25, 5, -20, 10];
  const yOffsets = [-10, 10, -5, 15, 0, -15, 5];

  // Duration calculation for the loop
  useEffect(() => {
    const staggerDelay = isMobile ? 0.35 : 0.25;
    const lastCardLandTime = (visibleCardsCount - 1) * staggerDelay + 1.1; // seconds
    const restDuration = 2.4; // Completed stack viewing pause
    const fadeOutDuration = 0.6; // Transition out

    const totalLoopMs = (lastCardLandTime + restDuration + fadeOutDuration) * 1000;

    const fadeOutTimeout = setTimeout(() => {
      setIsFadingOut(true);
    }, (lastCardLandTime + restDuration) * 1000);

    const restartTimeout = setTimeout(() => {
      setIsFadingOut(false);
      setLoopKey((prev) => prev + 1);
    }, totalLoopMs);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(restartTimeout);
    };
  }, [loopKey, isMobile, visibleCardsCount]);

  return (
    <section id="tools" className="py-24 max-w-7xl mx-auto px-6 relative z-10 overflow-hidden">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full">
            // Curated Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-text-luxury mt-4 tracking-tight leading-none">
            Intelligent <span className="text-gradient font-bold">Orchestration</span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-text-sub leading-relaxed">
          The elite selection of high-performance generative models and systems running behind SUHX creative pipelines.
        </p>
      </div>

      {/* Main Falling Stack Arena */}
      <div className="relative w-full h-[520px] sm:h-[580px] flex items-center justify-center overflow-hidden rounded-3xl border border-border-dark/25">
        {/* Subtle Watermark Behind the Stack */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
          <span className="text-7xl sm:text-9xl font-display font-black tracking-widest text-white/[0.025] uppercase">
            AI CORE
          </span>
        </div>

        {/* Floating background decorative details */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#6C63FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#00D1FF]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Render Cards Stack */}
        <div className="relative w-full h-[460px] flex items-center justify-center">
          {cardsToShow.map((card, i) => {
            const diff = (visibleCardsCount - 1) - i;
            const staggerDelay = isMobile ? 0.35 : 0.25;

            // Calculations for natural piled depth look
            const targetScale = Math.max(0.85, 1 - diff * 0.035);
            const targetOpacity = isFadingOut ? 0 : Math.max(0.4, 1 - diff * 0.15);
            const targetY = yOffsets[i] - diff * 12;
            const targetX = xOffsets[i] + diff * 6;
            const targetRotate = rotations[i];

            return (
              <motion.div
                key={`${card.id}-${loopKey}`}
                style={{ zIndex: i + 1 }}
                initial={{
                  y: -650,
                  x: xOffsets[i] * 1.5,
                  opacity: 0,
                  rotate: targetRotate * 2,
                  scale: 0.9,
                }}
                animate={{
                  y: isFadingOut ? 120 : targetY,
                  x: isFadingOut ? targetX * 1.5 : targetX,
                  opacity: targetOpacity,
                  rotate: isFadingOut ? targetRotate * 1.5 : targetRotate,
                  scale: isFadingOut ? targetScale * 0.9 : targetScale,
                }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 13,
                  mass: 1.1,
                  delay: i * staggerDelay,
                }}
                className={`absolute w-[290px] h-[180px] sm:w-[340px] sm:h-[210px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl transition-shadow duration-500 hover:shadow-cyan-500/5 group`}
              >
                {/* Micro Particle Grid Inside Each Card */}
                <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />

                {/* Unique Glowing Radial Ambient Sphere per card */}
                <div className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full blur-[35px] opacity-35 bg-gradient-to-tr ${card.glowGradient} pointer-events-none group-hover:opacity-50 transition-opacity duration-500`} />

                {/* Card Header Info */}
                <div className="relative z-10 flex items-start justify-between">
                  {/* Glowing Frame wrapper for custom logo */}
                  <div 
                    className="w-12 h-12 rounded-xl bg-surface-dark/90 border flex items-center justify-center shadow-inner transition-all duration-300"
                    style={{ borderColor: `${card.accentColor}30` }}
                  >
                    {card.logo}
                  </div>

                  {/* Tiny Status Dot */}
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-dark/80 border border-border-dark/30">
                    <span 
                      className="w-1.5 h-1.5 rounded-full animate-pulse" 
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <span className="text-[9px] font-mono tracking-wider text-text-sub uppercase">
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Card Title & Content */}
                <div className="relative z-10 mt-4">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-text-luxury group-hover:text-white transition-colors duration-300">
                    {card.name}
                  </h3>
                  <p className="text-xs text-text-sub mt-1 tracking-wide line-clamp-1 font-light opacity-80">
                    {card.tagline}
                  </p>
                </div>

                {/* Card Footer branding */}
                <div className="relative z-10 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-text-sub/50">
                  <span>SUHX ENGINE v2.6</span>
                  <span className="opacity-75">SECURE ENDPOINT</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { 
  ArrowUpRight, 
  Sparkles, 
  Terminal, 
  Activity, 
  Focus, 
  Cpu, 
  PenTool, 
  MousePointer, 
  Grid, 
  Palette, 
  Box 
} from "lucide-react";

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-32 pb-20 relative flex items-center justify-center overflow-hidden z-10 px-6 max-w-7xl mx-auto"
    >
      {/* Decorative center ambient light aura */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#6c63ff0d] via-[#00d1ff04] to-transparent blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative">
        
        {/* Left Column - Clean Beautiful Text Section (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-7 text-left lg:pr-10">
          
          {/* Executive Certified AI Specialty badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-studio/30 bg-primary-studio/10 text-text-luxury text-[11px] font-mono shadow-md backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary-studio animate-spin-slow" />
            <span>Senior UI/UX Designer // Certified AI Specialist</span>
          </motion.div>

          {/* Cinematic Large Headline - Reduced size slightly with cleaner composition */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-[62px] font-display font-medium leading-[1.08] tracking-tight text-text-luxury max-w-xl"
            >
              Designing <br className="hidden md:inline" />
              Intelligent Digital <br />
              <span className="text-gradient font-extrabold">Experiences</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-sm md:text-base text-text-sub max-w-lg leading-relaxed"
            >
              Consulting and structuring high-performance brands, advanced enterprise UI suites, and modern AI pipelines. Elevating human-computer interactive products with flawless mathematical layouts.
            </motion.p>
          </div>

          {/* CTA Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <button
              onClick={() => handleScrollTo("portfolio")}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-studio to-secondary-studio text-white font-extrabold text-xs md:text-sm flex items-center gap-2 hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,209,255,0.3)] active:scale-[0.98] transition-all glow-btn cursor-pointer shadow-md"
            >
              <span>Explore Portfolios</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScrollTo("contact")}
              className="py-3.5 px-6 rounded-xl bg-surface-dark border border-border-dark text-text-luxury text-xs md:text-sm font-semibold hover:border-[#00D1FF]/40 hover:text-[#00D1FF] hover:bg-[#00D1FF]/5 hover:shadow-[0_0_15px_rgba(0,209,255,0.1)] active:scale-[0.98] transition-all cursor-pointer"
            >
              Let’s Connect
            </button>
          </motion.div>

          {/* Slogan subtext list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-5 text-[9px] font-mono text-text-sub/40 pt-8 border-t border-border-dark/30 max-w-md"
          >
            <span>GOLDEN RATIO: 1.618</span>
            <span>//</span>
            <span>DPI CALIBRATION: OPTIMAL</span>
            <span>//</span>
            <span>VELOCITY: INSTANT</span>
          </motion.div>

        </div>

        {/* Right Column - Floating Creative Design Board (5 cols) - Scaled Down & Made Compact */}
        <div className="lg:col-span-5 relative w-full h-[380px] md:h-[440px] flex items-center justify-center">
          {/* Base grid design underlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,209,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,209,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] rounded-3xl border border-border-dark/20 overflow-hidden shadow-2xl shadow-black/80">
            {/* Subtle gradient overlay to fade the edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-transparent to-[#070B14] pointer-events-none" />
            
            {/* Tech grid intersection coordinates */}
            <div className="absolute top-3.5 left-4 font-mono text-[8px] text-[#00D1FF]/40 tracking-wider uppercase">
              // Setup Grid: Active // 1.618
            </div>
            
            <div className="absolute bottom-3.5 right-4 font-mono text-[8px] text-[#6C63FF]/30 tracking-wider uppercase">
              // Output Matched
            </div>
          </div>

          {/* Glow accent bubble in the middle */}
          <div className="absolute w-[220px] h-[220px] rounded-full bg-gradient-to-tr from-[#00D1FF]/10 to-[#6C63FF]/10 blur-3xl opacity-60 pointer-events-none" />

          {/* SVG wireframe path / Spline (Bezier curve tool) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 400 400">
            <motion.path
              d="M 60,320 C 130,100 240,340 340,120"
              fill="none"
              stroke="url(#wireframe-gradient-right)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="wireframe-gradient-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D1FF" />
                <stop offset="100%" stopColor="#6C63FF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive/glowing vector nodes along the wireframe curve */}
          <motion.div
            animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] left-[30%] w-2.5 h-2.5 rounded-full bg-surface-dark border-2 border-[#00D1FF] flex items-center justify-center shadow-[0_0_10px_rgba(0,209,255,0.5)] cursor-default"
          >
            <div className="w-1 h-1 bg-[#00D1FF] rounded-full" />
          </motion.div>

          <motion.div
            animate={{ x: [0, -3, 0], y: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[28%] right-[32%] w-2.5 h-2.5 rounded-full bg-surface-dark border-2 border-[#6C63FF] flex items-center justify-center shadow-[0_0_10px_rgba(108,99,255,0.5)] cursor-default"
          >
            <div className="w-1 h-1 bg-[#6C63FF] rounded-full" />
          </motion.div>

          {/* 1. FIGMA FLOATING BADGE */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -15 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: [0, -6, 0],
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              x: { duration: 0.8 }, 
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
            }}
            className="absolute top-[8%] left-[8%] px-2.5 py-1.5 rounded-full bg-surface-dark/95 border border-border-dark/80 text-[9px] font-mono text-text-luxury shadow-lg shadow-black/80 flex items-center gap-1.5"
          >
            <div className="flex gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F24E1E]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7262]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#1AC271]" />
            </div>
            <span className="opacity-90">figma.canvas</span>
          </motion.div>

          {/* 2. PEN TOOL PILL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, 6, 0],
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 }, 
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } 
            }}
            className="absolute top-[30%] left-[6%] p-2 rounded-xl bg-surface-dark/95 border border-primary-studio/30 shadow-[0_4px_15px_rgba(0,0,0,0.6)] flex items-center gap-2.5 group hover:border-[#00D1FF]/60 transition-colors cursor-default"
          >
            <div className="w-7 h-7 rounded-lg bg-[#00D1FF]/10 border border-[#00D1FF]/30 flex items-center justify-center text-[#00D1FF]">
              <PenTool className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[9px] font-semibold text-text-luxury whitespace-nowrap">Bezier curve</p>
              <p className="text-[7.5px] font-mono text-[#00D1FF]/70">P1: {`{dx, dy}`}</p>
            </div>
          </motion.div>

          {/* 3. AI SPARKLES CORE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.4 },
              scale: { duration: 0.8, delay: 0.4 },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } 
            }}
            className="absolute bottom-[8%] left-[8%] p-2.5 rounded-xl bg-gradient-to-br from-surface-dark/95 to-surface-dark/80 border border-[#6C63FF]/30 shadow-2xl flex items-center gap-2.5 cursor-default"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#6C63FF]/20 to-[#A855F7]/10 flex items-center justify-center text-secondary-studio filter drop-shadow-[0_0_6px_rgba(108,99,255,0.5)]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div>
              <p className="text-[8px] font-mono text-text-sub/45 uppercase tracking-wider">// AI_CORE</p>
              <p className="text-[10px] font-bold text-text-luxury">Neural System</p>
            </div>
          </motion.div>

          {/* 4. CURSOR ICON & SELECTION BOX */}
          <motion.div
            animate={{
              x: [0, 12, -4, 0],
              y: [0, -10, 6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[28%] right-[15%] z-20 pointer-events-none"
          >
            <div className="flex flex-col items-start">
              <MousePointer className="w-4 h-4 text-secondary-studio filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              <div className="mt-0.5 px-1 py-0.5 rounded bg-secondary-studio text-[#070B14] font-mono text-[6px] font-extrabold uppercase shadow">
                SUH_UX
              </div>
            </div>
          </motion.div>

          {/* 5. DESIGN WIREFRAME WINDOW BOUNDARY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 0.9, 
              scale: 1,
              y: [0, -5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" } 
            }}
            className="absolute top-[12%] right-[6%] p-2.5 rounded-xl bg-surface-dark/85 border border-border-dark/70 w-[120px] shadow-lg cursor-default"
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="w-1 h-1 rounded-full bg-border-dark" />
              <span className="text-[7.5px] font-mono text-text-sub/40 uppercase">Wireframe</span>
            </div>
            <div className="w-full h-7 border border-dashed border-[#00D1FF]/25 rounded bg-[#00D1FF]/5 flex items-center justify-center">
              <Grid className="w-3.5 h-3.5 text-[#00D1FF]/40" />
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[6.5px] font-mono text-[#00D1FF]">W: 1920</span>
              <span className="text-[6.5px] font-mono text-[#00D1FF]">H: 1080</span>
            </div>
          </motion.div>

          {/* 6. COLOR PALETTE SWATCHES */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, 6, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3 },
              x: { duration: 0.8, delay: 0.3 }, 
              y: { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 } 
            }}
            className="absolute bottom-[32%] right-[4%] p-2 rounded-xl bg-surface-dark/95 border border-border-dark flex flex-col gap-1.5 shadow-xl cursor-default"
          >
            <div className="flex items-center gap-1">
              <Palette className="w-3 h-3 text-[#00D1FF]" />
              <span className="text-[7.5px] font-mono text-text-sub uppercase">Palette</span>
            </div>
            <div className="flex gap-1">
              <span className="w-3 h-3 rounded-full bg-[#00D1FF] shadow-sm animate-pulse" />
              <span className="w-3 h-3 rounded-full bg-[#6C63FF] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#A855F7] shadow-sm" />
            </div>
          </motion.div>

          {/* 7. 3D ABSTRACT ORB / RING */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0],
              rotate: 360
            }}
            transition={{ 
              opacity: { duration: 0.9, delay: 0.5 },
              scale: { duration: 0.9, delay: 0.5 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
            className="absolute bottom-[6%] right-[12%] w-12 h-12 rounded-full border-2 border-dashed border-secondary-studio/20 flex items-center justify-center bg-gradient-to-tr from-surface-dark to-transparent cursor-default"
          >
            <div className="w-8 h-8 rounded-full border border-dotted border-[#00D1FF]/30 flex items-center justify-center">
              <Box className="w-3.5 h-3.5 text-[#00D1FF] animate-spin-slow" />
            </div>
          </motion.div>

          {/* 8. CREATIVE GLASS BLOB */}
          <motion.div
            animate={{
              x: [-4, 8, -4],
              y: [6, -10, 6]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[45%] left-[45%] w-16 h-16 rounded-full bg-gradient-to-tr from-[#00D1FF]/10 to-[#6C63FF]/15 blur-xl pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}

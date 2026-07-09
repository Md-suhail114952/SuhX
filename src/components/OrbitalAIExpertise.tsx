import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { 
  Sparkles, 
  BrainCircuit, 
  Palette, 
  Workflow, 
  Heart, 
  Layers, 
  Cpu, 
  Terminal,
  Search,
  Volume2,
  Zap,
  Flame
} from "lucide-react";

interface ToolConfig {
  name: string;
  category: string;
  description: string;
  color: string;
  glow: string;
  icon: React.ComponentType<any>;
  gradient: string;
  // Unique 3D abstract element styling
  renderAbstract3D: () => React.ReactNode;
}

export default function OrbitalAIExpertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [orbitStarted, setOrbitStarted] = useState(false);
  const [localTilts, setLocalTilts] = useState<{ [key: number]: { x: number; y: number } }>({});
  
  // Detect user reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Watch container dimensions to adjust radius dynamically
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setDimensions({
          width,
          height: 300
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate coordinates
  const isMobile = dimensions.width < 640;
  const radiusX = isMobile ? 120 : 280;
  const radiusY = radiusX * 0.35; // flattened ellipse

  const tools: ToolConfig[] = [
    {
      name: "ChatGPT",
      category: "LLM & Reasoning",
      description: "Prompt optimization matrices, advanced copywriting structures, custom GPT integrations.",
      color: "border-[#10a37f]/30 text-[#10a37f]",
      glow: "rgba(16,163,127,0.3)",
      icon: Sparkles,
      gradient: "from-[#10a37f]/20 via-[#10a37f]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Glowing rotating rings */}
          <div className="absolute w-16 h-16 rounded-full border border-[#10a37f]/20 animate-[spin_8s_linear_infinite]" />
          <div className="absolute w-12 h-12 rounded-full border border-dashed border-[#10a37f]/30 animate-[spin_5s_linear_infinite_reverse]" />
          {/* Center glowing star */}
          <div className="absolute w-6 h-6 bg-[#10a37f]/25 rounded-full blur-md animate-pulse" />
          <Sparkles className="w-5 h-5 text-[#10a37f] relative z-10 filter drop-shadow-[0_0_8px_rgba(16,163,127,0.8)]" />
        </div>
      )
    },
    {
      name: "Claude",
      category: "Systemic Logic",
      description: "Systemic coding guides, user experience audits, programmatic UI architectures.",
      color: "border-[#d97706]/30 text-[#d97706]",
      glow: "rgba(217,119,6,0.3)",
      icon: BrainCircuit,
      gradient: "from-[#d97706]/20 via-[#d97706]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Circuit network abstract */}
          <svg className="absolute w-16 h-16 opacity-40 text-[#d97706]" viewBox="0 0 100 100">
            <line x1="15" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="85" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="15" r="4" fill="currentColor" className="animate-ping" />
            <circle cx="15" cy="50" r="3" fill="currentColor" />
            <circle cx="85" cy="50" r="3" fill="currentColor" />
          </svg>
          <div className="absolute w-8 h-8 bg-[#d97706]/20 rounded-full blur-md" />
          <BrainCircuit className="w-5 h-5 text-[#d97706] relative z-10 filter drop-shadow-[0_0_8px_rgba(217,119,6,0.8)]" />
        </div>
      )
    },
    {
      name: "Midjourney",
      category: "Generative Art",
      description: "Hyper-realistic conceptual assets, creative art directions, cinematic brand backdrops.",
      color: "border-[#6C63FF]/30 text-[#6C63FF]",
      glow: "rgba(108,99,255,0.3)",
      icon: Palette,
      gradient: "from-[#6C63FF]/20 via-[#6C63FF]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Shutter aperture concept */}
          <div className="absolute w-14 h-14 rounded-full border border-[#6C63FF]/30 rotate-45 flex items-center justify-center">
            <div className="w-10 h-10 border border-[#6C63FF]/20 rotate-12 flex items-center justify-center" />
          </div>
          <div className="absolute w-7 h-7 bg-gradient-to-tr from-[#6C63FF]/40 to-transparent rounded-full blur-sm" />
          <Palette className="w-5 h-5 text-[#6C63FF] relative z-10 filter drop-shadow-[0_0_8px_rgba(108,99,255,0.8)]" />
        </div>
      )
    },
    {
      name: "Google Stitch",
      category: "Asset Stitching",
      description: "Multi-model orchestration, vector style matching, automatic asset pipelines.",
      color: "border-[#00D1FF]/30 text-[#00D1FF]",
      glow: "rgba(0,209,255,0.3)",
      icon: Workflow,
      gradient: "from-[#00D1FF]/20 via-[#00D1FF]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Interconnected loops */}
          <div className="absolute w-12 h-6 rounded-full border border-[#00D1FF]/30 rotate-12 animate-[pulse_2s_infinite]" />
          <div className="absolute w-12 h-6 rounded-full border border-[#00D1FF]/30 -rotate-12 animate-[pulse_2s_infinite_1s]" />
          <div className="absolute w-6 h-6 bg-[#00D1FF]/20 rounded-full blur-md" />
          <Workflow className="w-5 h-5 text-[#00D1FF] relative z-10 filter drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
        </div>
      )
    },
    {
      name: "Lovable",
      category: "Code Generation",
      description: "Rapid high-performance component compilation, fully interactive client logic synthesis.",
      color: "border-[#f43f5e]/30 text-[#f43f5e]",
      glow: "rgba(244,63,94,0.3)",
      icon: Heart,
      gradient: "from-[#f43f5e]/20 via-[#f43f5e]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Faceted glass heart look */}
          <div className="absolute w-10 h-10 rounded-full bg-[#f43f5e]/15 blur-md animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center scale-110">
            <svg className="w-12 h-12 text-[#f43f5e]/30 absolute animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <Heart className="w-5 h-5 text-[#f43f5e] relative z-10 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" fill="currentColor" fillOpacity={0.15} />
        </div>
      )
    },
    {
      name: "Gamma",
      category: "Content Styling",
      description: "Dynamic responsive slide setups, choreographed text hierarchies, and page presets.",
      color: "border-[#8b5cf6]/30 text-[#8b5cf6]",
      glow: "rgba(139,92,246,0.3)",
      icon: Layers,
      gradient: "from-[#8b5cf6]/20 via-[#8b5cf6]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Stacked isometric sheets */}
          <div className="absolute w-10 h-7 border border-[#8b5cf6]/40 rounded bg-[#8b5cf6]/5 -rotate-12 translate-y-[-4px] translate-x-[-2px] opacity-60" />
          <div className="absolute w-10 h-7 border border-[#8b5cf6]/40 rounded bg-[#8b5cf6]/5 rotate-6 translate-y-[2px] translate-x-[2px]" />
          <div className="absolute w-4 h-4 bg-[#8b5cf6]/20 rounded-full blur-md" />
          <Layers className="w-5 h-5 text-[#8b5cf6] relative z-10 filter drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
        </div>
      )
    },
    {
      name: "Adobe CC",
      category: "Digital Composition",
      description: "Advanced layered layouts, vectors alignment, custom pixel curation systems.",
      color: "border-[#ef4444]/30 text-[#ef4444]",
      glow: "rgba(239,68,68,0.3)",
      icon: Cpu,
      gradient: "from-[#ef4444]/20 via-[#ef4444]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Refractive crystal cube overlay */}
          <div className="absolute w-11 h-11 border border-[#ef4444]/30 rotate-45 bg-[#ef4444]/5" />
          <div className="absolute w-11 h-11 border border-[#ef4444]/20 -rotate-45" />
          <div className="absolute w-6 h-6 bg-[#ef4444]/20 rounded-full blur-sm animate-pulse" />
          <Cpu className="w-5 h-5 text-[#ef4444] relative z-10 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        </div>
      )
    },
    {
      name: "Google AI Studio",
      category: "Model Prototyping",
      description: "Sleek Gemini models execution workspace, robust server-side systems orchestration.",
      color: "border-[#3b82f6]/30 text-[#3b82f6]",
      glow: "rgba(59,130,246,0.3)",
      icon: Terminal,
      gradient: "from-[#3b82f6]/20 via-[#3b82f6]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Cosmic gateway structure */}
          <div className="absolute w-14 h-14 rounded-full border border-double border-[#3b82f6]/30 animate-[spin_12s_linear_infinite]" />
          <div className="absolute w-8 h-8 bg-gradient-to-tr from-[#3b82f6]/30 to-[#00D1FF]/20 rounded-full blur-sm" />
          <Terminal className="w-5 h-5 text-[#3b82f6] relative z-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </div>
      )
    },
    {
      name: "Antigravity",
      category: "Cognitive Agent Orchestrator",
      description: "Advanced autonomous multi-agent systems, context steering, and high-fidelity runtime code synthesis.",
      color: "border-[#FF00D6]/30 text-[#FF00D6]",
      glow: "rgba(255,0,214,0.3)",
      icon: Zap,
      gradient: "from-[#FF00D6]/20 via-[#FF00D6]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Antigravity floating rings / spheres */}
          <div className="absolute w-12 h-12 rounded-full border border-dashed border-[#FF00D6]/30 animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-2 h-2 rounded-full bg-[#FF00D6] animate-ping" style={{ top: '25%', left: '25%' }} />
          <div className="absolute w-3 h-3 rounded-full bg-[#FF00D6]/40 animate-bounce" />
          <div className="absolute w-8 h-8 bg-[#FF00D6]/20 rounded-full blur-sm" />
          <Zap className="w-5 h-5 text-[#FF00D6] relative z-10 filter drop-shadow-[0_0_8px_rgba(255,0,214,0.8)]" />
        </div>
      )
    },
    {
      name: "Adobe Firefly",
      category: "Generative Imaging",
      description: "Ethical commercial generative art models, precise vector style transfers, and text-to-image expansion vectors.",
      color: "border-[#FF5E00]/30 text-[#FF5E00]",
      glow: "rgba(255,94,0,0.3)",
      icon: Flame,
      gradient: "from-[#FF5E00]/20 via-[#FF5E00]/5 to-transparent",
      renderAbstract3D: () => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Adobe Firefly floating flame/particles abstract */}
          <div className="absolute w-14 h-14 rounded-full border border-[#FF5E00]/20 animate-pulse" />
          <div className="absolute w-10 h-10 bg-[#FF5E00]/15 rounded-full blur-md" />
          {/* Little firefly dots */}
          <div className="absolute w-1 h-1 rounded-full bg-white animate-ping" style={{ top: '30%', left: '40%' }} />
          <div className="absolute w-1 h-1 rounded-full bg-[#FF5E00] animate-ping" style={{ top: '65%', left: '60%' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#FF5E00]/80 animate-pulse" style={{ top: '45%', left: '30%' }} />
          <Flame className="w-5 h-5 text-[#FF5E00] relative z-10 filter drop-shadow-[0_0_8px_rgba(255,94,0,0.8)]" />
        </div>
      )
    }
  ];

  // Helper: Generates coordinates path for sequential entry along the ellipse
  const getPathKeyframes = (targetAngle: number, rx: number, ry: number) => {
    const startAngle = -Math.PI; // start from the left far end
    const steps = 4;
    const xKeyframes: number[] = [];
    const yKeyframes: number[] = [];

    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      const angle = startAngle + (targetAngle - startAngle) * ratio;
      xKeyframes.push(rx * Math.cos(angle));
      yKeyframes.push(ry * Math.sin(angle));
    }

    return { x: xKeyframes, y: yKeyframes };
  };

  // Trigger orbital state after the final icon lands
  useEffect(() => {
    if (prefersReducedMotion) {
      setOrbitStarted(false);
      return;
    }
    const totalSetupDuration = (tools.length - 1) * 0.6 + 1.4;
    const timer = setTimeout(() => {
      setOrbitStarted(true);
    }, totalSetupDuration * 1000);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Handle local 3D card tilt on hover
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range -0.5 to 0.5
    setLocalTilts((prev) => ({
      ...prev,
      [index]: { x: x * 16, y: -y * 16 } // Max 8 degrees tilt (total span 16)
    }));
  };

  const handleCardMouseLeave = (index: number) => {
    setLocalTilts((prev) => ({
      ...prev,
      [index]: { x: 0, y: 0 }
    }));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[360px] flex items-center justify-center overflow-visible select-none my-12"
    >
      {/* 1. Low-opacity radial glow at the center to ground the composition */}
      <div 
        className="absolute w-80 h-32 rounded-full pointer-events-none opacity-30 filter blur-3xl transition-colors duration-1000"
        style={{
          background: hoveredIndex !== null 
            ? tools[hoveredIndex].glow 
            : "radial-gradient(circle, rgba(108,99,255,0.4) 0%, rgba(0,209,255,0.15) 70%, transparent 100%)",
          transform: "translateY(10px)"
        }}
      />

      {/* 2. Invisible elliptical tracks for design guidelines */}
      <div 
        className="absolute rounded-full border border-white/[0.03] pointer-events-none"
        style={{
          width: radiusX * 2,
          height: radiusY * 2,
          transform: "rotate(0deg)"
        }}
      />
      
      {/* 3. Orbit Rotation Container */}
      <motion.div
        className="absolute w-full h-full flex items-center justify-center overflow-visible pointer-events-none"
        animate={orbitStarted && !prefersReducedMotion ? { rotate: [0, 360] } : { rotate: 0 }}
        transition={{
          repeat: Infinity,
          duration: 75, // slow 75s orbit to be premium and non-distracting
          ease: "linear"
        }}
      >
        {tools.map((tool, index) => {
          // Equally space 8 icons along the full 2PI loop
          const baseAngle = (index * 2 * Math.PI) / tools.length;
          const { x: xKeyframes, y: yKeyframes } = getPathKeyframes(baseAngle, radiusX, radiusY);

          // Position calculated statically for static / prefers-reduced-motion fallback
          const staticX = radiusX * Math.cos(baseAngle);
          const staticY = radiusY * Math.sin(baseAngle);

          const tilt = localTilts[index] || { x: 0, y: 0 };
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={tool.name}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                x: prefersReducedMotion ? staticX : undefined,
                y: prefersReducedMotion ? staticY : undefined,
                transform: "translate(-50%, -50%)",
                zIndex: isHovered ? 40 : 10
              }}
              // 4. Sequential entry along the ellipse path
              animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : {
                x: xKeyframes,
                y: yKeyframes,
                opacity: 1,
                scale: 1
              }}
              initial={prefersReducedMotion ? { opacity: 0 } : {
                x: xKeyframes[0],
                y: yKeyframes[0],
                opacity: 0,
                scale: 0.7
              }}
              transition={prefersReducedMotion ? { duration: 0.5, delay: index * 0.1 } : {
                x: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.6 },
                y: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.6 },
                opacity: { duration: 1.2, delay: index * 0.6 },
                scale: { duration: 1.2, delay: index * 0.6 }
              }}
              className="pointer-events-auto"
            >
              {/* Counter-rotation to keep icons perfectly upright during global orbit */}
              <motion.div
                animate={orbitStarted && !prefersReducedMotion ? { rotate: [0, -360] } : { rotate: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 75,
                  ease: "linear"
                }}
              >
                {/* 5. Continuous idle float (nested child) */}
                <motion.div
                  animate={!prefersReducedMotion ? { y: [0, -8, 0] } : { y: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: index * 0.35 // staggered floating phase
                  }}
                >
                  {/* 3D Parallax Tilt container */}
                  <div
                    onMouseMove={(e) => handleCardMouseMove(e, index)}
                    onMouseLeave={() => handleCardMouseLeave(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className="relative w-[76px] h-[76px] sm:w-[90px] sm:h-[90px] rounded-2xl cursor-pointer flex flex-col items-center justify-center transition-all duration-300"
                    style={{
                      transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                      transition: "transform 0.1s ease-out"
                    }}
                  >
                    {/* Shadow under floating card */}
                    <div 
                      className="absolute -bottom-4 w-3/4 h-2 rounded-full blur-md opacity-35 transition-all duration-300 pointer-events-none"
                      style={{
                        background: tool.glow,
                        transform: isHovered ? "scale(1.2)" : "scale(1)"
                      }}
                    />

                    {/* Highly polished Glass card container */}
                    <div 
                      className={`absolute inset-0 rounded-2xl bg-slate-950/70 border ${tool.color} backdrop-blur-xl shadow-2xl transition-all duration-500 overflow-hidden flex items-center justify-center`}
                      style={{
                        boxShadow: isHovered 
                          ? `0 0 25px ${tool.glow}, inset 0 1px 2px rgba(255,255,255,0.15)` 
                          : "inset 0 1px 1px rgba(255,255,255,0.05)"
                      }}
                    >
                      {/* Inner ambient glow background overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-b ${tool.gradient} opacity-20`} />

                      {/* Studio-light reflection highlight at the top */}
                      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {/* Unique Abstract 3D shape layer */}
                      {tool.renderAbstract3D()}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 6. Premium tooltip panel showing active tool specifications */}
      <div className="absolute bottom-[-10px] sm:bottom-0 inset-x-0 text-center pointer-events-none h-16 flex items-center justify-center">
        <div className="h-full flex items-center justify-center">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 10 }}
              animate={hoveredIndex === idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ display: hoveredIndex === idx ? "block" : "none" }}
              className="px-6 py-2.5 rounded-full bg-slate-950/90 border border-white/10 backdrop-blur-md shadow-2xl text-center max-w-[90vw] sm:max-w-md pointer-events-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <span className="text-[11px] font-mono text-[#00D1FF] uppercase tracking-wider">{tool.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]/40" />
                <span className="text-xs font-bold text-text-luxury">{tool.name}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-sans line-clamp-1 leading-snug">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

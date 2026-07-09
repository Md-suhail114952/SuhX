import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Cpu, Layers, Palette, Sparkles, Sliders, Activity } from "lucide-react";

interface SkillItem {
  name: string;
  percentage: number;
  color: string;
  glowColor: string;
  icon: React.ComponentType<any>;
  description: string;
  tags: string[];
}

const skillsData: SkillItem[] = [
  {
    name: "UI/UX & High-Fi Prototyping",
    percentage: 90,
    color: "bg-cyan-500",
    glowColor: "rgba(6,182,212,0.6)",
    icon: Layers,
    description: "Designing sleek spatial wireframes, structural user flows, and award-winning dynamic high-fidelity mockups.",
    tags: ["Figma", "High-Fi Wireframes", "Interactive Prototypes", "Usability Psychology"]
  },
  {
    name: "Graphic Composition & Layout Design",
    percentage: 85,
    color: "bg-indigo-500",
    glowColor: "rgba(99,102,241,0.6)",
    icon: Palette,
    description: "Fusing background classical sketching with modern vector rules, grid alignments, and balanced negative space.",
    tags: ["Vector Grid", "Classic Drawing", "Visual Rhythm", "Bento Grid Layouts"]
  },
  {
    name: "AI Workflow Engineering (LLM/Diffusion)",
    percentage: 80,
    color: "bg-purple-500",
    glowColor: "rgba(168,85,247,0.6)",
    icon: Brain,
    description: "Finetuning text-to-image models, prompting custom diffusion variables, and orchestrating intelligent cognitive backends.",
    tags: ["Stable Diffusion", "Prompt Pipelines", "Gemini API", "Agentic Workflows"]
  },
  {
    name: "Typography & Color Theory Matrix",
    percentage: 88,
    color: "bg-teal-500",
    glowColor: "rgba(20,184,166,0.6)",
    icon: Sparkles,
    description: "Orchestrating high-contrast visual systems with optimal readability, deliberate font pairing, and intentional color psychology.",
    tags: ["Contrast Ratios", "Font Hierarchy", "Intentional Palette", "Responsive Scaling"]
  },
  {
    name: "Motion & Branding Systems",
    percentage: 75,
    color: "bg-pink-500",
    glowColor: "rgba(236,72,153,0.6)",
    icon: Cpu,
    description: "Constructing modular kinetic assets, smooth transition matrices, and cohesive commercial branding guidelines.",
    tags: ["Lottie", "GSAP Timeline", "Micro-interactions", "Design Systems"]
  }
];

export default function PremiumSkillGraph() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(skillsData.map(() => 0));

  // Slow initial load animation for radar graph polygon nodes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(skillsData.map(s => s.percentage));
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Geometry calculations for a 5-sided Radar chart
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;
  const totalSides = skillsData.length;

  const getCoordinates = (index: number, val: number) => {
    // Offset by -Math.PI / 2 to make the first vertex point straight up
    const angle = (Math.PI * 2 / totalSides) * index - Math.PI / 2;
    const distance = (val / 100) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  // Concentric background rings (grids)
  const gridLevels = [25, 50, 75, 100];
  const gridPaths = gridLevels.map((level) => {
    const points = Array.from({ length: totalSides }).map((_, i) => {
      const coord = getCoordinates(i, level);
      return `${coord.x},${coord.y}`;
    });
    return points.join(" ");
  });

  // Calculate the user score polygon coordinates
  const scorePoints = animatedValues.map((val, i) => {
    const coord = getCoordinates(i, val);
    return `${coord.x},${coord.y}`;
  }).join(" ");

  // Spikes (guidelines from center to vertices)
  const guidelines = Array.from({ length: totalSides }).map((_, i) => {
    const outerCoord = getCoordinates(i, 100);
    return { x1: center, y1: center, x2: outerCoord.x, y2: outerCoord.y };
  });

  return (
    <div className="w-full relative mt-12 bg-surface-dark/20 border border-border-dark/40 rounded-3xl p-6 md:p-8 backdrop-blur-md overflow-hidden">
      
      {/* Background Decorative Tech Coordinates */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 opacity-30 select-none">
        <Activity className="w-3.5 h-3.5 text-[#00D1FF] animate-pulse" />
        <span className="text-[10px] font-mono text-text-sub uppercase tracking-widest">// COGNITIVE TELEMETRY GRID</span>
      </div>

      <div className="absolute top-4 right-4 text-[10px] font-mono text-text-sub/20 select-none uppercase tracking-widest hidden md:block">
        SUHX-SYNTH-v1.89
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Interactive Radar Graph Viz */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Futuristic Floating Rotating Ring behind radar */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-[#00D1FF]/10 animate-[spin_50s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-indigo-500/5 animate-[spin_35s_linear_infinite_reverse] pointer-events-none" />
          
          <div className="relative w-[320px] h-[320px] select-none">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
              
              <defs>
                {/* Score polygon radial & linear gradients */}
                <radialGradient id="scoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 209, 255, 0.45)" />
                  <stop offset="70%" stopColor="rgba(108, 99, 255, 0.25)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0.0)" />
                </radialGradient>
                
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Draw concentric pentagons */}
              {gridPaths.map((pointsPath, idx) => (
                <polygon
                  key={idx}
                  points={pointsPath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  className="transition-all duration-300"
                />
              ))}

              {/* Level texts along the top spike */}
              {gridLevels.map((level) => {
                const coord = getCoordinates(0, level);
                return (
                  <text
                    key={level}
                    x={coord.x + 8}
                    y={coord.y + 4}
                    fill="rgba(255, 255, 255, 0.15)"
                    fontSize="7"
                    fontFamily="monospace"
                    className="select-none pointer-events-none"
                  >
                    {level}%
                  </text>
                );
              })}

              {/* Draw guidelines from center */}
              {guidelines.map((line, idx) => (
                <line
                  key={idx}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              ))}

              {/* Filled Score Area Polygon with animated coordinates */}
              <polygon
                points={scorePoints}
                fill="url(#scoreGlow)"
                stroke="rgba(0, 209, 255, 0.85)"
                strokeWidth="1.5"
                filter="url(#glowFilter)"
                className="transition-all duration-700 ease-out"
              />

              {/* Interactive nodes at vertices */}
              {skillsData.map((skill, idx) => {
                const score = animatedValues[idx];
                const coord = getCoordinates(idx, score);
                const outerCoord = getCoordinates(idx, 100);
                const isHovered = activeIdx === idx;
                
                return (
                  <g 
                    key={skill.name} 
                    className="cursor-pointer group"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseLeave={() => setActiveIdx(null)}
                  >
                    {/* Glowing outer aura for hovered vertex */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isHovered ? 12 : 6}
                      fill={skill.glowColor}
                      className="transition-all duration-300 opacity-60"
                    />
                    
                    {/* Inner high-contrast core */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isHovered ? 4.5 : 3.5}
                      fill="#ffffff"
                      stroke={isHovered ? "#00D1FF" : "transparent"}
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />

                    {/* Node interactive anchor label line */}
                    <circle
                      cx={outerCoord.x}
                      cy={outerCoord.y}
                      r="2.5"
                      fill="rgba(255, 255, 255, 0.2)"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Custom Central Text readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[10px] font-mono tracking-widest text-text-sub/40 uppercase">SYNTH</span>
              <span className="text-xl font-display font-extrabold text-white tracking-tight drop-shadow-md">
                {activeIdx !== null ? `${skillsData[activeIdx].percentage}%` : "90%"}
              </span>
              <span className="text-[9px] font-mono text-[#00D1FF] uppercase tracking-wider">
                {activeIdx !== null ? "Focus Value" : "Peak Capacity"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Glowing Skill Cards & Detailed Description */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs font-mono tracking-widest text-text-sub uppercase mb-1 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#00D1FF]" />
            // Skill Performance Synthesis
          </h4>

          <div className="grid grid-cols-1 gap-3.5">
            {skillsData.map((skill, idx) => {
              const Icon = skill.icon;
              const isActive = activeIdx === idx;
              
              return (
                <div
                  key={skill.name}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group/item ${
                    isActive 
                      ? "bg-white/[0.04] border-[#00D1FF]/40 shadow-[0_0_20px_rgba(0,209,255,0.06)]" 
                      : "bg-surface-dark/40 border-border-dark/60 hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  {/* Skill Progress Bar Glow Backdrop */}
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/[0.01] via-transparent to-transparent w-1/2 pointer-events-none" />

                  <div className="flex items-start gap-4">
                    {/* Icon Slot */}
                    <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                      isActive 
                        ? "bg-[#00D1FF]/10 border-[#00D1FF]/40 text-[#00D1FF]" 
                        : "bg-surface-dark border-border-dark/80 text-text-sub group-hover/item:border-white/20 group-hover/item:text-white"
                    }`}>
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>

                    {/* Info and slider progress */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <h5 className={`text-sm font-display font-semibold truncate transition-colors duration-300 ${
                          isActive ? "text-white" : "text-text-sub/90 group-hover/item:text-white"
                        }`}>
                          {skill.name}
                        </h5>
                        <span className="text-xs font-mono text-[#00D1FF] font-bold">
                          {skill.percentage}%
                        </span>
                      </div>

                      {/* Slider meter */}
                      <div className="h-1.5 rounded-full bg-surface-dark/90 border border-border-dark/40 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: idx * 0.1, ease: "easeOut" }}
                          className={`h-full rounded-full ${skill.color} relative`}
                        >
                          {/* Pulsing micro node at end of slider */}
                          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white shadow-[0_0_6px_#fff] animate-pulse" />
                        </motion.div>
                      </div>

                      {/* Expanding Details Panel */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-text-sub leading-relaxed mb-3">
                              {skill.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {skill.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="text-[9px] font-mono bg-white/[0.04] border border-white/[0.08] text-text-sub/80 px-2 py-0.5 rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}

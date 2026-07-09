import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ProcessStep } from "../types";
import { Search, Compass, BookOpen, PenTool, Code, Cpu, ArrowDown } from "lucide-react";

export default function ProcessTimeline() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const steps: ProcessStep[] = [
    {
      number: "01",
      phase: "Discovery",
      subtitle: "Contextual Auditing & Alignment",
      description: "Establishing explicit client goals, product vision mapping, technical requirement extraction, and competitive creative benchmark definition to anchor design direction.",
      deliverable: "Product Brief & Creative Map",
    },
    {
      number: "02",
      phase: "Research",
      subtitle: "User Archetypes & Industry Trends",
      description: "Deep-dive qualitative user flow mapping, layout ergonomics evaluation, visual trend diagnostics, and digital typography landscape analysis to inform core style blueprints.",
      deliverable: "User Journey & Style Diagnosis",
    },
    {
      number: "03",
      phase: "Strategy",
      subtitle: "Visual Architecture & Design Tokens",
      description: "Establishing global Figma variables, responsive layouts grids, design token frameworks, and color/imagery parameters suited for future developers.",
      deliverable: "Global Style Tokens & IA Guides",
    },
    {
      number: "04",
      phase: "Design",
      subtitle: "Cinematic High-Fi Prototyping",
      description: "Full viewport high-fidelity graphic creation, micro-interaction setups, fluid visual balance loops, and animated mockup design cycles that look completely real.",
      deliverable: "Interactive Figma Prototypes",
    },
    {
      number: "05",
      phase: "Development",
      subtitle: "Code Translation & API Handshake",
      description: "Handing design specifications cleanly to engineering teams, deploying visual assets, coding front-end React templates, and layering server-side AI model structures.",
      deliverable: "Modular React Layout Code",
    },
    {
      number: "06",
      phase: "Optimization",
      subtitle: "Ergonomics Testing & Pixel Auditing",
      description: "Performing microscopic pixel quality auditing, responsiveness testing across multiple viewport standards, accessibility testing, and frame-rate interaction checkups.",
      deliverable: "Lighthouse Audit & Production Release",
    },
  ];

  return (
    <section id="process" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-dark/40">
      {/* Structural Headers */}
      <div className="text-center mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full inline-block">
          // The Studio Matrix
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury mt-4">
          Atmospheric <span className="text-gradient font-bold">Execution Workflow</span>
        </h2>
        <p className="max-w-xl mx-auto text-sm text-text-sub mt-4">
          A systematic design-engineering process bridging modern creative agency discipline with certified AI automation pipelines.
        </p>
      </div>

      {/* Connected Glowing Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {/* Dynamic decorative connective wire overlays for PC views */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.15 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion
              ? { duration: 0.1 }
              : { duration: 1.2, ease: "easeOut", delay: steps.length * 0.25 }
          }
          className="hidden lg:block absolute inset-0 top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-studio via-secondary-studio to-accent-studio origin-left pointer-events-none"
        />

        {steps.map((step, idx) => {
          // Select appropriate icon
          const StepIcons = [Search, BookOpen, Compass, PenTool, Code, Cpu];
          const IconComponent = StepIcons[idx] || Search;

          const initialRotation = [-4.5, 3.8, -3.2, 4.8, -2.5, 3.2][idx % 6];
          const targetRotation = [-1.2, 1.5, -0.8, 1.2, -0.5, 0.9][idx % 6];

          return (
            <motion.div
              key={step.number}
              initial={
                shouldReduceMotion 
                  ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                  : { opacity: 0, y: 40, scale: 0.98, rotate: initialRotation * 0.5 }
              }
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                  : { opacity: 1, y: 0, scale: 1, rotate: targetRotation * 0.5 }
              }
              viewport={{ once: true, amount: 0.15 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.1 }
                  : {
                      type: "spring",
                      stiffness: 70,
                      damping: 15,
                      delay: idx * 0.08,
                    }
              }
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.02,
                      y: -8,
                      rotate: 0,
                      borderColor: "rgba(0, 209, 255, 0.4)",
                    }
              }
              className="p-8 rounded-3xl glass transition-all duration-300 relative overflow-hidden group flex flex-col justify-between cursor-default hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              id={`process-step-${step.number}`}
            >
              {/* Giant Watermarked Number Indicator */}
              <div className="absolute top-4 right-6 text-7xl font-display font-black text-text-primary select-none opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-300">
                {step.number}
              </div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#070B14] border border-border-dark flex items-center justify-center text-[#6C63FF] group-hover:text-[#00D1FF] group-hover:border-[#00D1FF]/40 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#00D1FF] tracking-widest">// Stage {step.number}</span>
                    <h3 className="text-xl font-display font-extrabold text-text-luxury">
                      {step.phase}
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-mono text-text-sub group-hover:text-text-luxury font-medium transition-colors duration-300 uppercase tracking-widest mb-3">
                  {step.subtitle}
                </p>

                <p className="text-sm text-text-sub leading-relaxed group-hover:text-text-luxury/90 transition-colors duration-300">
                  {step.description}
                </p>
              </div>

              {/* Deliverable display */}
              <div className="mt-8 pt-4 border-t border-border-dark/60">
                <p className="text-[9px] font-mono uppercase text-text-sub/50">Core Deliverable</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:animate-ping" />
                  <span className="text-xs font-mono text-[#00D1FF] group-hover:text-emerald-300 transition-colors duration-300">
                    {step.deliverable}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

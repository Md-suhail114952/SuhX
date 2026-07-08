import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Eye, Plus, Check } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  metrics: string;
  colSpan: string;
  aspect: string;
  year: string;
}

export default function SelectedWorks() {
  const projects: ProjectItem[] = [
    {
      id: "p1",
      title: "Amazon Listings Infographics Designs",
      category: "Social Media Designs",
      description: "Highly persuasive product presentation slides, infographic layouts, and visual feature callouts designed to communicate value instantly and maximize purchase likelihood.",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
      tags: ["Infographics", "Sales Optimization", "Visual Curation"],
      metrics: "+112% Conversion Flow",
      colSpan: "md:col-span-7",
      aspect: "aspect-[16/10] sm:aspect-[16/9]",
      year: "2026"
    },
    {
      id: "p2",
      title: "Enhance Brand Content / A-Content",
      category: "Branding",
      description: "Geometric brand strategy, digital asset style guides, and high-impact visual identity constructs aimed at increasing marketplace conversion rates for premium brands.",
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=1200&q=80",
      tags: ["Logo Guidelines", "Brand Guidelines", "Asset Generation"],
      metrics: "Premium Curation",
      colSpan: "md:col-span-5",
      aspect: "aspect-[4/3]",
      year: "2026"
    },
    {
      id: "p3",
      title: "Olivaflix Brand Identity",
      category: "Branding",
      description: "A comprehensive brand identity framework and premium styling system developed for Olivaflix. Focusing on modern cinematic logo structures, synchronized typography, color palettes, and unified design guides.",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
      tags: ["Visual Identity", "Sleek Typography", "Style Manual"],
      metrics: "Corporate Blueprint",
      colSpan: "md:col-span-5",
      aspect: "aspect-[4/3]",
      year: "2025"
    },
    {
      id: "p4",
      title: "Amazon Listings Infographics (AI Curation)",
      category: "AI Generated Work",
      description: "Harnessing the power of state-of-the-art diffusion models, localized prompting, and image editing pipelines to engineer professional e-commerce product landscapes.",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1200&q=80",
      tags: ["Midjourney Curation", "Image Composites", "Ad Creative AI"],
      metrics: "Generative Artistry",
      colSpan: "md:col-span-7",
      aspect: "aspect-[16/10] sm:aspect-[16/9]",
      year: "2026"
    }
  ];

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [spinningKey, setSpinningKey] = useState<string | null>(null);
  const [flippedKey, setFlippedKey] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // For a seamless horizontal loop, duplicate projects array
  const duplicatedProjects = [...projects, ...projects, ...projects];

  // Subtle natural rotations and Z offsets for an organic deck feel
  const rotations = [-2.5, 1.8, -1.2, 2.2, -1.5, 0.8, -2.0, 1.5, -0.8, 1.8, -1.2, 0.5];
  const zOffsets = [0, 8, -4, 4, -8, 12, 0, 6, -3, 3, -6, 9];

  const handleCardClick = (instanceKey: string) => {
    if (spinningKey !== null) return;
    setSpinningKey(instanceKey);
    setFlippedKey(prev => prev === instanceKey ? null : instanceKey);
  };

  return (
    <section id="work" className="bg-bg py-20 border-b border-stroke/30 select-none overflow-hidden">
      {/* Self-contained CSS for high-performance scrolling and 3D backface visibility */}
      <style>{`
        @keyframes drift-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        .drift-track {
          animation: drift-scroll 45s linear infinite;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header with Framer Motion scroll entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">Selected Work</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-text-primary mb-4 leading-none">
              Featured <span className="font-display italic">projects</span>
            </h2>
            
            <p className="text-sm md:text-base text-muted max-w-md font-light leading-relaxed">
              A premium curation of graphic systems, UI designs, and generative art pipelines developed to maximize conversion.
            </p>
          </div>

          {/* Desktop Only View All Button */}
          <div className="hidden md:block">
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-2 rounded-full text-xs font-mono tracking-tight uppercase px-5 py-3 border border-stroke bg-bg/40 text-text-primary cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full bg-transparent group-hover:accent-gradient -z-20 p-[1.5px]" />
              <span className="absolute inset-[1px] rounded-full bg-bg -z-10 group-hover:bg-surface transition-all duration-300" />
              <span>SAY HI FOR ENQUIRIES</span>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-text-primary group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* 3D Carousel Stage */}
      <div 
        className="relative w-full h-[520px] flex items-center justify-start overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div 
          className="w-full flex items-center justify-start py-8 px-4"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: shouldReduceMotion ? "none" : "rotateY(-10deg) rotateX(3deg)" 
          }}
        >
          {/* Scrolling Track */}
          <div 
            className={`flex gap-8 px-4 ${shouldReduceMotion ? "overflow-x-auto w-full max-w-[1200px] mx-auto" : "drift-track"}`}
            style={{ 
              transformStyle: "preserve-3d",
              animationPlayState: (isHovered || spinningKey !== null) ? "paused" : "running"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoveredKey(null);
            }}
          >
            {duplicatedProjects.map((project, idx) => {
              const instanceKey = `${project.id}-${idx}`;
              const isFlipped = flippedKey === instanceKey;
              const isSpinning = spinningKey === instanceKey;
              const isCurrentHovered = hoveredKey === instanceKey;

              // Opacity calculation for elegant focal points
              const opacity = hoveredKey === null
                ? (isFlipped ? 1 : 0.85)
                : (isCurrentHovered || isFlipped ? 1 : 0.5);

              // Scale calculation for soft magnification
              const scale = hoveredKey === null
                ? 1
                : (isCurrentHovered ? 1.04 : 0.92);

              const baseRotation = rotations[idx % rotations.length];
              const baseZ = zOffsets[idx % zOffsets.length];

              return (
                <motion.div
                  key={instanceKey}
                  tabIndex={0}
                  aria-label={`Project: ${project.title}. Click to reveal performance metrics.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(instanceKey);
                    }
                  }}
                  onClick={() => handleCardClick(instanceKey)}
                  onMouseEnter={() => setHoveredKey(instanceKey)}
                  onMouseLeave={() => setHoveredKey(null)}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    scale: isSpinning ? [1, 1.15, 1] : scale,
                    z: isSpinning ? [baseZ, baseZ + 80, baseZ] : baseZ,
                    rotate: isFlipped ? 0 : baseRotation,
                    opacity: opacity,
                    boxShadow: isSpinning
                      ? "0 30px 60px rgba(0, 209, 255, 0.45), 0 0 40px rgba(108, 99, 255, 0.25)"
                      : isCurrentHovered
                      ? "0 20px 40px rgba(0, 0, 0, 0.45)"
                      : "0 10px 25px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.1 }
                      : isSpinning
                      ? { duration: 1.1, ease: [0.65, 0, 0.35, 1] }
                      : { duration: 0.4, ease: "easeOut" }
                  }
                  onAnimationComplete={() => {
                    if (isSpinning) {
                      setSpinningKey(null);
                    }
                  }}
                  className="relative w-80 h-96 rounded-2xl cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[#00D1FF] transition-shadow duration-300 bg-[#0C0F19]/40 border border-white/5"
                  id={`case-card-${instanceKey}`}
                >
                  {/* FRONT FACE */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden flex flex-col justify-between"
                    style={{ transform: "rotateY(0deg)", transformStyle: "preserve-3d" }}
                  >
                    {/* Halftone overlay */}
                    <div className="absolute inset-0 halftone-overlay opacity-[0.12] z-10 pointer-events-none mix-blend-multiply" />
                    
                    {/* Background image */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-[5] pointer-events-none" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-[6] flex justify-between items-end">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 border border-[#00D1FF]/20 px-2 py-0.5 rounded-full">
                          {project.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-sans font-medium text-text-primary mt-2">
                          {project.title}
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                        <Plus className="w-4 h-4 text-text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 flex flex-col justify-between bg-[#0B0F17]/95 border border-white/10 shadow-2xl overflow-hidden"
                    style={{ transform: "rotateY(180deg)", transformStyle: "preserve-3d" }}
                  >
                    {/* Glowing Accents */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary-studio/20 rounded-full filter blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary-studio/20 rounded-full filter blur-3xl pointer-events-none" />

                    {/* Top Row */}
                    <div className="flex justify-between items-start z-10">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
                          Performance Metric
                        </span>
                        <h4 className="text-[10px] font-mono text-[#00D1FF] mt-0.5 uppercase">
                          {project.category}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-muted">{project.year}</span>
                    </div>

                    {/* Center Details */}
                    <div className="my-auto py-2 z-10">
                      <span className="text-2xl sm:text-3xl font-display font-medium text-text-primary block mb-3 text-gradient">
                        {project.metrics}
                      </span>
                      <p className="text-xs text-muted leading-relaxed font-light">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-mono bg-white/5 text-muted/80 border border-white/10 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="border-t border-white/5 pt-4 flex items-center justify-between z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(project);
                        }}
                        className="group/link text-xs font-mono text-[#00D1FF] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>VIEW DETAILS</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </button>
                      <span className="text-[8px] font-mono text-muted/40">CLICK TO FLIP</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for detailed project visual reference */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 select-none"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-surface max-w-4xl w-full rounded-3xl border border-stroke overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media half */}
              <div className="relative w-full md:w-3/5 h-64 md:h-[450px] overflow-hidden bg-bg">
                <div className="absolute inset-0 halftone-overlay opacity-15 pointer-events-none z-10" />
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text half */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D1FF]">
                      {activeProject.category}
                    </span>
                    <span className="text-xs font-mono text-muted">{activeProject.year}</span>
                  </div>

                  <h3 className="text-2xl font-sans font-medium text-text-primary leading-tight mb-3">
                    {activeProject.title}
                  </h3>

                  <div className="w-12 h-[2px] accent-gradient rounded-full mb-4" />

                  <p className="text-xs text-muted leading-relaxed font-light mb-5">
                    {activeProject.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-[10px] font-mono text-muted uppercase tracking-wider flex justify-between border-b border-stroke/50 pb-1.5">
                      <span>Performance / Gain</span>
                      <span className="text-text-primary font-bold">{activeProject.metrics}</span>
                    </div>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-wider flex justify-between border-b border-stroke/50 pb-1.5">
                      <span>Client Partner</span>
                      <span className="text-text-primary font-bold">SUHX Studio Premium</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {activeProject.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono bg-bg text-muted border border-stroke px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProject(null)}
                    className="w-full py-3 rounded-full bg-stroke text-text-primary text-xs font-mono hover:bg-stroke/85 transition-colors border border-white/5"
                  >
                    CLOSE LIGHTBOX
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

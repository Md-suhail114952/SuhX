import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { X, ArrowUpRight, Sparkles, Calendar, User } from "lucide-react";
import { LusionTextReveal, LusionMagnetic } from "./LusionEffects";

export default function PortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [spinningCardId, setSpinningCardId] = useState<string | null>(null);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Detect user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Track global cursor coordinates for the follow-cursor viewing circle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = ["All", "UI UX Design", "Branding", "Social Media Designs", "AI Generated Work"];

  const projects: Project[] = [
    {
      id: "olivaflix-brand-identity",
      title: "Olivaflix Brand Identity",
      category: "Branding",
      description: "A comprehensive brand identity framework and premium styling system developed for Olivaflix. Focusing on modern cinematic logo structures, synchronized typography, color palettes, and unified design guides.",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
      tags: ["Visual Identity", "Sleek Typography", "Style Manual"],
      metrics: "Corporate Blueprint",
      year: "2026",
      client: "Olivaflix Partners",
      link: "https://www.behance.net/gallery/250390307/Olivaflix-Brand-Identity",
      duration: "6 Weeks",
      industry: "Streaming & Entertainment",
      problem: "The client suffered from disjointed brand presence across global apps and marketing sites. A lack of unified typographic guidelines and visual contrast led to poor subscriber recall and brand dilution.",
      solution: "Designed a premium geometric logo system and scalable UI component guidelines, using high-fidelity spacing matrices. Applied a cinematic slate color palette with neon accents to lock user attention.",
      researchHighlight: "Conducted brand audit across 15 competitor platforms, identifying high-contrast dark modes as a key retention driver for digital media consumption.",
      wireframeInsight: "Mapped precise geometric grid proportions using Fibonacci sequence spacing for absolute structural alignment across all viewport sizes.",
      designSystemHighlight: "Assembled a comprehensive typography scale and fully-customized modular elements in Figma, ensuring frictionless dev handover.",
      prototypeFeedback: "Designed fluid slide-in navigation layers and micro-interaction effects, reducing user navigation steps by 25%.",
      finalOutcome: "Delivered a pristine brand blueprint, decreasing development timelines by 35% and increasing brand recognition metrics by +48%."
    },
    {
      id: "the-ayurveda-experience",
      title: "The Ayurveda Experience",
      category: "UI UX Design",
      description: "A detailed UI/UX case study focusing on e-commerce optimization, cart conversion funnels, and streamlined checkout flows to create an intuitive Ayurvedic wellness journey.",
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80",
      tags: ["Checkout UX", "Conversion Funnels", "Figma Design System"],
      metrics: "UX & Cart Audit",
      year: "2025",
      client: "The Ayurveda Experience",
      link: "https://www.behance.net/gallery/243517925/The-Ayurveda-Experience-Case-Study",
      duration: "8 Weeks",
      industry: "E-Commerce & Wellness",
      problem: "The e-commerce store struggled with high cart abandonment rates during checkout. Mobile users experienced visual friction with dense input layouts and unclear button priorities.",
      solution: "Re-engineered the complete cart funnels and checkout UI. Implemented sticky summarized footers, responsive step indicators, and high-contrast primary touchpoints.",
      researchHighlight: "Analyzed 2,000+ session recordings, pinpointing cart step complexity and hidden shipping costs as the leading causes for user drop-off.",
      wireframeInsight: "Constructed mobile-first checkout screens prioritizing single-tap entries, autofill states, and real-time validation feedback.",
      designSystemHighlight: "Crafted a warm, earthy high-fidelity UI kit featuring luxurious serif headings paired with clean, highly accessible inputs.",
      prototypeFeedback: "Iterated interactive haptic feedbacks and loading animations to reassure purchasers during payment processing.",
      finalOutcome: "Optimized mobile cart conversions, reducing checkout abandonment by 28% and boosting overall revenue by +32%."
    },
    {
      id: "cross-digital-landing",
      title: "Cross Digital Landing Page",
      category: "UI UX Design",
      description: "A conversion-focused professional landing page framework that details high-fidelity prototypes, user persona mappings, and responsive layouts designed to captivate web audiences.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
      tags: ["High-Fi Prototyping", "Landing Page UX", "User Psychology"],
      metrics: "Strategic Layouts",
      year: "2025",
      client: "Cross Digital",
      link: "https://www.behance.net/gallery/235346567/Cross-Digital-Landing-Page-UXUI-Design",
      duration: "4 Weeks",
      industry: "Corporate SaaS",
      problem: "The landing page failed to communicate the core SaaS value proposition clearly, resulting in high bounce rates and low lead form submissions.",
      solution: "Architected a single-view, benefit-driven layout, pairing elegant motion reveals with high-fidelity interactive feature cards.",
      researchHighlight: "Discovered that corporate buyers make bounce decisions in under 3 seconds, requiring immediate trust elements and bold CTAs.",
      wireframeInsight: "Organized negative space using asymmetrical layouts to guide reader focus naturally toward conversion zones.",
      designSystemHighlight: "Fitted a high-contrast style guide with sleek typography pairing, robust borders, and sharp luxury dark themes.",
      prototypeFeedback: "Created micro-interaction feedback loops on form inputs to increase user engagement and trust.",
      finalOutcome: "Significantly decreased bounce rate by 40% while generating a +112% surge in organic demo scheduling."
    },
    {
      id: "enhance-brand-content-a",
      title: "Enhance Brand Content / A-Content",
      category: "Branding",
      description: "Geometric brand strategy, digital asset style guides, and high-impact visual identity constructs aimed at increasing marketplace conversion rates for premium brands.",
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=1200&q=80",
      tags: ["Logo Guidelines", "Brand Guidelines", "Asset Generation"],
      metrics: "Premium Curation",
      year: "2025",
      client: "Enhance Brand Curation",
      link: "https://www.behance.net/gallery/200838189/Enhance-Brand-Contant-A-Contant",
      duration: "5 Weeks",
      industry: "Brand Strategy & E-Commerce",
      problem: "Sellers on large e-commerce platforms lacked high-quality visual messaging to command premium pricing, leading to price wars and thin profit margins.",
      solution: "Developed highly structural brand guidelines and geometric layout engines designed to express product craftsmanship.",
      researchHighlight: "Verified that listing content with unified branding and high-fidelity typography commands up to a 20% premium price margin.",
      wireframeInsight: "Designed modular graphics layouts that scale perfectly on desktop, tablet, and mobile marketplaces.",
      designSystemHighlight: "Crafted precise vector grids and guidelines, unifying color tones to match the core brand philosophy.",
      prototypeFeedback: "Conducted focus groups on A+ content layouts to evaluate reading times and information retention.",
      finalOutcome: "Empowered sellers to establish premium positioning, raising average order values by +24%."
    },
    {
      id: "amazon-listings-infographics",
      title: "Amazon Listings Infographics Designs",
      category: "Social Media Designs",
      description: "Highly persuasive product presentation slides, infographic layouts, and visual feature callouts designed to communicate value instantly and maximize purchase likelihood.",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
      tags: ["Infographics", "Sales Optimization", "Visual Curation"],
      metrics: "+112% Conversion Flow",
      year: "2024",
      client: "E-Commerce Partners",
      link: "https://www.behance.net/gallery/200832941/Amazon-Listings-Infographics",
      duration: "3 Weeks",
      industry: "Retail E-Commerce",
      problem: "Product detail pages had low conversion rates due to text-heavy descriptions that failed to outline key benefits quickly.",
      solution: "Replaced dense text blocks with highly persuasive custom infographic slides, structural callouts, and intuitive comparison tables.",
      researchHighlight: "Determined that 80% of online shoppers skim listing images before reading text, making infographics the absolute core touchpoint.",
      wireframeInsight: "Designed structured layout grids for each slide to ensure information density was perfectly balanced with breathing room.",
      designSystemHighlight: "Created a customized iconography set and color tokens to highlight unique product benefits clearly.",
      prototypeFeedback: "A/B tested different infographic order arrangements, establishing the most high-conversion layout sequences.",
      finalOutcome: "Boosted product page conversions by +35% and lowered customer return rates by 12% due to clearer product expectations."
    },
    {
      id: "amazon-listings-info-ai",
      title: "Amazon Listings Infographics (AI Curation)",
      category: "AI Generated Work",
      description: "Harnessing the power of state-of-the-art diffusion models, localized prompting, and image editing pipelines to engineer professional e-commerce product landscapes.",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1200&q=80",
      tags: ["Midjourney Curation", "Image Composites", "Ad Creative AI"],
      metrics: "Generative Artistry",
      year: "2024",
      client: "AI Creative Partners",
      link: "https://www.behance.net/gallery/200835443/Amazon-Listings-Infographics",
      duration: "4 Weeks",
      industry: "AI Generative Curation",
      problem: "Traditional commercial photoshoots were extremely expensive and took weeks to coordinate, delaying product launch times significantly.",
      solution: "Built an advanced AI asset generation pipeline linking custom Midjourney prompt frameworks with neural background composite layers.",
      researchHighlight: "Tested AI generation speed versus standard model shoots, finding a 90% reduction in turnaround times without loss in image fidelity.",
      wireframeInsight: "Framed product lighting and shadows meticulously to blend physical products seamlessly into synthesized environment backdrops.",
      designSystemHighlight: "Established structured prompt variables to maintain consistent style, light, and tone across different product listings.",
      prototypeFeedback: "Finetuned neural lighting models based on customer visual attention heatmaps.",
      finalOutcome: "Reduced product creative production timelines from 4 weeks to 2 days, cutting launch costs by 85% while boosting listing CTR by +18%."
    },
    {
      id: "enhance-brand-content-ai",
      title: "Enhanced Brand Content AI Work",
      category: "AI Generated Work",
      description: "Next-generation brand content composition driven by synthetic imagery, styled diffusion matrices, and high-fidelity layout integration pipelines.",
      image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80",
      tags: ["Stable Diffusion", "Procedural VFX", "Style Matching"],
      metrics: "Next-Gen AI Pipeline",
      year: "2024",
      client: "Suhail Creative Labs",
      link: "https://www.behance.net/gallery/200834001/Enhance-Brand-Content",
      duration: "5 Weeks",
      industry: "AI Generative Curation",
      problem: "Legacy marketing campaigns failed to match different cultural aesthetics in localized global regions, making scaling highly manual and expensive.",
      solution: "Deployed stylized diffusion matrices and procedural UI layers to automatically match regional layout guides and color palettes.",
      researchHighlight: "Prototyped a translation layer for visual assets that automatically aligns product backgrounds with regional trends.",
      wireframeInsight: "Segmented canvas grids dynamically using AI segmentors to cleanly replace background layers while protecting core product pixels.",
      designSystemHighlight: "Mapped custom token structures to align generative assets with exact brand hex keys and typographic standards.",
      prototypeFeedback: "Integrated user feedback loop mechanisms to constantly finetune stable diffusion weights.",
      finalOutcome: "Enabled instant localization of digital ad creative, scaling international conversion efficiency by +22%."
    }
  ];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // Duplicate filtered projects list multiple times to achieve a seamless horizontal drift marquee
  const displayProjects = filteredProjects.length > 0
    ? [...filteredProjects, ...filteredProjects, ...filteredProjects]
    : [];

  const handleCardClick = (cardId: string) => {
    const p = projects.find(proj => proj.id === cardId);
    if (p && p.link) {
      window.open(p.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, cardId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(cardId);
    }
  };

  const handleViewDetails = (e: React.MouseEvent, p: Project) => {
    e.stopPropagation();
    setActiveModalProject(p);
  };

  // Drift is paused when a card is hovered or currently spinning
  const isPaused = hoveredCardId !== null || spinningCardId !== null;

  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-dark/40 overflow-hidden">
      {/* Self-contained CSS for high-performance seamless marquee layout */}
      <style>{`
        @keyframes marqueeDrift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33333%);
          }
        }
        .animate-marquee {
          animation: marqueeDrift 55s linear infinite;
        }
      `}</style>

      {/* Floating custom View Follow-Cursor */}
      <AnimatePresence>
        {hoveredCardId && !shouldReduceMotion && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="fixed pointer-events-none z-50 w-16 h-16 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#00D1FF] text-white font-mono text-[9px] font-bold flex flex-col items-center justify-center tracking-widest shadow-[0_0_20px_rgba(0,209,255,0.4)]"
            style={{
              left: mousePos.x - 32,
              top: mousePos.y - 32,
            }}
          >
            <span>{flippedCardId === hoveredCardId ? "FLIP" : "VIEW"}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Head */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full inline-block">
          // Showcase Guild
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury mt-4">
          <LusionTextReveal text="Interactive Case Studies" />
        </h2>
        <p className="max-w-xl mx-auto text-sm text-text-sub mt-4">
          <LusionTextReveal text="A collection of next-generation digital products, immersive experiences, and visual guidelines. Click on any card to flip and view premium summaries." delay={0.15} />
        </p>

        {/* Categories Nav */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          {categories.map((cat) => (
            <LusionMagnetic key={cat} strength={0.3}>
              <button
                onClick={() => {
                  setSelectedCategory(cat);
                  setFlippedCardId(null);
                  setSpinningCardId(null);
                  setHoveredCardId(null);
                }}
                className={`px-4 py-2 text-xs font-mono rounded-lg transition-all duration-300 border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#6C63FF]/15 text-text-luxury border-[#6C63FF]/50 shadow-[0_0_15px_rgba(108,99,255,0.2)]"
                    : "bg-surface-dark border-border-dark/60 text-text-sub hover:text-text-luxury hover:border-text-sub/40"
                }`}
              >
                {cat}
              </button>
            </LusionMagnetic>
          ))}
        </div>
      </div>

      {/* Horizontal Drift case-study container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[520px] flex items-center justify-start perspective-[1200px] overflow-hidden"
      >
        <div 
          className={`flex gap-8 py-6 ${shouldReduceMotion ? "flex-wrap justify-center overflow-x-auto w-full" : "animate-marquee"}`}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            width: shouldReduceMotion ? "100%" : "max-content"
          }}
        >
          {displayProjects.map((p, idx) => {
            const isFlipped = flippedCardId === p.id;
            const isSpinning = spinningCardId === p.id;
            const isHovered = hoveredCardId === p.id;

            // When some card is hovered, non-focused ones scale down slightly and dim out
            const isFocused = hoveredCardId === null || hoveredCardId === p.id || flippedCardId === p.id;

            return (
              <motion.div
                key={`${p.id}-${idx}`}
                // Scroll entrance animation
                initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
                whileInView={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: (idx % filteredProjects.length) * 0.12, ease: "easeOut" }}
                animate={shouldReduceMotion ? {} : {
                  opacity: isFocused ? 1 : 0.45,
                  scale: isFocused ? 1 : 0.9,
                }}
                className="transition-all duration-500 ease-out shrink-0"
              >
                {/* Interactive 3D Card frame */}
                <motion.div
                  onClick={() => handleCardClick(p.id)}
                  onKeyDown={(e) => handleKeyDown(e, p.id)}
                  onMouseEnter={() => setHoveredCardId(p.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Case Study: ${p.title}. Click to reveal key metrics.`}
                  className="relative w-80 h-96 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: isSpinning || isFlipped ? 50 : 10,
                  }}
                  animate={shouldReduceMotion ? {} : {
                    rotateY: isFlipped ? 180 : 0,
                    scale: isSpinning ? [1, 1.15, 1] : isHovered ? 1.02 : 1,
                    z: isSpinning ? [0, 80, 0] : 0,
                    filter: isSpinning ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)",
                  }}
                  transition={shouldReduceMotion ? { duration: 0 } : {
                    rotateY: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
                    scale: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
                    z: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
                    filter: { duration: 1.1, times: [0, 0.5, 1], ease: "easeInOut" }
                  }}
                  onAnimationComplete={() => {
                    if (isSpinning) {
                      setSpinningCardId(null);
                    }
                  }}
                >
                  {/* FRONT FACE */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between bg-[#0a0e17]/85 border border-white/10 backface-hidden"
                    style={{ 
                      backfaceVisibility: "hidden", 
                      WebkitBackfaceVisibility: "hidden" 
                    }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] to-transparent opacity-80" />
                      
                      {p.metrics && (
                        <span className="absolute top-3 left-3 text-[9px] font-mono text-[#00D1FF] bg-black/80 border border-[#00D1FF]/30 px-2.5 py-0.5 rounded-full shadow-lg backdrop-blur-md">
                          ⚡ {p.metrics}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between text-left">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00D1FF]">
                            {p.category}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">
                            {p.year}
                          </span>
                        </div>
                        <h3 className="text-base font-display font-bold text-white leading-snug line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="text-[11px] text-gray-300 leading-relaxed mt-1.5 line-clamp-2">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-white/5">
                        {p.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono text-gray-400 bg-black/40 px-2 py-0.5 rounded border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a0e17] to-[#121824] border border-white/10"
                    style={{ 
                      backfaceVisibility: "hidden", 
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <AnimatePresence>
                      {isFlipped && (
                        <div className="flex flex-col justify-between h-full p-6 text-left">
                          <div>
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.45, duration: 0.35 }}
                              className="text-xs font-mono text-[#00D1FF] uppercase tracking-widest"
                            >
                              {p.category}
                            </motion.div>
                            
                            <motion.h4
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.55, duration: 0.35 }}
                              className="text-xl font-display font-bold text-white mt-1.5 leading-tight"
                            >
                              {p.title}
                            </motion.h4>

                            {p.metrics && (
                              <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.65, duration: 0.35 }}
                                className="mt-4 p-3 rounded-xl bg-[#00D1FF]/10 border border-[#00D1FF]/20 flex items-center gap-2"
                              >
                                <Sparkles className="w-5 h-5 text-[#00D1FF] shrink-0" />
                                <div>
                                  <p className="text-[9px] font-mono uppercase text-gray-400">Peak Performance</p>
                                  <p className="text-sm font-semibold text-white">{p.metrics}</p>
                                </div>
                              </motion.div>
                            )}

                            <motion.p
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.75, duration: 0.35 }}
                              className="text-xs text-gray-300 leading-relaxed mt-4 line-clamp-3"
                            >
                              {p.description}
                            </motion.p>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85, duration: 0.35 }}
                            className="flex flex-col gap-2 mt-4"
                          >
                            <button
                              onClick={(e) => handleViewDetails(e, p)}
                              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-center font-semibold text-white text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer shadow-inner shadow-white/15"
                            >
                              <span>View Full Case Study</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(p.id);
                              }}
                              className="w-full py-1 text-center font-mono text-[10px] text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                              Flip Back ↺
                            </button>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case-study Detail Modal Overlay */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="absolute inset-0 bg-[#070B14]/90 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-4xl max-h-[90vh] glass rounded-3xl overflow-y-auto relative z-10 flex flex-col md:flex-row shadow-[0_0_50px_rgba(108,99,255,0.15)]"
              id="portfolio-detail-modal"
            >
              {/* Image & Key Metadata Sidebar (Left) */}
              <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-border-dark/65 bg-surface-dark/45 flex flex-col justify-between overflow-hidden">
                <div className="relative aspect-[16/10] md:aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={activeModalProject.image}
                    referrerPolicy="no-referrer"
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-80" />
                  
                  {/* Close Button on Mobile view */}
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="md:hidden absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#070B14]/80 text-text-luxury border border-border-dark flex items-center justify-center cursor-pointer hover:bg-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Metadata list */}
                <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="border-b border-border-dark/60 pb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D1FF]">// Project Scope</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <p className="text-muted text-[10px] uppercase">Client</p>
                        <p className="text-text-luxury font-bold mt-0.5">{activeModalProject.client}</p>
                      </div>
                      <div>
                        <p className="text-muted text-[10px] uppercase">Year</p>
                        <p className="text-text-luxury font-bold mt-0.5">{activeModalProject.year}</p>
                      </div>
                      <div>
                        <p className="text-muted text-[10px] uppercase">Duration</p>
                        <p className="text-text-luxury font-bold mt-0.5">{activeModalProject.duration || "4 Weeks"}</p>
                      </div>
                      <div>
                        <p className="text-muted text-[10px] uppercase">Industry</p>
                        <p className="text-text-luxury font-bold mt-0.5 line-clamp-1">{activeModalProject.industry || "Digital Technology"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Core KPI highlight panel */}
                  {activeModalProject.metrics && (
                    <div className="p-4 rounded-xl bg-[#00D1FF]/5 border border-[#00D1FF]/15 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
                        <span className="text-[9px] font-mono uppercase tracking-wider text-muted font-bold">Peak Performance</span>
                      </div>
                      <p className="text-sm font-display font-black text-[#00D1FF]">{activeModalProject.metrics}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Storytelling Content Area (Right) */}
              <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto flex flex-col justify-between max-h-[75vh] md:max-h-[90vh]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1 rounded-md">
                      {activeModalProject.category}
                    </span>
                    
                    {/* PC View Close button */}
                    <button
                      onClick={() => setActiveModalProject(null)}
                      className="hidden md:flex w-8 h-8 rounded-full bg-surface-dark border border-border-dark text-text-sub hover:text-text-luxury hover:border-[#00D1FF]/40 flex items-center justify-center cursor-pointer transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-black text-text-luxury tracking-tight mb-8">
                    {activeModalProject.title}
                  </h3>

                  {/* 1. PROBLEM SECTION */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-mono tracking-widest text-rose-400 uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                      01 // Business Challenge
                    </h4>
                    <p className="text-sm text-text-sub leading-relaxed font-light pl-3.5 border-l border-rose-400/25">
                      {activeModalProject.problem || activeModalProject.description}
                    </p>
                  </div>

                  {/* 2. SOLUTION SECTION */}
                  <div className="space-y-2 mb-8">
                    <h4 className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      02 // Creative Blueprint & Solution
                    </h4>
                    <p className="text-sm text-text-sub leading-relaxed font-light pl-3.5 border-l border-emerald-400/25">
                      {activeModalProject.solution || "Re-engineered visual architecture with robust design patterns to maximize usability and aesthetic alignment."}
                    </p>
                  </div>

                  {/* 3. MULTI-PHASE PROCESS SECTION */}
                  <div className="space-y-6 mb-8 pt-4 border-t border-border-dark/60">
                    <h4 className="text-xs font-mono tracking-widest text-[#00D1FF] uppercase">
                      03 // Tactical Process & Design System
                    </h4>

                    {/* Timeline steps */}
                    <div className="space-y-4 pl-1">
                      {/* Research */}
                      {activeModalProject.researchHighlight && (
                        <div className="relative pl-6 border-l border-stroke/40">
                          <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-stroke border border-bg" />
                          <p className="text-[10px] font-mono uppercase tracking-wider text-white/50">Phase A // User Research</p>
                          <p className="text-xs text-text-sub mt-1 leading-relaxed">{activeModalProject.researchHighlight}</p>
                        </div>
                      )}

                      {/* Wireframes */}
                      {activeModalProject.wireframeInsight && (
                        <div className="relative pl-6 border-l border-stroke/40">
                          <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-stroke border border-bg" />
                          <p className="text-[10px] font-mono uppercase tracking-wider text-white/50">Phase B // Wireframe Topology</p>
                          <p className="text-xs text-text-sub mt-1 leading-relaxed">{activeModalProject.wireframeInsight}</p>
                        </div>
                      )}

                      {/* Design System */}
                      {activeModalProject.designSystemHighlight && (
                        <div className="relative pl-6 border-l border-stroke/40">
                          <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#6C63FF] border border-bg" />
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#6C63FF]">Phase C // System Governance</p>
                          <p className="text-xs text-text-sub mt-1 leading-relaxed">{activeModalProject.designSystemHighlight}</p>
                        </div>
                      )}

                      {/* Prototype */}
                      {activeModalProject.prototypeFeedback && (
                        <div className="relative pl-6 border-l border-stroke/40">
                          <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#00D1FF] border border-bg" />
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#00D1FF]">Phase D // High-Fi Prototyping</p>
                          <p className="text-xs text-text-sub mt-1 leading-relaxed">{activeModalProject.prototypeFeedback}</p>
                        </div>
                      )}

                      {/* Final Outcome */}
                      {activeModalProject.finalOutcome && (
                        <div className="relative pl-6 border-l-2 border-[#00D1FF]">
                          <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#00D1FF]" />
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#00D1FF] font-bold">Phase E // Final Output & Outcome</p>
                          <p className="text-xs text-text-sub mt-1 leading-relaxed font-medium text-white">{activeModalProject.finalOutcome}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer and Live CTA */}
                <div className="mt-6 pt-6 border-t border-border-dark/60">
                  <a
                    href={activeModalProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-center font-bold text-text-luxury flex items-center justify-center gap-2.5 hover:opacity-95 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#6C63FF]/20 cursor-pointer"
                  >
                    <span className="font-mono text-xs uppercase tracking-wider">Launch Live Case Study</span>
                    <ArrowUpRight className="w-4.5 h-4.5 stroke-[2]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { X, ArrowUpRight, Scale, Info, Sparkles, Calendar, User } from "lucide-react";
import { LusionTextReveal, LusionMagnetic } from "./LusionEffects";

export default function PortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
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
    },
    {
      id: "cross-digital-landing",
      title: "Cross Digital Landing Page UX/UI Design",
      category: "UI UX Design",
      description: "A conversion-focused professional landing page framework that details high-fidelity prototypes, user persona mappings, and responsive layouts designed to captivate web audiences.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
      tags: ["High-Fi Prototyping", "Landing Page UX", "User Psychology"],
      metrics: "Strategic Layouts",
      year: "2025",
      client: "Cross Digital",
      link: "https://www.behance.net/gallery/235346567/Cross-Digital-Landing-Page-UXUI-Design",
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
    },
  ];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-dark/40">
      {/* Section Head */}
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full inline-block">
          // Showcase Guild
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury mt-4">
          <LusionTextReveal text="Atmospheric Case Studies" />
        </h2>
        <p className="max-w-xl mx-auto text-sm text-text-sub mt-4">
          <LusionTextReveal text="A collection of next-generation physical interfaces, digital platforms, and generative designs made with pixel-perfect intent." delay={0.2} />
        </p>

        {/* Categories Nav */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
          {categories.map((cat) => (
            <LusionMagnetic key={cat} strength={0.3}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono rounded-lg transition-all duration-300 border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary-studio/15 text-text-luxury border-primary-studio/50 shadow-[0_0_15px_rgba(108,99,255,0.2)]"
                    : "bg-surface-dark border-border-dark/60 text-text-sub hover:text-text-luxury hover:border-text-sub/40"
                }`}
              >
                {cat}
              </button>
            </LusionMagnetic>
          ))}
        </div>
      </div>

      {/* Projects Grid Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, idx) => (
            <motion.div
              layout
              key={p.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, y: 60, scale: 0.96, filter: "blur(8px)" }}
              whileInView={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.15 }}
              whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
              className="group rounded-2xl overflow-hidden glass hover:border-secondary-studio/30 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              id={`portfolio-item-${p.id}`}
            >
              <div 
                className="relative overflow-hidden aspect-video cursor-pointer"
                onClick={() => setActiveModalProject(p)}
              >
                {/* Metric Overlay Badge */}
                {p.metrics && (
                  <span className="absolute top-4 left-4 z-10 text-[10px] font-mono text-text-luxury bg-[#070B14]/85 border border-[#00D1FF]/40 px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
                    ⚡ {p.metrics}
                  </span>
                )}
                
                {/* Zooming background image with layered entrance */}
                <motion.img
                  initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.1 }}
                  whileInView={shouldReduceMotion ? { scale: 1 } : { scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: idx * 0.15 + 0.1 }}
                  src={p.image}
                  referrerPolicy="no-referrer"
                  alt={p.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Hover overlay screen */}
                <div className="absolute inset-0 bg-[#070B14]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#00D1FF] border-[#00D1FF]/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Showcase metadata card */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#00D1FF]">
                    {p.category}
                  </span>
                  <span className="text-[10px] font-mono text-text-sub">
                    {p.year}
                  </span>
                </div>
                
                <h3 
                  onClick={() => setActiveModalProject(p)}
                  className="text-lg font-display font-bold text-text-luxury hover:text-[#00D1FF] cursor-pointer transition-colors duration-200"
                >
                  {p.title}
                </h3>
                
                <p className="text-xs text-text-sub leading-relaxed mt-2 line-clamp-2">
                  {p.description}
                </p>

                {/* Project tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border-dark/60">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-text-sub/80 bg-[#070B14] px-2 py-0.5 rounded border border-border-dark/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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
              {/* Image Column */}
              <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto min-h-[300px] bg-slate-900 overflow-hidden">
                <img
                  src={activeModalProject.image}
                  referrerPolicy="no-referrer"
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#070B14] to-transparent pointer-events-none opacity-40 md:opacity-20" />
                
                {/* Close Button on Mobile view */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="md:hidden absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#070B14]/80 text-text-luxury border border-border-dark flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Informational Column */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-2.5 py-1 rounded-md">
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

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-text-luxury tracking-tight mt-4">
                    {activeModalProject.title}
                  </h3>

                  {/* Core KPI highlight panel */}
                  {activeModalProject.metrics && (
                    <div className="mt-4 p-3.5 rounded-xl bg-secondary-studio/5 border border-secondary-studio/25 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[#00D1FF] shrink-0" />
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-text-sub">Performance Peak</p>
                        <p className="text-sm font-semibold text-[#00D1FF]">{activeModalProject.metrics}</p>
                      </div>
                    </div>
                  )}

                  <h4 className="text-xs font-mono tracking-wider text-[#6C63FF] uppercase mt-6 mb-2">
                    Creative Brief & Intent
                  </h4>
                  <p className="text-sm text-text-sub leading-relaxed">
                    {activeModalProject.description}
                  </p>

                  <p className="text-sm text-text-sub leading-relaxed mt-4">
                    This project highlights a key structural design phase, starting from deep wireframing blueprints to custom typographic selection. Fused with state-of-the-art vector mapping guidelines, the aesthetic ensures an exceptional brand footprint.
                  </p>
                </div>

                {/* Technical Meta Card Footer */}
                <div className="mt-8 pt-6 border-t border-border-dark/60">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-text-sub mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#6C63FF]" />
                      <span><strong>Date:</strong> {activeModalProject.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#6C63FF]" />
                      <span><strong>Client:</strong> {activeModalProject.client}</span>
                    </div>
                  </div>

                  <a
                    href={activeModalProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-studio to-secondary-studio text-center font-semibold text-text-luxury flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all glow-btn cursor-pointer"
                  >
                    <span>View Live Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
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

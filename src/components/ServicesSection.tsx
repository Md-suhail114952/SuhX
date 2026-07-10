import { useState, useEffect } from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Service } from "../types";

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const services: Service[] = [
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Engineered user interfaces designed using high-fidelity Figma systems, meticulous hierarchy, user intuition, and micro-interactions that feeling organic.",
      icon: "Figma",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(108,99,255,0.15)] group-hover:border-[rgba(108,99,255,0.4)]",
      tags: ["Figma Systems", "Low/High-Fi", "User Journeys", "Interactions"],
    },
    {
      id: "web-design",
      title: "Website Design",
      description: "Framer-level cinematic landing pages and ultraresponsive modular grids with heavy emphasis on layout balance, elegant typography, and brand synergy.",
      icon: "Globe",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(0,209,255,0.15)] group-hover:border-[rgba(0,209,255,0.4)]",
      tags: ["Desktop First", "Webflow/Framer", "Aesthetic Grids"],
    },
    {
      id: "mobile-apps",
      title: "Mobile App Design",
      description: "Immersive iOS and Android UI designs leveraging native components, fluid swipe architectures, modern widgets, and premium dark/light adaptive frameworks.",
      icon: "Smartphone",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(168,85,247,0.15)] group-hover:border-[rgba(168,85,247,0.4)]",
      tags: ["iOS Human Guide", "Material Design", "Haptic Maps"],
    },
    {
      id: "branding",
      title: "Branding Identity",
      description: "Comprehensive logo engineering, geometric marks, cohesive style guides, typography manuals, and color philosophies designed for technology giants and modern SaaS platforms.",
      icon: "Fingerprint",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(108,99,255,0.15)] group-hover:border-[rgba(108,99,255,0.4)]",
      tags: ["Logos", "Style Guides", "Typography Rules", "SaaS Positioning"],
    },
    {
      id: "social-media",
      title: "Social Media Design",
      description: "Visual strategies and curated creative assets optimized for rapid conversion, including cohesive grid layouts, carousel templates, and high-impact custom illustrations.",
      icon: "Instagram",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(0,209,255,0.15)] group-hover:border-[rgba(0,209,255,0.4)]",
      tags: ["Instagram Grids", "Carousels", "Creative Directing"],
    },
    {
      id: "motion-graphics",
      title: "Motion Graphics",
      description: "Dynamic video animations, futuristic logo intros, website micro-animations, product walkthroughs, and kinetic typography that command absolute attention.",
      icon: "Tv",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(168,85,247,0.15)] group-hover:border-[rgba(168,85,247,0.4)]",
      tags: ["Lottie Files", "After Effects", "Logo Intros", "Cinematics"],
    },
    {
      id: "ai-systems",
      title: "AI Creative Systems",
      description: "Design-integrated AI deployment linking Midjourney pipeline triggers, Leonardo prompt matrices, and Gemini models to construct limitless high-fidelity creative generation cycles.",
      icon: "Cpu",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(0,209,255,0.2)] group-hover:border-[rgba(0,209,255,0.5)]",
      tags: ["Midjourney Matrix", "Leonardo AI", "Prompt Models", "Workflows"],
    },
    {
      id: "presentation",
      title: "Presentation Design",
      description: "High-end corporate keynotes, investor pitch decks, and digital portfolios designed to state complex ideas clearly and close major funding cycles.",
      icon: "Presentation",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(108,99,255,0.15)] group-hover:border-[rgba(108,99,255,0.4)]",
      tags: ["Pitch Decks", "Keynote", "Data Visualizing", "Layout Mastery"],
    },
    {
      id: "ai-cognitive",
      title: "AI Cognitive Orchestration",
      description: "Engineering intelligent multi-agent workspaces and cognitive software backends utilizing autonomous workflow loops, memory vector-embedding, and custom orchestration logic.",
      icon: "BrainCircuit",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(255,0,214,0.2)] group-hover:border-[rgba(255,0,214,0.5)]",
      tags: ["Agentic Loops", "Vector Memory", "Orchestrator APIs", "Automation"],
    },
    {
      id: "generative-ui",
      title: "Generative UI Synthesis",
      description: "Architecting interactive, ultra-dynamic fluid user interfaces that seamlessly compile and adapt on the fly, powered by real-time generative models and custom styling tokens.",
      icon: "Sparkles",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(0,209,255,0.2)] group-hover:border-[rgba(0,209,255,0.5)]",
      tags: ["Dynamic Compiles", "Adaptive Interfaces", "Token Systems", "Real-Time"],
    },
    {
      id: "cinematic-assets",
      title: "Cinematic Asset Curation",
      description: "Harnessing elite spatial diffusion networks and neural video generators to composite gorgeous high-definition art directions, immersive motion loops, and brand assets.",
      icon: "Flame",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(255,94,0,0.2)] group-hover:border-[rgba(255,94,0,0.5)]",
      tags: ["Diffusion Models", "Neural Video", "Creative Assets", "Immersive"],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = services.length - visibleCards;
        if (prevIndex >= maxIndex) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [visibleCards, isPaused, services.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - visibleCards : prev - 1));
  };

  const handleNext = () => {
    const maxIndex = services.length - visibleCards;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  let translateX = "0px";
  if (visibleCards === 1) {
    translateX = `calc(-${currentIndex * 100}% - ${currentIndex * 24}px)`;
  } else if (visibleCards === 2) {
    translateX = `calc(-${currentIndex * 50}% - ${currentIndex * 12}px)`;
  } else {
    translateX = `calc(-${currentIndex * 33.333}% - ${currentIndex * 8}px)`;
  }

  const cardWidthClass = 
    visibleCards === 1 
      ? "w-full shrink-0" 
      : visibleCards === 2 
        ? "w-[calc(50%-12px)] shrink-0" 
        : "w-[calc(33.333%-16px)] shrink-0";

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 relative z-10">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1.5 rounded-full">
            // Studio Capability
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury mt-4">
            Forging Digital <span className="text-gradient font-bold">Intelligences</span>
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="max-w-md text-sm text-text-sub leading-relaxed">
            Merging structural classic layout discipline with elite AI generative pipelines to produce digital experience masterpieces.
          </p>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-border-dark bg-surface-dark/40 hover:bg-[#6C63FF]/15 hover:border-[#6C63FF]/40 flex items-center justify-center text-text-luxury transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <Icons.ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-border-dark bg-surface-dark/40 hover:bg-[#6C63FF]/15 hover:border-[#6C63FF]/40 flex items-center justify-center text-text-luxury transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <Icons.ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Services Slider Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden px-4 py-8 -mx-4 -my-8">
          <motion.div
            animate={{ x: translateX }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="flex gap-6"
          >
            {services.map((service) => {
              // Dynamic Lucide selection with fallbacks
              let IconComp = (Icons as any)[service.icon] || Icons.Layout;
              if (service.icon === "Figma") {
                IconComp = (Icons as any)["Figma"] || Icons.PenTool;
              }

              return (
                <div
                  key={service.id}
                  className={`flex flex-col justify-between p-8 rounded-2xl bg-surface/40 border border-border-dark/65 transition-all duration-500 group cursor-default relative overflow-hidden h-[360px] hover:-translate-y-3 hover:border-[#00D1FF]/40 ${cardWidthClass} ${service.glowColor}`}
                  id={`service-card-${service.id}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-radial-[circle_at_top_right,rgba(108,99,255,0.02),transparent_60%] group-hover:bg-radial-[circle_at_top_right,rgba(0,209,255,0.08),transparent_60%] transition-colors duration-500" />

                  <div>
                    {/* Glowing Icon Frame */}
                    <div className="w-12 h-12 rounded-xl bg-surface-dark/90 border border-border-dark flex items-center justify-center mb-6 text-text-luxury group-hover:text-[#00D1FF] group-hover:border-[#00D1FF]/40 group-hover:bg-[#00D1FF]/10 transition-all duration-300">
                      <IconComp className="w-5 h-5 stroke-[1.5]" />
                    </div>

                    <h3 className="text-xl font-display font-bold text-text-luxury mb-3 group-hover:text-gradient transition-all duration-300">
                      {service.title}
                    </h3>

                    <p className="text-sm text-text-sub leading-relaxed mb-6 group-hover:text-text-luxury transition-colors duration-300 line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Tags Container */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-dark/60">
                    {service.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-text-sub/70 bg-surface-dark px-2.5 py-1 rounded-md border border-border-dark/30 group-hover:border-[#00D1FF]/25 group-hover:text-[#00D1FF] transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: services.length - visibleCards + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx ? "w-8 bg-[#6C63FF]" : "w-2 bg-border-dark/60 hover:bg-border-dark"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

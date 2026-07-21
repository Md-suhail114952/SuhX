import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { LusionMagnetic, LusionTextReveal } from "./LusionEffects";
import mdSuhailPortrait from "../assets/images/md_suhail_portrait_real.png";
import AgenticBackground from "./AgenticBackground";
import FloatingSoftwareIcons from "./FloatingSoftwareIcons";

interface HeroProps {
  onRequestChatOpen: () => void;
  onRequestBookCall: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Hero({ onRequestChatOpen, onRequestBookCall }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  
  // Typewriter effect state for the subtext
  const fullDesc = "Fusing premium creative direction with intelligent AI systems to build striking digital products.";
  const [typedDesc, setTypedDesc] = useState("");
  const [descIndex, setDescIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);

  const roles = ["UI/UX Specialist", "AI Generalist", "Brand Architect", "Digital Innovator"];

  // 1. Scroll listener for floating Navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Cycle roles every 2 seconds
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(roleTimer);
  }, []);

  // 3. Typewriter description effect with infinite loop
  useEffect(() => {
    if (!isDeleting) {
      // Typing Phase
      const startDelay = setTimeout(() => {
        if (descIndex < fullDesc.length) {
          const typingDelay = Math.random() * 8 + 6;
          const timer = setTimeout(() => {
            setTypedDesc((prev) => prev + fullDesc.charAt(descIndex));
            setDescIndex((prev) => prev + 1);
          }, typingDelay);
          return () => clearTimeout(timer);
        } else {
          // Stay completed for 5 seconds before starting to delete
          const pauseTimer = setTimeout(() => {
            setIsDeleting(true);
          }, 5000);
          return () => clearTimeout(pauseTimer);
        }
      }, descIndex === 0 ? 800 : 0);
      return () => clearTimeout(startDelay);
    } else {
      // Deleting Phase (Fast Eraser)
      if (descIndex > 0) {
        const erasingDelay = 10;
        const timer = setTimeout(() => {
          setTypedDesc((prev) => prev.slice(0, -1));
          setDescIndex((prev) => prev - 1);
        }, erasingDelay);
        return () => clearTimeout(timer);
      } else {
        // Stay empty for 1 second before starting to type again
        const pauseTimer = setTimeout(() => {
          setIsDeleting(false);
        }, 1000);
        return () => clearTimeout(pauseTimer);
      }
    }
  }, [descIndex, isDeleting, fullDesc]);

  // 4. GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Name Reveal animation (y: 50 -> 0, opacity 0 -> 1)
      tl.fromTo(
        ".name-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.1 }
      );

      // Blur in elements (y: 20 -> 0, blur 10px -> 0px, opacity 0 -> 1)
      tl.fromTo(
        ".blur-in",
        { y: 20, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, stagger: 0.1 },
        "-=0.9"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="hero" ref={heroRef} className="relative w-full h-screen overflow-hidden bg-bg flex items-center justify-center select-none">
      
      {/* Cinematic Agentic Background */}
      <AgenticBackground />

      {/* Portrait background image on the right */}
      <motion.img
        src={mdSuhailPortrait}
        alt="MD Suhail Portrait Background"
        className="hero-portrait h-full max-h-[85vh] md:max-h-full object-contain pointer-events-none select-none"
        initial={{ opacity: 0, x: 50, filter: "grayscale(100%)" }}
        animate={{ opacity: 0.08, x: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        referrerPolicy="no-referrer"
      />

      {/* Floating Design & Creative Softwares Icons */}
      <FloatingSoftwareIcons />

      {/* Hero Central Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center flex flex-col items-center px-6 max-w-4xl mt-6 md:mt-10"
      >
        
        {/* Eyebrow with Animated Gradient Border */}
        <motion.div
          variants={itemVariants}
          className="animated-gradient-border-wrapper mb-4"
        >
          <div className="animated-gradient-border-inner px-4 py-1.5 text-[10px] md:text-xs text-muted uppercase tracking-[0.3em] font-mono font-semibold">
            COLLECTION '26 // STUDIO PORTFOLIO
          </div>
        </motion.div>

        {/* Clean, Elegant Display Name in Velora-style (Outfit font, semibold weight, tracking-tight, with blue gradient dot) */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-velora font-semibold tracking-tight text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]"
        >
          Md Suhail<span className="bg-gradient-to-r from-[#00D1FF] to-[#6C63FF] bg-clip-text text-transparent inline-block">.</span>
        </motion.h1>

        {/* Rotating Role Line */}
        <motion.div
          variants={itemVariants}
          className="text-sm md:text-base text-muted/80 font-mono tracking-widest uppercase mb-6 flex items-center justify-center gap-1.5 h-6"
        >
          <span>Creative Director &</span>
          <span className="relative inline-block w-40 md:w-48 text-left">
            <span
              key={roleIndex}
              className="text-[#00D1FF] animate-role-fade-in inline-block font-semibold"
            >
              {roles[roleIndex]}
            </span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-muted/95 max-w-lg mb-6 leading-relaxed font-light min-h-[50px] px-4"
        >
          {typedDesc}
          <span className="inline-block w-[2px] h-[14px] md:h-[16px] ml-1 bg-[#00D1FF] animate-pulse align-middle" />
        </motion.p>

        {/* Minimalist Premium Metadata / Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] md:text-xs font-mono text-muted/50 uppercase tracking-[0.2em] mb-8 font-medium"
        >
          <span>6+ Years Exp</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]/50" />
          <span>50+ Projects</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]/50" />
          <span>India Based</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-1 md:mt-2 z-20"
        >
          {/* Primary: Start Your Project */}
          <LusionMagnetic strength={0.2}>
            <button
              onClick={() => scrollToSection("contact")}
              className="pill-glow-button"
            >
              <span className="relative z-10 font-mono tracking-wider uppercase text-xs font-semibold">Start Your Project</span>
            </button>
          </LusionMagnetic>

          {/* Special Booking: Book a Call */}
          <LusionMagnetic strength={0.2}>
            <button
              onClick={onRequestBookCall}
              className="py-3.5 px-6 rounded-full bg-gradient-to-r from-[#6C63FF]/20 to-[#00D1FF]/20 border border-[#6C63FF]/55 hover:border-[#00D1FF] text-white hover:shadow-[0_0_20px_rgba(0,209,255,0.2)] transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="font-mono tracking-wider uppercase text-xs font-semibold flex items-center gap-1.5">
                Book a Call <span className="inline-block w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
              </span>
            </button>
          </LusionMagnetic>

          {/* Secondary: View Case Studies */}
          <LusionMagnetic strength={0.2}>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="py-3.5 px-6 rounded-full bg-surface-dark/40 border border-border-dark/60 hover:border-text-sub/50 text-text-sub hover:text-white transition-all cursor-pointer"
            >
              <span className="font-mono tracking-wider uppercase text-xs font-semibold">
                View Case Studies
              </span>
            </button>
          </LusionMagnetic>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
        <span className="text-[10px] text-muted tracking-[0.25em] font-mono">SCROLL</span>
        <div className="w-px h-10 bg-stroke/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-text-primary/70 animate-scroll-down" />
        </div>
      </div>
    </div>
  );
}

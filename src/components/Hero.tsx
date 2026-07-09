import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { LusionMagnetic, LusionTextReveal } from "./LusionEffects";
import suhxLogo from "../assets/images/suhx_logo_1779791742292.png";
import { useTransparentLogo } from "../hooks/useTransparentLogo";
import AgenticBackground from "./AgenticBackground";

interface HeroProps {
  onRequestChatOpen: () => void;
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

export default function Hero({ onRequestChatOpen }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);

  const { src: logoSrc, isReady: logoReady } = useTransparentLogo(suhxLogo);

  const roles = ["Creative Director", "UI/UX Designer", "AI Generalist", "Brand Architect"];

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

      {/* Hero Central Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center flex flex-col items-center px-6 max-w-4xl mt-6 md:mt-10"
      >
        
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="inline-block text-xs text-muted uppercase tracking-[0.3em] mb-4 font-mono border border-stroke/40 px-3 py-1 rounded-full bg-surface/20 backdrop-blur-sm"
        >
          COLLECTION '26 // STUDIO PORTFOLIO
        </motion.div>

        {/* Large Name/Logo Display */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center select-none mb-2"
        >
          <motion.img 
            src={logoSrc} 
            alt="SUHX Logo" 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={logoReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-20 sm:h-28 md:h-36 w-auto object-contain select-none drop-shadow-[0_0_35px_rgba(108,99,255,0.25)]"
            referrerPolicy="no-referrer"
          />
          <span className="text-xs md:text-sm font-mono uppercase tracking-[1.25em] pl-[1.25em] text-white -mt-3 sm:-mt-5 md:-mt-6 font-bold opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.45)]">
            STUDIO
          </span>
        </motion.div>

        {/* Rotating Role Line */}
        <motion.div
          variants={itemVariants}
          className="text-lg md:text-2xl text-muted font-light mb-3 md:mb-4 h-8 flex items-center justify-center"
        >
          <span className="mr-2">A</span>
          <span className="relative inline-block w-48 md:w-64 text-left">
            <span
              key={roleIndex}
              className="font-display italic text-text-primary animate-role-fade-in inline-block"
            >
              {roles[roleIndex]}
            </span>
          </span>
          <span>lives in India.</span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-muted max-w-md mb-6 md:mb-8 leading-relaxed font-light"
        >
          Designing intelligent, visually striking digital experiences by fusing world-class high-end creative direction with cutting-edge AI curation pipelines.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-1 md:mt-2 z-20"
        >
          
          {/* See Works */}
          <LusionMagnetic strength={0.2}>
            <button
              onClick={() => scrollToSection("work")}
              className="group relative inline-flex items-center justify-center rounded-full text-sm font-medium px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-white hover:text-white shadow-[0_0_20px_rgba(108,99,255,0.25)] hover:shadow-[0_0_30px_rgba(0,209,255,0.45)] overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer z-10 border-none"
            >
              {/* Overlay glow on hover */}
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span className="relative z-10 font-mono tracking-tight uppercase text-xs font-bold">Explore Creative Works</span>
            </button>
          </LusionMagnetic>

          {/* Reach Out / Chat Assistant */}
          <LusionMagnetic strength={0.2}>
            <button
              onClick={onRequestChatOpen}
              className="group relative inline-flex items-center justify-center rounded-full text-sm font-medium px-8 py-4 border border-stroke bg-bg/40 text-text-primary overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer hover:border-transparent z-10"
            >
              {/* Border glow wrapper */}
              <span className="absolute inset-0 rounded-full bg-transparent group-hover:accent-gradient -z-20 p-[1.5px]" />
              <span className="absolute inset-[1px] rounded-full bg-bg -z-10 group-hover:bg-surface/95 transition-all duration-300" />
              <span className="relative z-10 flex items-center gap-2 font-mono tracking-tight uppercase text-xs">
                Interact with AI Twin
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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import suhxLogo from "../assets/images/suhx_logo_1779791742292.png";
import { useTransparentLogo } from "../hooks/useTransparentLogo";
import { LusionMagnetic } from "./LusionEffects";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestChatOpen: () => void;
}

export default function Header({ activeTab, setActiveTab, onRequestChatOpen }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { src: logoSrc, isReady: logoReady } = useTransparentLogo(suhxLogo);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Process", id: "process" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#070B14]/85 border-b border-border-dark/65 backdrop-blur-md py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Frame */}
          <LusionMagnetic strength={0.25}>
            <div 
              onClick={() => handleNavClick("home")}
              className="flex items-center cursor-pointer group"
            >
              <motion.img 
                src={logoSrc} 
                alt="SUHX Logo" 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={logoReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-7 md:h-9 w-auto object-contain select-none group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </LusionMagnetic>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-surface-dark/70 border border-border-dark/40 backdrop-blur-md">
            {navItems.map((item) => (
              <LusionMagnetic key={item.id} strength={0.35}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-[#6C63FF]/15 to-[#00D1FF]/15 border-border-dark text-text-luxury border"
                      : "text-text-sub hover:text-text-luxury hover:bg-surface-dark/10"
                  }`}
                >
                  {item.label}
                </button>
              </LusionMagnetic>
            ))}
          </nav>

          {/* Actions CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Assistant launch badge */}
            <LusionMagnetic strength={0.2}>
              <button
                 onClick={onRequestChatOpen}
                 className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-[#0a0e17] border border-[#6C63FF]/30 text-xs font-mono text-[#6C63FF] hover:text-[#00D1FF] hover:border-[#00D1FF]/40 hover:bg-[#00D1FF]/5 hover:shadow-[0_0_15px_rgba(0,209,255,0.15)] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse fill-current" />
                <span>Ask SUHX-AI</span>
              </button>
            </LusionMagnetic>

            <LusionMagnetic strength={0.2}>
              <button
                onClick={() => {
                  const elem = document.getElementById("contact");
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }}
                className="pill-glow-button py-2 px-5 text-xs font-bold"
              >
                <span>Build Studio Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </LusionMagnetic>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onRequestChatOpen}
              className="p-2 rounded-xl bg-[#070B14] border border-[#6C63FF]/30 text-[#6C63FF] flex items-center justify-center cursor-pointer"
              aria-label="Ask AI Assistant"
            >
              <Sparkles className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-surface-dark border border-border-dark text-text-sub hover:text-text-luxury flex items-center justify-center cursor-pointer"
              aria-label="Open Navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[68px] z-30 md:hidden bg-[#070B14]/95 border-b border-border-dark backdrop-blur-xl p-6"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3 text-left font-display font-medium text-base transition-colors border-b border-border-dark/30 ${
                    activeTab === item.id ? "text-[#00D1FF]" : "text-text-sub"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onRequestChatOpen();
                  }}
                  className="py-3 px-4 rounded-xl border border-primary-studio/30 text-xs font-mono text-[#6C63FF] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Ask AI Twin</span>
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    const elem = document.getElementById("contact");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-primary-studio to-secondary-studio text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-md"
                >
                  <span>Build Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

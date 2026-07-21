import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Sparkles, User, LogOut, Shield } from "lucide-react";
import suhxLogo from "../assets/images/suhx_logo_1779791742292.png";
import { useTransparentLogo } from "../hooks/useTransparentLogo";
import { LusionMagnetic } from "./LusionEffects";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestChatOpen: () => void;
  onRequestBookCall: () => void;
  onRequestAuthOpen: () => void;
  onRequestAdminOpen: () => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onRequestChatOpen, 
  onRequestBookCall,
  onRequestAuthOpen,
  onRequestAdminOpen
}: HeaderProps) {
  const { user, logOut } = useAuth();
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
            {/* User Auth Portal */}
            <LusionMagnetic strength={0.2}>
              {user ? (
                <div className="flex items-center gap-2 h-9 pl-3 pr-2 rounded-xl bg-surface-dark/90 border border-[#00D1FF]/25 text-xs font-mono shadow-[0_0_15px_rgba(0,209,255,0.04)] select-none">
                  <div className="w-5.5 h-5.5 rounded-lg bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] flex items-center justify-center text-[10px] font-bold text-white shadow-md shadow-[#6C63FF]/20 uppercase select-none">
                    {user.displayName ? user.displayName.slice(0, 1) : (user.email ? user.email.slice(0, 1) : "U")}
                  </div>
                  <span className="text-text-luxury font-medium max-w-[90px] truncate text-[11px] uppercase tracking-wider">
                    {user.displayName || "Partner"}
                  </span>
                  <button
                    onClick={() => logOut()}
                    className="p-1 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onRequestAuthOpen}
                  className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#00D1FF]/5 border border-[#00D1FF]/30 text-xs font-mono text-[#00D1FF] hover:text-white hover:border-[#00D1FF] hover:bg-[#00D1FF]/10 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,209,255,0.06)]"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="font-bold tracking-wide uppercase">Sign In</span>
                </button>
              )}
            </LusionMagnetic>

            {/* Admin Dashboard Trigger */}
            {user && user.email?.toLowerCase() === "mohd.suhail114952@gmail.com" && (
              <LusionMagnetic strength={0.2}>
                <button
                  onClick={onRequestAdminOpen}
                  className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-xs font-mono text-amber-400 hover:text-white hover:border-amber-400 hover:bg-amber-500/25 transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.08)]"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="font-bold tracking-wide uppercase">Admin Panel</span>
                </button>
              </LusionMagnetic>
            )}

            <LusionMagnetic strength={0.25}>
              <button
                onClick={onRequestBookCall}
                className="flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-white font-mono text-xs font-bold hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_15px_rgba(108,99,255,0.25)]"
              >
                <span>Book a Call</span>
                <Sparkles className="w-3.5 h-3.5 ml-0.5 animate-pulse" />
              </button>
            </LusionMagnetic>

            <LusionMagnetic strength={0.2}>
              <button
                onClick={() => {
                  const elem = document.getElementById("contact");
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-1 h-9 px-4 rounded-xl bg-surface-dark border border-border-dark text-xs font-mono text-text-sub hover:text-text-luxury hover:border-[#00D1FF]/40 hover:bg-[#00D1FF]/5 transition-all cursor-pointer"
              >
                <span>Build Connect</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5 inline" />
              </button>
            </LusionMagnetic>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
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
              
              <div className="flex flex-col gap-2.5 pt-4">
                {user ? (
                  <div className="flex flex-col gap-2.5 w-full">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-dark border border-[#00D1FF]/20 text-xs font-mono">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] flex items-center justify-center text-xs font-bold text-white shadow-md uppercase">
                          {user.displayName ? user.displayName.slice(0, 1) : (user.email ? user.email.slice(0, 1) : "U")}
                        </div>
                        <span className="text-text-sub font-medium max-w-[150px] truncate">
                          {user.displayName || user.email || "SUHX Partner"}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          logOut();
                        }}
                        className="p-1.5 rounded-lg text-red-400 bg-red-500/10 transition-colors cursor-pointer flex items-center gap-1.5 px-3"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Log Out</span>
                      </button>
                    </div>

                    {/* Mobile Admin Dashboard Trigger */}
                    {user.email?.toLowerCase() === "mohd.suhail114952@gmail.com" && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onRequestAdminOpen();
                        }}
                        className="py-3 px-4 w-full rounded-xl bg-amber-500/10 border border-amber-500/35 text-amber-400 hover:text-white font-mono text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Shield className="w-4 h-4" />
                        <span className="font-bold uppercase tracking-wider">Open Admin Panel</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onRequestAuthOpen();
                    }}
                    className="py-3 px-4 w-full rounded-xl border border-[#00D1FF]/30 bg-[#00D1FF]/5 text-[#00D1FF] hover:text-white font-mono text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider">Sign In / Sign Up</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onRequestBookCall();
                  }}
                  className="py-3 px-4 w-full rounded-xl bg-gradient-to-r from-primary-studio to-secondary-studio text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#6C63FF]/20"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
                  <span>Book a Strategic Call</span>
                </button>
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    const elem = document.getElementById("contact");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="py-3 px-4 w-full rounded-xl bg-[#0a0e17] border border-border-dark text-text-sub font-mono text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:text-white"
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

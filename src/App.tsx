import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Sparkles, Check, MessageCircle } from "lucide-react";

// Components
import GlowBackground from "./components/GlowBackground";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioShowcase from "./components/PortfolioShowcase";
import AboutPage from "./components/AboutPage";
import ProcessTimeline from "./components/ProcessTimeline";
import MasterClass from "./components/MasterClass";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AIChatAgent from "./components/AIChatAgent";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Simple active tab trigger depending on window scroll location
      const sections = ["home", "services", "portfolio", "about", "process"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const elem = document.getElementById(section);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#070B14] text-text-luxury selection:bg-[#00D1FF]/35 selection:text-text-luxury overflow-x-hidden">
      {/* 1. Futuristic Animating Background */}
      <GlowBackground />

      {/* 2. Brand navigation panel header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onRequestChatOpen={() => setIsChatOpen(true)}
      />

      {/* 3. Core Landing Body Frame */}
      <main className="relative pt-4">
        
        {/* HERO SECTION */}
        <HeroSection />

        {/* TRUST / STATS SECTION */}
        <StatsSection />

        {/* SERVICES OFFERED MODULE */}
        <ServicesSection />

        {/* CASE SHOWCASE FILTER MODULE */}
        <PortfolioShowcase />

        {/* EXECUTIVE BIO & CRIC TIMELINE */}
        <AboutPage />

        {/* GLORIOUS connected PROCESS WORKFLOW */}
        <ProcessTimeline />

        {/* AI-FIRST UX/UI MASTERCLASS REGISTER */}
        <MasterClass />

        {/* EXPERT CLIENT REFERENCE MODULE */}
        <Testimonials />

        {/* PREMIUM PROJECT COMPACT INGEST */}
        <ContactForm />

      </main>

      {/* 4. Luxury Footer Footprint */}
      <Footer />

      {/* 5. Virtual Intelligence chatbot twin drawer */}
      <AIChatAgent 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      {/* 6. Floating Action Hub: Chat + Top Scroll */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        {/* Small accessibility scroll to Top trigger */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={handleScrollToTop}
              className="w-10 h-10 rounded-xl glass border-border-dark text-text-sub hover:text-[#00D1FF] hover:border-[#00D1FF]/40 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Scroll to top of application"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Quick Link */}
        <motion.a
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/917065927198"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer group shadow-[0_0_25px_rgba(37,211,102,0.4)]"
          style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
          aria-label="Direct Reach Out on WhatsApp with MD Suhail"
        >
          {/* Internal rotating light flare */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,255,255,0.4),transparent_60%] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          
          {/* Real High-Fidelity SVG WhatsApp Icon */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 fill-white relative z-10 animate-pulse"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          
          {/* Premium dark tooltip helper */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#101826]/95 border border-border-dark text-xs font-mono text-text-luxury whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
            // LIVE CHAT ON WHATSAPP
          </div>
        </motion.a>

        {/* Floating AI Hub Spark trigger */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 rounded-2xl bg-[#0c1220]/90 border border-border-dark/80 hover:border-[#00D1FF]/50 flex items-center justify-center shadow-[0_0_25px_rgba(108,99,255,0.25)] hover:shadow-[0_0_35px_rgba(0,209,255,0.4)] relative overflow-hidden cursor-pointer group transition-all duration-300"
          aria-label="Open AI Assistant Chat"
        >
          {/* Subtle colorful back glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/15 via-[#A855F7]/10 to-[#00D1FF]/15 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 relative z-10 animate-pulse"
          >
            <defs>
              <linearGradient id="aiSparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7b00" />
                <stop offset="30%" stopColor="#e52e71" />
                <stop offset="55%" stopColor="#b422e5" />
                <stop offset="80%" stopColor="#6C63FF" />
                <stop offset="100%" stopColor="#00D1FF" />
              </linearGradient>
            </defs>
            {/* Direct high-fidelity Google Gemini Logo Star Drawing */}
            <path
              fill="url(#aiSparkleGradient)"
              d="M9 22a.75.75 0 0 1-.75-.75c0-4.9-3.6-8.5-8.5-8.5a.75.75 0 0 1 0-1.5c4.9 0 8.5-3.6 8.5-8.5a.75.75 0 0 1 1.5 0c0 4.9 3.6 8.5 8.5 8.5a.75.75 0 0 1 0 1.5c-4.9 0-8.5 3.6-8.5 8.5A.75.75 0 0 1 9 22zm9.5-12.5a.5.5 0 0 1-.5-.5c0-2.2-1.8-4-4-4a.5.5 0 0 1 0-1c2.2 0 4-1.8 4-4a.5.5 0 0 1 1 0c0 2.2 1.8 4 4 4a.5.5 0 0 1 0 1c-2.2 0-4 1.8-4 4a.5.5 0 0 1-.5.5z"
            />
          </svg>
          
          {/* Little notification spark indicator */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#070B14]" />
        </motion.button>
      </div>
    </div>
  );
}

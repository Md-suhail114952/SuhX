import * as Icons from "lucide-react";
import { motion } from "motion/react";
import suhxLogo from "../assets/images/suhx_logo_1779791742292.png";
import { useTransparentLogo } from "../hooks/useTransparentLogo";

export default function Footer() {
  const transparentLogo = useTransparentLogo(suhxLogo);
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mdsuhaildesign/",
      icon: "Linkedin",
      color: "hover:text-[#00D1FF] hover:border-[#00D1FF]/40 hover:shadow-[0_0_15px_rgba(0,209,255,0.25)]",
    },
    {
      name: "Behance",
      url: "https://www.behance.net/mohdsuhail18",
      icon: "Compass", // Faintly matches Behance logo, or custom representation
      color: "hover:text-[#6C63FF] hover:border-[#6C63FF]/40 hover:shadow-[0_0_15px_rgba(108,99,255,0.25)]",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/",
      icon: "Instagram",
      color: "hover:text-pink-400 hover:border-pink-400/40 hover:shadow-[0_0_15px_rgba(244,63,94,0.25)]",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/",
      icon: "Twitter",
      color: "hover:text-[#00D1FF] hover:border-[#00D1FF]/40 hover:shadow-[0_0_15px_rgba(0,209,255,0.25)]",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icon: "Facebook",
      color: "hover:text-blue-500 hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]",
    }
  ];

  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070B14] border-t border-border-dark/60 relative z-10 pt-20 pb-12">
      {/* Visual top decor fade line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary-studio/35 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Left Column Brand Details */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center">
            <img 
              src={transparentLogo} 
              alt="SUHX Logo" 
              className="h-7 md:h-9 w-auto object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="text-sm text-text-sub max-w-md leading-relaxed">
            SUHX is a world-class creative design and AI integration studio founded by MD Suhail. Combining geometric layout frameworks with state-of-the-art neural intelligence systems.
          </p>

          {/* Social Row */}
          <div className="flex items-center gap-3 pt-4">
            {socialLinks.map((link) => {
              // Extract target icon component
              const IconComp = (Icons as any)[link.icon] || Icons.Atom;

              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl bg-surface-dark border border-border-dark/65 flex items-center justify-center text-text-sub transition-all duration-300 ${link.color}`}
                  aria-label={`Visit MD Suhail on ${link.name}`}
                >
                  <IconComp className="w-5 h-5 stroke-[1.5]" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Center Columns Navigation - 3 cols */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#00D1FF]">// Navigation Map</h4>
          <ul className="space-y-2 text-sm text-text-sub">
            {["Services", "Portfolio", "About", "Process"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleScrollTo(item.toLowerCase())}
                  className="hover:text-text-luxury transition-colors text-left cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Contact Details - 4 cols */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#6C63FF]">// Matrix Blueprint</h4>
          <div className="space-y-2 text-sm text-text-sub">
            <p>
              <strong>Main Base:</strong> New Delhi, India
            </p>
            <p>
              <strong>Direct Voice:</strong>{" "}
              <a href="tel:7065927198" className="hover:text-[#00D1FF] transition-colors">
                +91 7065927198
              </a>
            </p>
            <p className="break-all">
              <strong>Email Transmission:</strong>{" "}
              <a href="mailto:mohd.suhail114952@gmail.com" className="hover:text-[#6C63FF] transition-colors">
                mohd.suhail114952@gmail.com
              </a>
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-mono text-text-sub/50 border border-border-dark px-2.5 py-1 rounded bg-[#070B14]">
              LATENCY STATUS: OPTIMAL // 24000hz Core
            </span>
          </div>
        </div>
      </div>

      {/* Structural bottom Copyright bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border-dark/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-sub/40">
        <p>© 2026 SUHX Studio. Designed & Coded with absolute precision.</p>
        <div className="flex gap-4 items-center">
          <a href="https://www.behance.net/mohdsuhail18" target="_blank" rel="noreferrer" className="hover:text-[#00D1FF] transition-colors text-[#00D1FF] font-bold font-sans text-[11px] tracking-wider select-none">SUHX.DESIGN</a>
          <span>//</span>
          <a href="https://www.linkedin.com/in/mdsuhaildesign/" target="_blank" rel="noreferrer" className="hover:text-text-sub transition-colors">CONNECT</a>
        </div>
      </div>
    </footer>
  );
}

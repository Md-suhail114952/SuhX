import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { Mail, ArrowUpRight, Linkedin, Github, MessageSquare, Phone } from "lucide-react";

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hlsSource = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

  // 1. Initialize reversed/flipped HLS video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(hlsSource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log("Auto-play blocked:", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsSource;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.log("Auto-play blocked:", err));
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  // 2. GSAP Marquee (BUILDING THE FUTURE • repeated 10x, xPercent: -50, linear infinite scroll)
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Direct GSAP implementation as requested
    const animation = gsap.to(".marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1
    });

    return () => {
      animation.kill();
    };
  }, []);

  // Scroll to Top helper
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mdsuhaildesign/", icon: <Linkedin className="w-4 h-4" /> },
    { name: "WhatsApp", url: "https://wa.me/917065927198", icon: <Phone className="w-4 h-4" /> },
    { name: "Email Client", url: "mailto:mohd.suhail114952@gmail.com", icon: <Mail className="w-4 h-4" /> }
  ];

  const marqueeText = "BUILDING THE FUTURE • DESIGNING INTUITION • CREATING IMPACT • ";

  return (
    <footer id="contact" ref={containerRef} className="bg-bg pt-20 pb-8 md:pb-12 relative overflow-hidden select-none border-t border-stroke/30">
      
      {/* Background Vertical Flipped HLS Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          style={{ transform: "scale(1.2) scaleY(-1) translate(-40%, 40%)" }}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover"
        />
        {/* Dark overlay & Top gradient fade */}
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-bg to-transparent z-[2]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 flex flex-col justify-between h-full gap-16">
        
        {/* Upper Segment: CTA Header */}
        <div className="text-center flex flex-col items-center max-w-2xl mx-auto gap-6 pt-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 border border-[#00D1FF]/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LET'S ENGAGE ON NEW VENTURES</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-text-primary leading-none">
            Have a project in <span className="font-display italic text-text-primary/95">mind?</span>
          </h2>

          <p className="text-xs md:text-sm text-muted leading-relaxed font-light">
            I'm currently accepting premium digital product contracts, branding consultations, e-commerce listings visual optimization, and AI creative pipeline setup.
          </p>

          {/* Email CTA Pill with Hover Accent Gradient Rings */}
          <div className="mt-4">
            <a
              href="mailto:mohd.suhail114952@gmail.com"
              className="group relative inline-flex items-center gap-3.5 rounded-full text-xs sm:text-sm font-mono tracking-widest uppercase px-8 py-5 border border-stroke bg-bg/80 text-text-primary hover:text-text-primary transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full bg-transparent group-hover:accent-gradient -z-20 p-[1.5px]" />
              <span className="absolute inset-[1px] rounded-full bg-bg -z-10 group-hover:bg-surface/90 transition-all duration-300" />
              <Mail className="w-4 h-4 text-muted group-hover:text-text-primary" />
              <span>mohd.suhail114952@gmail.com</span>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-text-primary group-hover:rotate-45 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Middle Segment: GSAP Marquee (Horizontal ticker) */}
        <div
          ref={marqueeRef}
          className="w-full py-4 border-y border-stroke/50 overflow-hidden relative"
        >
          {/* Double text layout for infinite GSAP wrapping */}
          <div className="marquee-inner flex whitespace-nowrap text-3xl md:text-5xl lg:text-6xl font-display italic text-text-primary/10 tracking-tight select-none pointer-events-none">
            <div className="flex shrink-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="mr-6 uppercase">
                  {marqueeText}
                </span>
              ))}
            </div>
            <div className="flex shrink-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="mr-6 uppercase">
                  {marqueeText}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Segment: Footer Bar and Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-stroke/30 pt-8 gap-6 md:gap-4 font-mono text-xs text-muted">
          
          {/* Green Pulse available dot */}
          <div className="flex items-center gap-2 bg-surface border border-stroke rounded-full px-3 py-1.5 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for projects</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary flex items-center gap-1.5 transition-colors"
              >
                {social.icon}
                <span className="hidden sm:inline">{social.name}</span>
              </a>
            ))}
          </div>

          {/* Copyright / Scroll Back Up */}
          <div className="flex items-center gap-4">
            <span>© 2026 SUHX Studio</span>
            <button
              onClick={handleScrollToTop}
              className="w-8 h-8 rounded-full border border-stroke hover:border-white/20 flex items-center justify-center cursor-pointer transition-colors hover:text-text-primary"
              aria-label="Back to top"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

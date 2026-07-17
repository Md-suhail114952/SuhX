import { useState, useEffect, useRef } from "react";
import { Testimonial } from "../types";
import { Quote, Star } from "lucide-react";
import { CardStack } from "./ui/card-stack";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 520, height: 320 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        // set card width to fit container with some padding, but clamp between 300px and 520px
        const computedWidth = Math.max(300, Math.min(520, width - 32));
        // adjust height so text fits comfortably on mobile
        const computedHeight = computedWidth < 450 ? 330 : 280;
        setDimensions({ width: computedWidth, height: computedHeight });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const list: Testimonial[] = [
    {
      id: "test-1",
      quote: "Working with SUHX was an absolute masterclass in brand storytelling, UI system aesthetics, and creative-tech integration. Drastically upgraded our buyer experience pipelines for high-end residential listings, helping us establish a premium brand presence. Absolute elite-level design quality.",
      clientName: "Divya Sharma",
      designation: "VP",
      company: "NYSA Real Estate",
      avatarInitials: "DS",
      rating: 5,
    },
    {
      id: "test-2",
      quote: "MD Suhail completely re-engineered how we present large-scale visual assets and outdoor media campaigns. His attention to flawless typographic scale, color contrast, and high-fidelity layouts is unparalleled. An exceptional talent to partner with.",
      clientName: "Hunar Bhatiya",
      designation: "VP",
      company: "Legend Outdoor Advertisement",
      avatarInitials: "HB",
      rating: 5,
    },
    {
      id: "test-3",
      quote: "Working with MD Suhail was a game-changer for our international marketing suites. His ability to fuse modern brand design with scalable components helped us deliver cohesive, high-impact visuals across all our global platforms. Very strategic and highly professional.",
      clientName: "Varun Kapoor",
      designation: "Founder",
      company: "KIAN International",
      avatarInitials: "VK",
      rating: 5,
    },
    {
      id: "test-4",
      quote: "MD Suhail's visual design expertise is outstanding. He transformed our creative approach, producing pristine vector assets, promotional collateral, and high-fidelity presentations with pixel-perfect precision. A top-tier designer who elevates every asset.",
      clientName: "Aman Khan",
      designation: "Founder",
      company: "AK Graphics",
      avatarInitials: "AK",
      rating: 5,
    },
  ];

  // Map our Testimonial models to CardStackItem interface safely
  const cardItems = list.map((item) => ({
    id: item.id,
    title: item.clientName,
    description: item.quote,
    designation: item.designation,
    company: item.company,
    rating: item.rating,
    avatarInitials: item.avatarInitials,
  }));

  const renderCard = (item: typeof cardItems[0], state: { active: boolean }) => {
    return (
      <div 
        className={`h-full w-full rounded-xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative border transition-all duration-300 ${
          state.active 
            ? "bg-surface-dark border-[#00D1FF]/40 shadow-[0_20px_50px_rgba(0,209,255,0.08)]" 
            : "bg-[#0A0E17] border-border-dark/60 opacity-90"
        }`}
      >
        {/* Radial highlight for the active card */}
        <div className={`absolute top-0 right-0 w-36 h-36 bg-radial-[circle_at_top_right,rgba(108,99,255,0.04),transparent_65%] transition-opacity duration-300 ${state.active ? 'opacity-100' : 'opacity-20'}`} />

        {/* Quote symbol mark */}
        <div className="absolute top-4 left-4 text-[#00D1FF] opacity-[0.025] select-none pointer-events-none">
          <Quote className="w-16 h-16 stroke-[1.5]" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-between h-full">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
              ))}
            </div>
            <span className="text-[8px] font-mono tracking-widest text-[#00D1FF] uppercase opacity-75">
              // Client Endorsement
            </span>
          </div>

          {/* Testimonial text */}
          <p className="text-xs md:text-[13px] text-text-luxury font-display leading-relaxed font-light line-clamp-6 md:line-clamp-4 flex-1 mb-5">
            "{item.description}"
          </p>

          {/* Author info footer */}
          <div className="pt-4 border-t border-border-dark/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#6C63FF] to-[#00D1FF] flex items-center justify-center font-bold text-text-luxury text-xs tracking-wider shadow-lg shadow-[#6C63FF]/20 select-none shrink-0">
              {item.avatarInitials}
            </div>
            <div className="min-w-0">
              <h4 className="font-display font-bold text-text-luxury text-xs truncate">
                {item.title}
              </h4>
              <p className="text-[10px] font-mono text-text-sub uppercase tracking-widest mt-0.5 truncate">
                {item.designation} <span className="text-[#00D1FF]">// {item.company}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-24 max-w-5xl mx-auto px-6 relative z-10 border-t border-border-dark/40">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1.5 rounded-full inline-block">
          // Peer Appraisals
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury mt-4">
          Trusted by <span className="text-gradient font-bold">Industry Visionaries</span>
        </h2>
      </div>

      {/* Resize container bound for responsive calculations */}
      <div ref={containerRef} className="w-full flex justify-center px-4">
        <CardStack
          items={cardItems}
          initialIndex={0}
          autoAdvance
          intervalMs={4000}
          pauseOnHover
          showDots
          cardWidth={dimensions.width}
          cardHeight={dimensions.height}
          overlap={0.4}
          spreadDeg={30}
          depthPx={90}
          tiltXDeg={8}
          activeScale={1.02}
          inactiveScale={0.93}
          className="mx-auto"
          renderCard={renderCard}
        />
      </div>
    </section>
  );
}

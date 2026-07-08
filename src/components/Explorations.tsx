import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Maximize2, Sparkles, X } from "lucide-react";

interface PlaygroundItem {
  id: string;
  title: string;
  image: string;
  category: string;
  prompt: string;
  rotation: string; // Tailwind class
}

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null);

  const items: PlaygroundItem[] = [
    {
      id: "ex1",
      title: "Procedural Glass",
      category: "CGI Render",
      prompt: "Ultra-detailed glass refraction with iridescent backlighting, studio lighting, octane render --ar 1:1 --v 6.0",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      rotation: "hover:rotate-[-2deg]"
    },
    {
      id: "ex2",
      title: "Brutalist Dial",
      category: "Interface Spec",
      prompt: "Raw concrete interface elements, high contrast digital dials, orange accent telemetry data --v 6.0",
      image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=600&q=80",
      rotation: "hover:rotate-[3deg]"
    },
    {
      id: "ex3",
      title: "Organic Contrast",
      category: "Ad Asset",
      prompt: "Luxury product bottle set inside a dark obsidian rock cave, dramatic top lighting, mist --ar 4:5 --v 6.0",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
      rotation: "hover:rotate-[1deg]"
    },
    {
      id: "ex4",
      title: "Liquid Typography",
      category: "Motion Graphic",
      prompt: "Sleek flowing black mercury text forming futuristic logo typography, high-gloss finish --v 6.0",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
      rotation: "hover:rotate-[-3deg]"
    },
    {
      id: "ex5",
      title: "Studio Landscape",
      category: "Photo Curation",
      prompt: "E-commerce lifestyle photoshoot, warm mid-century neutral tone background, abstract shadows --ar 16:9",
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&q=80",
      rotation: "hover:rotate-[2deg]"
    },
    {
      id: "ex6",
      title: "Tactile Clay",
      category: "AI Model Concept",
      prompt: "Minimal raw clay abstract sculptures arranged symmetrically, soft shadows, warm beige tones --v 6.0",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
      rotation: "hover:rotate-[-1deg]"
    }
  ];

  // Hook scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create reverse motion columns
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="bg-bg py-24 relative border-b border-stroke/30 select-none overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-12 md:gap-16 items-start relative">
        
        {/* Sticky Left Column (Pinned Content - Layer 1) */}
        <div className="w-full md:w-5/12 md:sticky md:top-24 md:h-[65vh] flex flex-col justify-center z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">Creative R&D</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-text-primary mb-6 leading-none">
            Visual <span className="font-display italic text-text-primary/95">playground</span>
          </h2>

          <p className="text-sm md:text-base text-muted max-w-sm font-light leading-relaxed mb-8">
            An archive of procedural CGI experiments, high-fidelity Midjourney prompting landscapes, and styled brand assets designed to expand digital storytelling boundaries.
          </p>

          <div>
            <a
              href="https://www.linkedin.com/in/mdsuhaildesign/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full text-xs font-mono tracking-tight uppercase px-6 py-3.5 border border-stroke bg-bg/40 text-text-primary cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full bg-transparent group-hover:accent-gradient -z-20 p-[1.5px]" />
              <span className="absolute inset-[1px] rounded-full bg-bg -z-10 group-hover:bg-surface transition-all duration-300" />
              <span>FOLLOW ON LINKEDIN</span>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-text-primary group-hover:rotate-45 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Scrolling Parallax Columns (Layer 2) */}
        <div className="w-full md:w-7/12 grid grid-cols-2 gap-4 md:gap-6 relative z-20">
          
          {/* Column 1 (Parallax Up) */}
          <motion.div style={{ y: yColumn1 }} className="flex flex-col gap-4 md:gap-6 pt-12">
            {items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative aspect-square w-full rounded-2xl md:rounded-3xl border border-stroke bg-surface overflow-hidden cursor-pointer transition-transform duration-500 ${item.rotation}`}
              >
                {/* Halftone */}
                <div className="absolute inset-0 halftone-overlay opacity-[0.08] z-10 pointer-events-none mix-blend-multiply" />
                
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4 md:p-6">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#00D1FF] mb-1">
                    {item.category}
                  </span>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-sans font-medium text-text-primary">
                      {item.title}
                    </h4>
                    <Maximize2 className="w-3.5 h-3.5 text-muted" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Column 2 (Parallax Down) */}
          <motion.div style={{ y: yColumn2 }} className="flex flex-col gap-4 md:gap-6">
            {items.slice(3, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative aspect-square w-full rounded-2xl md:rounded-3xl border border-stroke bg-surface overflow-hidden cursor-pointer transition-transform duration-500 ${item.rotation}`}
              >
                {/* Halftone */}
                <div className="absolute inset-0 halftone-overlay opacity-[0.08] z-10 pointer-events-none mix-blend-multiply" />
                
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4 md:p-6">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#00D1FF] mb-1">
                    {item.category}
                  </span>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-sans font-medium text-text-primary">
                      {item.title}
                    </h4>
                    <Maximize2 className="w-3.5 h-3.5 text-muted" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Overlay for prompts and imagery */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-surface max-w-2xl w-full rounded-3xl border border-stroke overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media Part */}
              <div className="relative aspect-square w-full bg-bg max-h-[380px] overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-text-primary hover:bg-black/80 transition-colors cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Text & Prompt Detail Part */}
              <div className="p-6 md:p-8 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D1FF]">
                    {selectedItem.category} // SUHX R&D
                  </span>
                  <span className="text-xs font-mono text-muted">Aesthetic Experiment</span>
                </div>

                <h3 className="text-xl md:text-2xl font-sans font-medium text-text-primary">
                  {selectedItem.title}
                </h3>

                <div className="rounded-xl border border-stroke bg-bg/80 p-4 font-mono text-xs text-[#89AACC]/90 leading-relaxed relative overflow-hidden flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-muted text-[10px] tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
                    <span>Neural Prompt Matrix</span>
                  </div>
                  <p className="italic">
                    "{selectedItem.prompt}"
                  </p>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-3.5 rounded-full bg-stroke text-text-primary text-xs font-mono hover:bg-stroke/80 transition-colors border border-white/5"
                >
                  CLOSE GALLERY VIEW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

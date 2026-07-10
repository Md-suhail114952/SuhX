import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "../types";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const active = list[currentIndex];

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

      {/* Testimonial Core Slider Box */}
      <div className="relative rounded-3xl p-8 md:p-12 bg-surface/40 border border-border-dark/65 overflow-hidden shadow-[0_20px_45px_-15px_rgba(108,99,255,0.08)]">
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-radial from-[#6c63ff0d] to-transparent blur-3xl pointer-events-none" />

        {/* Large atmospheric quote sign watermarked */}
        <div className="absolute top-6 left-6 text-[#00D1FF] select-none pointer-events-none opacity-[0.03]">
          <Quote className="w-24 h-24 stroke-[1.5]" />
        </div>

        <div className="min-h-[250px] flex flex-col justify-between relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Star Ratings */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
                ))}
              </div>

              {/* Quotation text */}
              <blockquote className="text-lg md:text-xl font-display font-medium leading-relaxed text-text-luxury">
                "{active.quote}"
              </blockquote>

              {/* Client meta details */}
              <div className="flex items-center gap-4 pt-6 border-t border-border-dark/60">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00D1FF] flex items-center justify-center font-bold text-text-luxury text-sm tracking-wider shadow-lg shadow-[#6C63FF]/20 select-none">
                  {active.avatarInitials}
                </div>
                <div>
                  <h4 className="font-display font-bold text-text-luxury">{active.clientName}</h4>
                  <p className="text-xs font-mono text-text-sub uppercase tracking-widest mt-0.5">
                    {active.designation} <span className="text-[#00D1FF]">// {active.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls indicators Row */}
          <div className="flex items-center justify-between mt-10">
            {/* Sliding Page Dots */}
            <div className="flex gap-2">
              {list.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? "w-8 bg-[#00D1FF] shadow-[0_0_8px_rgba(0,209,255,0.5)]" : "w-1.5 bg-border-dark/80"
                  }`}
                  aria-label={`Jump to page ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slider change handles */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-surface-dark/95 border border-border-dark text-text-sub hover:text-text-luxury hover:border-[#00D1FF]/40 flex items-center justify-center cursor-pointer transition-colors duration-200"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-surface-dark/95 border border-border-dark text-text-sub hover:text-text-luxury hover:border-[#00D1FF]/40 flex items-center justify-center cursor-pointer transition-colors duration-200"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

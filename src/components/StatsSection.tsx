import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Award, Briefcase, Users, HeartHandshake } from "lucide-react";

// Lightweight, hardware-accelerated animated counter using standard IntersectionObserver
function AnimatedCount({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const numMatch = value.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, "");

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = targetNum;
    if (start === end) return;

    const totalSteps = 45;
    const stepTime = (duration * 1000) / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.round(start + (end - start) * easedProgress);

      setCurrent(currentVal);

      if (step >= totalSteps) {
        setCurrent(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetNum, duration]);

  return (
    <span ref={ref} className="font-display tabular-nums">
      {current}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats = [
    {
      id: "exp",
      value: "6+",
      label: "Years Experience",
      icon: Award,
      sub: "Active high-end product design, creative direction, and digital engineering leadership.",
      color: "text-[#6C63FF]",
    },
    {
      id: "projects",
      value: "50+",
      label: "Projects Completed",
      icon: Briefcase,
      sub: "Bespoke SaaS applications, full-scale brand identities, and immersive design systems.",
      color: "text-[#00D1FF]",
    },
    {
      id: "clients",
      value: "20+",
      label: "Happy Clients",
      icon: Users,
      sub: "Elite agencies, VC-funded startups, and legacy brands served across the globe.",
      color: "text-[#A855F7]",
    },
    {
      id: "custom",
      value: "100%",
      label: "Custom Designs",
      icon: HeartHandshake,
      sub: "Zero templates. Every grid, pixel, interaction, and strategy tailored to client goals.",
      color: "text-[#00D1FF]",
    },
  ];

  return (
    <section id="metrics" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-dark/40">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full inline-block">
          // Performance Metrics
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury mt-4">
          Engineered for <span className="text-gradient font-bold">Absolute Impact</span>
        </h2>
        <p className="max-w-md mx-auto text-sm text-text-sub mt-4">
          Measurable excellence across years of creative leadership and pixel-perfect execution.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ 
                y: -6,
                borderColor: "rgba(108, 99, 255, 0.25)",
                boxShadow: "0 15px 35px -10px rgba(108, 99, 255, 0.12)"
              }}
              className="relative p-8 rounded-2xl bg-surface/40 border border-border-dark/65 transition-all duration-300 overflow-hidden group cursor-default flex flex-col justify-between"
              id={`stat-card-${stat.id}`}
            >
              {/* Radial gradient background on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-studio/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl pointer-events-none" />

              <div>
                {/* Icon Container */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl bg-bg border border-border-dark group-hover:border-transparent group-hover:bg-[#6C63FF]/10 transition-all duration-300 ${stat.color}`}>
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-muted/40 uppercase">
                    Metric // 0{idx + 1}
                  </span>
                </div>

                {/* Big Stat Value with Count-Up */}
                <h3 className="text-5xl font-display font-black tracking-tight text-white mb-2">
                  <AnimatedCount value={stat.value} />
                </h3>

                {/* Stat Label */}
                <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-[#00D1FF] mb-3">
                  {stat.label}
                </h4>

                {/* Stat Subtext */}
                <p className="text-xs text-text-sub leading-relaxed">
                  {stat.sub}
                </p>
              </div>

              {/* Bottom active accent line */}
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#6C63FF] group-hover:to-[#00D1FF] transition-all duration-500" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

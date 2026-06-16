import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Stat } from "../types";

export default function StatsSection() {
  const stats: Stat[] = [
    {
      id: "projects",
      value: "250+",
      label: "Projects Completed",
      icon: "Layers",
      sub: "Premium UI/UX solutions, design models, and AI prototypes delivered globally.",
    },
    {
      id: "clients",
      value: "120+",
      label: "Happy Clients",
      icon: "Users",
      sub: "Creative agency collaborations and top-tier SaaS engineering partnerships.",
    },
    {
      id: "experience",
      value: "8+",
      label: "Years Experience",
      icon: "Award",
      sub: "Pioneering creative design direction and certified intelligence engineering.",
    },
    {
      id: "solutions",
      value: "450+",
      label: "Creative Solutions",
      icon: "Sparkles",
      sub: "Dynamic brand definitions, AI workflows, and cinematic interface prototypes.",
    },
  ];

  return (
    <section id="metrics" className="py-20 max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          // Dynamic Lucide component lookup
          const IconComponent = (Icons as any)[stat.icon] || Icons.HelpCircle;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ 
                y: -6,
                borderColor: "rgba(0, 209, 255, 0.45)",
                boxShadow: "0 10px 30px -10px rgba(0, 209, 255, 0.15)"
              }}
              className="relative p-6 rounded-2xl glass transition-all duration-300 overflow-hidden group cursor-default"
              id={`stat-card-${stat.id}`}
            >
              {/* Radial background glowing mesh */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary-studio/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl" />
              
              {/* Floating tech background marker */}
              <div className="absolute top-4 right-4 text-xs font-mono text-text-sub/20 select-none group-hover:text-secondary-studio/35 transition-colors duration-300">
                //0{idx + 1}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-surface-dark border border-border-dark text-[#00D1FF] group-hover:bg-[#00D1FF]/10 group-hover:border-[#00D1FF]/40 transition-all duration-300">
                  <IconComponent className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-4xl font-display font-bold tracking-tight text-text-luxury group-hover:text-gradient transition-all duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#00D1FF]">
                    {stat.label}
                  </p>
                </div>
              </div>

              <p className="text-sm text-text-sub leading-relaxed group-hover:text-text-luxury transition-colors duration-300">
                {stat.sub}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

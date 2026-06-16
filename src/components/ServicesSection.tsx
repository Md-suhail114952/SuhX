import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Service } from "../types";

export default function ServicesSection() {
  const services: Service[] = [
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Engineered user interfaces designed using high-fidelity Figma systems, meticulous hierarchy, user intuition, and micro-interactions that feeling organic.",
      icon: "Figma",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(108,99,255,0.15)] group-hover:border-[rgba(108,99,255,0.4)]",
      tags: ["Figma Systems", "Low/High-Fi", "User Journeys", "Interactions"],
    },
    {
      id: "web-design",
      title: "Website Design",
      description: "Framer-level cinematic landing pages and ultraresponsive modular grids with heavy emphasis on layout balance, elegant typography, and brand synergy.",
      icon: "Globe",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(0,209,255,0.15)] group-hover:border-[rgba(0,209,255,0.4)]",
      tags: ["Desktop First", "Webflow/Framer", "Aesthetic Grids"],
    },
    {
      id: "mobile-apps",
      title: "Mobile App Design",
      description: "Immersive iOS and Android UI designs leveraging native components, fluid swipe architectures, modern widgets, and premium dark/light adaptive frameworks.",
      icon: "Smartphone",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(168,85,247,0.15)] group-hover:border-[rgba(168,85,247,0.4)]",
      tags: ["iOS Human Guide", "Material Design", "Haptic Maps"],
    },
    {
      id: "branding",
      title: "Branding Identity",
      description: "Comprehensive logo engineering, geometric marks, cohesive style guides, typography manuals, and color philosophies designed for technology giants and modern SaaS platforms.",
      icon: "Fingerprint",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(108,99,255,0.15)] group-hover:border-[rgba(108,99,255,0.4)]",
      tags: ["Logos", "Style Guides", "Typography Rules", "SaaS Positioning"],
    },
    {
      id: "social-media",
      title: "Social Media Design",
      description: "Visual strategies and curated creative assets optimized for rapid conversion, including cohesive grid layouts, carousel templates, and high-impact custom illustrations.",
      icon: "Instagram",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(0,209,255,0.15)] group-hover:border-[rgba(0,209,255,0.4)]",
      tags: ["Instagram Grids", "Carousels", "Creative Directing"],
    },
    {
      id: "motion-graphics",
      title: "Motion Graphics",
      description: "Dynamic video animations, futuristic logo intros, website micro-animations, product walkthroughs, and kinetic typography that command absolute attention.",
      icon: "Tv",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(168,85,247,0.15)] group-hover:border-[rgba(168,85,247,0.4)]",
      tags: ["Lottie Files", "After Effects", "Logo Intros", "Cinematics"],
    },
    {
      id: "ai-systems",
      title: "AI Creative Systems",
      description: "Design-integrated AI deployment linking Midjourney pipeline triggers, Leonardo prompt matrices, and Gemini models to construct limitless high-fidelity creative generation cycles.",
      icon: "Cpu",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(0,209,255,0.2)] group-hover:border-[rgba(0,209,255,0.5)]",
      tags: ["Midjourney Matrix", "Leonardo AI", "Prompt Models", "Workflows"],
    },
    {
      id: "presentation",
      title: "Presentation Design",
      description: "High-end corporate keynotes, investor pitch decks, and digital portfolios designed to state complex ideas clearly and close major funding cycles.",
      icon: "Presentation",
      glowColor: "group-hover:shadow-[0_0_30px_rgb(108,99,255,0.15)] group-hover:border-[rgba(108,99,255,0.4)]",
      tags: ["Pitch Decks", "Keynote", "Data Visualizing", "Layout Mastery"],
    },
  ];

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 relative z-10">
      {/* Structural Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6C63FF] bg-[#6C63FF]/10 px-3 py-1.5 rounded-full">
            // Studio Capability
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury mt-4">
            Forging Digital <span className="text-gradient font-bold">Intelligences</span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-text-sub leading-relaxed">
          Merging structural classic layout discipline with elite AI generative pipelines to produce digital experience masterpieces.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => {
          // Dynamic Lucide selection with fallbacks
          let IconComp = (Icons as any)[service.icon] || Icons.Layout;
          // Figma-specific manual icon drawing since Lucide may not map easily
          if (service.icon === "Figma") {
            IconComp = Icons.Compass; // Compass is nice substitute, or let's keep Compass
          }

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className={`flex flex-col justify-between p-6 rounded-2xl glass transition-all duration-500 group cursor-default relative overflow-hidden ${service.glowColor}`}
              id={`service-card-${service.id}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial-[circle_at_top_right,rgba(108,99,255,0.02),transparent_60%] group-hover:bg-radial-[circle_at_top_right,rgba(108,99,255,0.08),transparent_60%] transition-colors duration-500" />

              <div>
                {/* Glowing Icon Frame */}
                <div className="w-12 h-12 rounded-xl bg-surface-dark/80 border border-border-dark flex items-center justify-center mb-6 text-text-luxury group-hover:text-[#00D1FF] group-hover:border-[#00D1FF]/40 group-hover:bg-[#00D1FF]/5 transition-all duration-300">
                  <IconComp className="w-6 h-6 stroke-[1.5]" />
                </div>

                <h3 className="text-xl font-display font-bold text-text-luxury mb-3 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-sm text-text-sub leading-relaxed mb-6 group-hover:text-text-luxury transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Tags Container */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-dark/60">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-text-sub/70 bg-surface-dark px-2.5 py-1 rounded-md border border-border-dark/30 group-hover:border-secondary-studio/25 group-hover:text-secondary-studio transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

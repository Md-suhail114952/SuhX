import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { AITool } from "../types";
import mdSuhailPortrait from "../assets/images/md_suhail_portrait_real.png.jpeg";
import { LusionTextReveal, LusionMagnetic } from "./LusionEffects";

const floatingBadges = [
  {
    name: "ChatGPT",
    icon: "MessageSquare",
    color: "border-[#10a37f]/30 text-[#10a37f]",
    glow: "bg-[#10a37f]/10",
    initialY: -6,
    duration: 3,
    delay: 0,
    style: { top: "4%", left: "4%" }
  },
  {
    name: "Gemini",
    icon: "Sparkles",
    color: "border-[#00D1FF]/30 text-[#00D1FF]",
    glow: "bg-[#00D1FF]/10",
    initialY: 6,
    duration: 3.4,
    delay: 0.3,
    style: { top: "4%", right: "4%" }
  },
  {
    name: "Claude",
    icon: "BrainCircuit",
    color: "border-[#d97706]/30 text-[#d97706]",
    glow: "bg-[#d97706]/10",
    initialY: -5,
    duration: 2.8,
    delay: 0.15,
    style: { top: "22%", left: "3%" }
  },
  {
    name: "Runway",
    icon: "Video",
    color: "border-[#ea580c]/30 text-[#ea580c]",
    glow: "bg-[#ea580c]/10",
    initialY: 5,
    duration: 3.2,
    delay: 0.5,
    style: { top: "22%", right: "3%" }
  },
  {
    name: "Flow",
    icon: "Workflow",
    color: "border-[#6C63FF]/30 text-[#6C63FF]",
    glow: "bg-[#6C63FF]/10",
    initialY: -7,
    duration: 3.6,
    delay: 0.25,
    style: { top: "42%", left: "3%" }
  },
  {
    name: "Lovable",
    icon: "Heart",
    color: "border-[#f43f5e]/30 text-[#f43f5e]",
    glow: "bg-[#f43f5e]/10",
    initialY: 7,
    duration: 3.1,
    delay: 0.45,
    style: { top: "42%", right: "3%" }
  },
  {
    name: "Leonardo AI",
    icon: "Palette",
    color: "border-[#06b6d4]/30 text-[#06b6d4]",
    glow: "bg-[#06b6d4]/10",
    initialY: -4,
    duration: 3.8,
    delay: 0.1,
    style: { top: "62%", left: "4%" }
  },
  {
    name: "Loveart",
    icon: "Flame",
    color: "border-[#ec4899]/30 text-[#ec4899]",
    glow: "bg-[#ec4899]/10",
    initialY: 4,
    duration: 2.9,
    delay: 0.6,
    style: { top: "62%", right: "4%" }
  }
];

export default function AboutPage() {
  const skills = [
    { name: "UI/UX & High-Fi Prototyping", percentage: 90, color: "bg-[#00D1FF]" },
    { name: "Graphic Composition & Layout Design", percentage: 85, color: "bg-[#6C63FF]" },
    { name: "AI Workflow Engineering (LLM/Diffusion)", percentage: 80, color: "bg-[#A855F7]" },
    { name: "Typography & Color Theory Matrix", percentage: 88, color: "bg-[#00D1FF]" },
    { name: "Motion & Branding Systems", percentage: 75, color: "bg-[#6C63FF]" },
  ];


  const aiTools: AITool[] = [
    {
      name: "ChatGPT",
      description: "Prompt optimization matrices, advanced copywriting structures, custom GPT code integrations",
      level: "Power User",
      category: "LLM",
      iconName: "MessageSquareText",
      color: "from-emerald-500/20 to-teal-500/10 hover:border-emerald-500/40 hover:shadow-emerald-500/10",
    },
    {
      name: "Midjourney",
      description: "Hyper-realistic conceptual assets, creative art directions, cinematic brand backgrounds",
      level: "Expert",
      category: "Generative Imagery",
      iconName: "Palette",
      color: "from-[#6C63FF]/30 to-purple-500/10 hover:border-[#6C63FF]/40 hover:shadow-[#6C63FF]/10",
    },
    {
      name: "Leonardo AI",
      description: "Stable Diffusion finetuning, custom image generations, canvas extensions",
      level: "Power User",
      category: "Generative Imagery",
      iconName: "Brush",
      color: "from-[#00D1FF]/30 to-blue-500/10 hover:border-[#00D1FF]/40 hover:shadow-[#00D1FF]/10",
    },
    {
      name: "Gemini",
      description: "Multi-modal model querying, real-time context feeding, app design assistant backend integration",
      level: "Certified",
      category: "LLM",
      iconName: "Hexagon",
      color: "from-[#A855F7]/30 to-pink-500/10 hover:border-[#A855F7]/40 hover:shadow-[#A855F7]/10",
    },
    {
      name: "Claude",
      description: "Systemic coding guides, user experience flow audits, programmatic UI architectures",
      level: "Power User",
      category: "LLM",
      iconName: "BrainCircuit",
      color: "from-amber-600/20 to-orange-500/10 hover:border-amber-500/40 hover:shadow-amber-500/10",
    },
    {
      name: "Copilot",
      description: "Vscode terminal enhancements, rapid software scripting, component testing",
      level: "Certified",
      category: "Automation",
      iconName: "Terminal",
      color: "from-blue-600/20 to-cyan-500/10 hover:border-blue-500/40 hover:shadow-blue-500/10",
    },
    {
      name: "Perplexity",
      description: "Accurate industrial statistics verification, design telemetry research, domain auditing",
      level: "Power User",
      category: "Automation",
      iconName: "Search",
      color: "from-cyan-600/20 to-teal-500/10 hover:border-cyan-500/40 hover:shadow-cyan-500/10",
    },
    {
      name: "ElevenLabs",
      description: "Dynamic audio narrations, vocal identity clone trainings, video voiceover synchronizing",
      level: "Expert",
      category: "Audio/Voice",
      iconName: "Volume2",
      color: "from-indigo-600/20 to-purple-500/10 hover:border-indigo-500/40 hover:shadow-indigo-500/10",
    },
  ];

  return (
    <div id="about" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-dark/40">
      
      {/* 1. Header Block */}
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-[#A855F7] bg-[#A855F7]/10 px-3 py-1.5 rounded-full inline-block">
          // The Creative Mind
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury mt-4">
          <LusionTextReveal text="Visual Architect & AI Generalist" />
        </h2>
        <p className="max-w-xl mx-auto text-sm text-text-sub mt-4">
          <LusionTextReveal text="Fusing high-end, elegant graphic layouts with state-of-the-art visual generative scripts to build intelligent identities." delay={0.2} />
        </p>
      </div>

      {/* 2. Top Profile Matrix: Image + Bio + Skill bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        
        {/* CEO Visual Frame - 5 cols */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-studio to-accent-studio rounded-3xl opacity-20 filter blur-xl group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="relative rounded-3xl overflow-hidden border border-border-dark glass-bright p-3">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900/40">
              <img
                src={mdSuhailPortrait}
                referrerPolicy="no-referrer"
                alt="MD Suhail Studio Portrait"
                className="w-full h-full object-cover grayscale-0 brightness-100 group-hover:scale-[1.03] transition-all duration-700 ease-in-out"
              />

              {/* Embedded Floating AI Tool Badges inside the frame so they don't cover text outside */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {floatingBadges.map((badge) => {
                  const BadgeIcon = (Icons as any)[badge.icon] || Icons.HelpCircle;
                  return (
                    <motion.div
                      key={badge.name}
                      className={`absolute pointer-events-auto px-3 py-1.5 md:px-3.5 md:py-2 rounded-xl md:rounded-2xl border glass flex items-center gap-2 backdrop-blur-md shadow-xl hover:scale-105 transition-all duration-300 pointer-events-auto select-none ${badge.color}`}
                      style={badge.style}
                      animate={{
                        y: [badge.initialY * 1.2, -badge.initialY * 1.2, badge.initialY * 1.2],
                      }}
                      transition={{
                        duration: badge.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: badge.delay,
                      }}
                    >
                      <div className={`p-1 rounded-lg ${badge.glow} text-current`}>
                        <BadgeIcon className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2]" />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold tracking-tight text-text-luxury font-mono">
                        {badge.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/60 to-transparent p-6 flex flex-col justify-end z-20">
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-luxury tracking-tight">
                  MD Suhail
                </h3>
                <span className="text-[10px] md:text-xs font-mono uppercase text-[#00D1FF] tracking-widest mt-1">
                  Founder & CEO, SUHX STUDIO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio text & progress controls - 7 cols */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF]">// Executive Bio</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-text-luxury mt-3 mb-4 leading-snug">
              <LusionTextReveal text="Designing Intelligent Digital Experiences" />
            </h3>
            <p className="text-sm text-text-sub leading-relaxed mb-6">
              Hello, I am <strong>MD Suhail (SUHX)</strong>. I operate at the absolute vanguard of visual communication. Fusing deep background classical drawing and modern vector symmetry rules with structural user psychology principles. 
            </p>
            <p className="text-sm text-text-sub leading-relaxed mb-8">
              My focus is delivering award-winning, high-conversion visual design languages for top scale-ups and corporate partners. As an elite Certified AI Generalist, I integrate custom image finetunes and advanced language processing interfaces directly into product designs, ensuring we stay 10 steps ahead.
            </p>
          </div>

          {/* Core Skill Bars */}
          <div className="space-y-5">
            <h4 className="text-xs font-mono tracking-widest text-text-sub uppercase">// Skill Synthesis</h4>
            {skills.map((skill, idx) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-text-sub">
                  <span>{skill.name}</span>
                  <span className="text-[#00D1FF]">{skill.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-dark/90 border border-border-dark/60 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full ${skill.color} shadow-[0_0_10px_rgba(0,209,255,0.3)]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AI TOOLS EXPERTISE (Requested futuristic layout cards) */}
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-0.5 bg-gradient-to-r from-primary-studio to-transparent" />
          <h3 className="text-xl md:text-2xl font-display font-bold text-text-luxury">
            Industrial <span className="text-gradient">AI Tools Expertise</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiTools.map((tool, idx) => {
            // Locate target Lucide icon with dynamic parsing
            let ToolIcon = (Icons as any)[tool.iconName] || Icons.Atom;

            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${tool.color} border border-border-dark/60 backdrop-blur-md transition-all duration-300 group cursor-default relative overflow-hidden`}
                id={`ai-tool-${tool.name.toLowerCase()}`}
              >
                {/* Micro tech metadata text */}
                <span className="absolute top-4 right-4 text-[9px] font-mono text-text-sub/40 group-hover:text-[#00D1FF]/60 transition-colors duration-300 uppercase">
                  {tool.category}
                </span>

                <div className="w-10 h-10 rounded-xl bg-surface-dark border border-border-dark/80 flex items-center justify-center mb-4 text-text-luxury group-hover:border-[#00D1FF]/40 group-hover:text-[#00D1FF] group-hover:bg-[#00D1FF]/10 transition-all duration-300">
                  <ToolIcon className="w-5 h-5 stroke-[1.5]" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-display font-extrabold text-[#F5F7FF] tracking-tight group-hover:text-[#00D1FF] transition-colors duration-200">
                    {tool.name}
                  </h4>
                  <span className="text-[10px] font-mono bg-surface-dark border border-border-dark/60 text-text-sub px-1.5 py-0.5 rounded">
                    {tool.level}
                  </span>
                </div>

                <p className="text-xs text-text-sub leading-relaxed group-hover:text-text-luxury transition-colors duration-300">
                  {tool.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>



      {/* 5. Additional CV Meta: Grid containing Academic & Key achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-24">
        
        {/* Education & Certs */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#00D1FF] to-transparent" />
            <h3 className="text-xl md:text-2xl font-display font-medium text-text-luxury">
              Education & <span className="text-gradient font-bold">Credentials</span>
            </h3>
          </div>

          {/* Academic Card */}
          <div className="p-6 rounded-2xl bg-surface-dark/45 border border-border-dark/60 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00D1FF] opacity-70" />
            <span className="text-xs font-mono text-[#00D1FF]/90 block mb-2">2019 – 2022</span>
            <h4 className="text-lg font-display font-bold text-text-luxury">Bachelor of Arts</h4>
            <p className="text-sm text-text-sub font-medium">Jamia Millia Islamia, New Delhi</p>
          </div>

          {/* Certifications Array */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-text-sub uppercase mb-3">// Certified Accreditations</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "UI/UX Design Professional", issuer: "Tutedude" },
                { name: "UI/UX Design Certification", issuer: "Alison" },
                { name: "UX Design Overview", issuer: "LinkedIn Learning" },
                { name: "Essential InDesign Skills", issuer: "Adobe" },
                { name: "What Is Generative AI", issuer: "LinkedIn Learning" },
                { name: "Interactive Design Bootcamp", issuer: "Masai" },
              ].map((cert) => (
                <div key={cert.name} className="p-4 rounded-xl bg-surface-dark/30 border border-border-dark/40 hover:border-border-dark flex flex-col justify-center transition-colors">
                  <span className="text-xs font-medium text-text-luxury">{cert.name}</span>
                  <span className="text-[10px] font-mono text-text-sub/70 mt-1">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Achievements & Clients */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#6C63FF] to-transparent" />
            <h3 className="text-xl md:text-2xl font-display font-medium text-text-luxury">
              Performance <span className="text-gradient-purple font-bold">Milestones</span>
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-surface-dark/45 border border-border-dark/60 relative overflow-hidden space-y-5">
            {[
              {
                title: "50+ End-to-End Visual Deployments",
                desc: "Successfully conceptualized and executed high-end UI/UX and branding modules across healthcare, industrial e-commerce, and enterprise suites."
              },
              {
                title: "+35% Average CTR & Conversion Uplift",
                desc: "Re-engineered complex product cards and storefront typography using grid alignment matrices to significantly bolster user actions."
              },
              {
                title: "Scalable Design Governance",
                desc: "Constructed comprehensive multi-tier asset engines and structured components libraries, pruning dev handover loops by 30%."
              }
            ].map((ach, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-[#6C63FF]/45 hover:border-[#6C63FF] transition-colors">
                <h5 className="text-sm font-bold text-text-luxury">{ach.title}</h5>
                <p className="text-xs text-text-sub mt-1 leading-relaxed">{ach.desc}</p>
              </div>
            ))}
          </div>

          {/* Premium Enterprise Partners */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#00D1FF] uppercase mb-3">// Legacy Client Partners</h4>
            <div className="flex flex-wrap gap-2">
              {["AIIMS", "Byju's", "Hotel Pride Plaza", "Hotel Radisson", "JoVe", "Narayana"].map((client) => (
                <span 
                  key={client} 
                  className="px-4 py-2 rounded-lg bg-surface-dark/75 border border-border-dark/50 text-xs font-semibold text-text-luxury shadow-sm shadow-black/10 hover:border-[#00D1FF]/40 transition-colors cursor-default"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

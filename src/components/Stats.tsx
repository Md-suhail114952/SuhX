import { motion } from "motion/react";
import { Award, Briefcase, HeartHandshake } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      id: "s1",
      value: "20+",
      label: "Years Experience",
      sub: "Active brand consulting & creative design leadership",
      icon: <Award className="w-6 h-6 text-[#89AACC]" />
    },
    {
      id: "s2",
      value: "95+",
      label: "Projects Done",
      sub: "E-commerce assets, high-conversion branding systems",
      icon: <Briefcase className="w-6 h-6 text-[#4E85BF]" />
    },
    {
      id: "s3",
      value: "200%",
      label: "Satisfied Clients",
      sub: "Maximum conversion results & aesthetic retention",
      icon: <HeartHandshake className="w-6 h-6 text-[#89AACC]" />
    }
  ];

  return (
    <section className="bg-bg py-16 md:py-24 border-b border-stroke/30 select-none overflow-hidden relative">
      {/* Background soft glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#4E85BF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="group p-8 md:p-10 bg-surface border border-stroke rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-white/15"
            >
              {/* Top Row: Icon and category */}
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-bg border border-stroke rounded-2xl group-hover:bg-stroke/40 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-[9px] font-mono tracking-widest text-muted uppercase">
                  Telemetry // 0{idx + 1}
                </span>
              </div>

              {/* Large Stats Display */}
              <div className="space-y-2">
                <div className="text-5xl md:text-6xl font-display italic text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:accent-gradient transition-all duration-500 bg-[length:200%_200%] bg-left leading-none">
                  {stat.value}
                </div>
                
                <h3 className="text-sm md:text-base font-sans font-semibold text-text-primary tracking-tight">
                  {stat.label}
                </h3>
                
                <p className="text-xs text-muted leading-relaxed font-light">
                  {stat.sub}
                </p>
              </div>

              {/* Little absolute bar for active accent visual */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:accent-gradient transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

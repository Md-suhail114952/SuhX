import { motion } from "motion/react";
import { ArrowUpRight, BookOpen } from "lucide-react";

interface JournalEntry {
  id: string;
  number: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export default function Journal() {
  const entries: JournalEntry[] = [
    {
      id: "j1",
      number: "01",
      title: "Designing for High-Impact Conversion in E-Commerce Listings",
      category: "Infographics",
      readTime: "6 min read",
      date: "Jun 14, 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "j2",
      number: "02",
      title: "The Golden Ratio: Merging Human Aesthetics with Generative Art",
      category: "AI Design",
      readTime: "4 min read",
      date: "May 28, 2026",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "j3",
      number: "03",
      title: "Structuring Premium Brand Manuals for Enterprise Scale",
      category: "Branding",
      readTime: "8 min read",
      date: "May 10, 2026",
      image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "j4",
      number: "04",
      title: "Why Minimal layouts with Rich Contrast rule Modern Web Designs",
      category: "UI/UX Strategy",
      readTime: "5 min read",
      date: "Apr 22, 2026",
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=120&q=80"
    }
  ];

  return (
    <section id="journal" className="bg-bg py-20 border-b border-stroke/30 select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Same header pattern as Selected Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">Journal Insights</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-text-primary mb-4 leading-none">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            
            <p className="text-sm md:text-base text-muted max-w-md font-light leading-relaxed">
              Explorations, design guidelines, and tactical guides regarding aesthetics, conversion, and generative systems.
            </p>
          </div>

          {/* Desktop Only View All Button */}
          <div className="hidden md:block">
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-2 rounded-full text-xs font-mono tracking-tight uppercase px-5 py-3 border border-stroke bg-bg/40 text-text-primary cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full bg-transparent group-hover:accent-gradient -z-20 p-[1.5px]" />
              <span className="absolute inset-[1px] rounded-full bg-bg -z-10 group-hover:bg-surface transition-all duration-300" />
              <span>READ ALL ENTRIES</span>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-text-primary group-hover:rotate-45 transition-all duration-300" />
            </button>
          </div>
        </motion.div>

        {/* 4 Journal entries displayed as horizontal pills */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 bg-surface/30 hover:bg-surface/90 border border-stroke rounded-[40px] sm:rounded-full transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
                {/* Index / Image combo */}
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted group-hover:text-text-primary transition-colors hidden sm:inline">
                    {entry.number}
                  </span>
                  
                  {/* Circular Journal Icon image */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-stroke shrink-0 relative">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Info and Title */}
                <div className="text-center sm:text-left flex flex-col gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-muted group-hover:text-[#4E85BF] transition-colors">
                    Category // {entry.category}
                  </span>
                  <h3 className="text-sm md:text-base font-sans font-medium text-text-primary group-hover:text-text-primary transition-colors line-clamp-1 max-w-lg md:max-w-xl">
                    {entry.title}
                  </h3>
                </div>
              </div>

              {/* Read time, Date, and Go Indicator */}
              <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto border-t border-stroke/30 pt-3 sm:pt-0 sm:border-0 font-mono text-xs text-muted">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-muted/60" />
                  <span>{entry.readTime}</span>
                </div>
                
                <span className="hidden md:inline text-stroke/100">•</span>
                
                <span className="hidden md:inline">{entry.date}</span>

                {/* Arrow slide indicator */}
                <div className="w-8 h-8 rounded-full bg-stroke/50 group-hover:bg-text-primary group-hover:text-bg flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-bg transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

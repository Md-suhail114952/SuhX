import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("UI/UX Design");
  const [budget, setBudget] = useState("9999");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const projectTypes = ["UI/UX Design", "Website Design", "Mobile App", "Branding Mark", "AI Strategy", "Motion Work"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please complete all structural validation parameters (Name, Email, and Message).");
      return;
    }

    setSubmitting(true);

    // Simulate cyber-mainframe transit
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setProjectType("UI/UX Design");
    setBudget("9999");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-border-dark/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact info column - 5 cols */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full inline-block mb-4">
              // Neural Link
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-luxury">
              Let's craft the <br />
              <span className="text-gradient font-bold">Unimaginable</span>
            </h2>
            <p className="text-sm text-text-sub leading-relaxed my-6 max-w-md">
              Whether you are an established enterprise scaling high-end SaaS models or a stealth venture, our creative-tech studio can build your signature aesthetic.
            </p>

            <div className="space-y-6 mt-10">
              {/* Phone item */}
              <a 
                href="tel:7065927198"
                className="flex items-center gap-4 p-4 rounded-2xl bg-surface-dark/40 border border-border-dark/60 hover:border-secondary-studio/40 hover:bg-[#00D1FF]/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-dark/90 border border-border-dark flex items-center justify-center text-[#00D1FF] group-hover:bg-[#00D1FF]/10 transition-colors">
                  <Phone className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-text-sub uppercase">// Mainline Voice</p>
                  <p className="text-sm font-semibold text-text-luxury group-hover:text-[#00D1FF] transition-colors">+91 7065927198</p>
                </div>
              </a>

              {/* Email item */}
              <a 
                href="mailto:mohd.suhail114952@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-surface-dark/40 border border-border-dark/60 hover:border-primary-studio/40 hover:bg-[#6C63FF]/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-dark/90 border border-border-dark flex items-center justify-center text-[#6C63FF] group-hover:bg-[#6C63FF]/10 transition-colors">
                  <Mail className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-mono text-text-sub uppercase">// Studio Mailbox</p>
                  <p className="text-sm font-semibold text-text-luxury group-hover:text-[#6C63FF] transition-colors truncate">mohd.suhail114952@gmail.com</p>
                </div>
              </a>

              {/* Address / Location item */}
              <div 
                className="flex items-center gap-4 p-4 rounded-2xl bg-surface-dark/40 border border-border-dark/60 hover:border-accent-studio/40 hover:bg-[#A855F7]/5 transition-all duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-dark/90 border border-border-dark flex items-center justify-center text-[#A855F7] group-hover:bg-[#A855F7]/10 transition-colors">
                  <MapPin className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-text-sub uppercase">// Location Base</p>
                  <p className="text-sm font-semibold text-text-luxury">New Delhi, India (International Relay)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block pt-12 text-xs font-mono text-text-sub/40">
            SUHX. STUDIO // ALL RIGHTS RESERVED CO-2026<br />
            SECURED TRIPLE LAYER GLASSMORPH CANVASES
          </div>
        </div>

        {/* Contact Form Column - 7 cols */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass p-8 md:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(0,209,255,0.05)]">
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquareCode className="w-5 h-5 text-[#00D1FF]" />
                    <h3 className="text-xl font-display font-bold text-text-luxury">
                      Configure Project Parameters
                    </h3>
                  </div>

                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-sub uppercase tracking-wider block">
                      // Partner Identification Name
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aris Thorne"
                      className="w-full px-4 py-3.5 bg-[#070B14] border border-border-dark rounded-xl text-sm text-text-luxury placeholder-text-sub/45 focus:outline-none focus:border-[#00D1FF] focus:shadow-[0_0_15px_rgba(0,209,255,0.1)] transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-sub uppercase tracking-wider block">
                      // Correspondence Mailbox Address
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aris@synthai.systems"
                      className="w-full px-4 py-3.5 bg-[#070B14] border border-border-dark rounded-xl text-sm text-text-luxury placeholder-text-sub/45 focus:outline-none focus:border-[#00D1FF] focus:shadow-[0_0_15px_rgba(0,209,255,0.1)] transition-all"
                    />
                  </div>

                  {/* Project Type selection tags */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-sub uppercase tracking-wider block">
                      // Target Project Modality
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`py-2 p-1 text-[11px] font-mono rounded-lg border transition-all duration-300 text-center cursor-pointer ${
                            projectType === type
                              ? "bg-[#6C63FF]/15 text-text-luxury border-[#6C63FF] shadow-[0_0_10px_rgba(108,99,255,0.15)]"
                              : "bg-[#070B14] border-border-dark text-text-sub hover:border-text-sub/40 hover:text-text-luxury"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget scale slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-text-sub">
                      <span>// Projected Investment Boundary</span>
                      <span className="text-[#00D1FF] font-semibold">₹{Number(budget).toLocaleString()}/- only</span>
                    </div>
                    <input
                      type="range"
                      min="9999"
                      max="150000"
                      step="5000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full h-1 bg-border-dark rounded-lg appearance-none cursor-pointer accent-[#00D1FF]"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-text-sub/50">
                      <span>Starting From ₹9,999/- only</span>
                      <span>₹75,000 (SaaS Core)</span>
                      <span>₹1,50,000+ (Enterprise Pack)</span>
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-sub uppercase tracking-wider block">
                      // Design Parameters & Mission Objectives
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Briefly state your core project requirements, target outcomes, or workflow pipelines..."
                      className="w-full px-4 py-3 bg-[#070B14] border border-border-dark rounded-xl text-sm text-text-luxury placeholder-text-sub/45 focus:outline-none focus:border-[#6C63FF] focus:shadow-[0_0_15px_rgba(108,99,255,0.1)] transition-all resize-none"
                    />
                  </div>

                  {/* Submission triggers */}
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="pill-glow-button px-10 py-3.5 text-center font-semibold"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>{submitting ? "Initiating Transmission..." : "Let’s Build Something Exceptional"}</span>
                        <Send className={`w-4 h-4 ${submitting ? "animate-pulse" : ""}`} />
                      </span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-emerald-400 p-1 px-3 bg-emerald-500/10 rounded-full">
                      // Transmission Connected
                    </span>
                    <h3 className="text-2xl font-display font-medium text-text-luxury">
                      Message Mainframe Ingested
                    </h3>
                    <p className="text-sm text-text-sub max-w-md mx-auto leading-relaxed">
                      Suhail's automated digital core has routed your brief correctly. We will establish direct visual proxy transmission within 12 standard solar hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-dark border border-border-dark inline-block text-left text-xs font-mono text-text-sub space-y-1.5 shadow-md">
                    <p><strong>Partner:</strong> {name}</p>
                    <p><strong>Domain:</strong> {projectType}</p>
                    <p><strong>Boundary:</strong> ₹{Number(budget).toLocaleString()}/- only</p>
                  </div>

                  <div>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl border border-border-dark text-xs font-mono text-text-sub hover:text-text-luxury hover:border-[#00D1FF]/40 cursor-pointer transition-colors"
                    >
                      Reset Project Form
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}

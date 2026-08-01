import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle, Sparkles, X } from "lucide-react";

interface ContactFormProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ContactForm({ isOpen = true, onClose }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("UI/UX Design");
  const [budget, setBudget] = useState("9999");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const projectTypes = ["UI/UX Design", "Website Design", "Mobile App", "Branding Mark", "AI Strategy", "Motion Work"];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please complete all required fields (Name, Email, and Message).");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        
        {/* Backdrop click listener */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-5xl my-auto bg-[#070B14] border border-border-dark/80 rounded-3xl p-6 md:p-10 shadow-[0_0_60px_rgba(0,209,255,0.15)] overflow-hidden text-text-primary"
        >
          {/* Top-Right Cut (X) Close Sign */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-surface-dark/90 border border-border-dark flex items-center justify-center text-text-sub hover:text-white hover:border-[#00D1FF] hover:bg-[#00D1FF]/10 transition-all cursor-pointer shadow-lg"
              aria-label="Close Contact Modal"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact info column - 5 cols */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] bg-[#00D1FF]/10 px-3 py-1.5 rounded-full inline-block mb-4">
                  // Direct Connect
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-text-luxury">
                  Let's craft the <br />
                  <span className="text-gradient font-bold">Unimaginable</span>
                </h2>
                <p className="text-xs md:text-sm text-text-sub leading-relaxed my-5 max-w-md">
                  Whether you are scaling high-end SaaS models or starting a new digital product, our creative studio will build your vision.
                </p>

                <div className="space-y-4 mt-6">
                  {/* Phone item */}
                  <a 
                    href="tel:7065927198"
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-surface-dark/40 border border-border-dark/60 hover:border-secondary-studio/40 hover:bg-[#00D1FF]/5 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-surface-dark/90 border border-border-dark flex items-center justify-center text-[#00D1FF] group-hover:bg-[#00D1FF]/10 transition-colors">
                      <Phone className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-text-sub uppercase">// Mainline Voice</p>
                      <p className="text-xs font-semibold text-text-luxury group-hover:text-[#00D1FF] transition-colors">+91 7065927198</p>
                    </div>
                  </a>

                  {/* Email item */}
                  <a 
                    href="mailto:mohd.suhail114952@gmail.com"
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-surface-dark/40 border border-border-dark/60 hover:border-primary-studio/40 hover:bg-[#6C63FF]/5 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-surface-dark/90 border border-border-dark flex items-center justify-center text-[#6C63FF] group-hover:bg-[#6C63FF]/10 transition-colors">
                      <Mail className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono text-text-sub uppercase">// Studio Mailbox</p>
                      <p className="text-xs font-semibold text-text-luxury group-hover:text-[#6C63FF] transition-colors truncate">mohd.suhail114952@gmail.com</p>
                    </div>
                  </a>

                  {/* Address / Location item */}
                  <div 
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-surface-dark/40 border border-border-dark/60 hover:border-accent-studio/40 hover:bg-[#A855F7]/5 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-surface-dark/90 border border-border-dark flex items-center justify-center text-[#A855F7] group-hover:bg-[#A855F7]/10 transition-colors">
                      <MapPin className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-text-sub uppercase">// Location Base</p>
                      <p className="text-xs font-semibold text-text-luxury">New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block pt-6 text-[11px] font-mono text-text-sub/40">
                SUHX. STUDIO // ALL RIGHTS RESERVED 2026
              </div>
            </div>

            {/* Contact Form Column - 7 cols */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-surface-dark/60 border border-border-dark/60 p-6 md:p-8 relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquareCode className="w-5 h-5 text-[#00D1FF]" />
                        <h3 className="text-lg font-display font-bold text-text-luxury">
                          Configure Project Parameters
                        </h3>
                      </div>

                      {/* Name field */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-text-sub uppercase tracking-wider block">
                          // Partner Identification Name
                        </label>
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Aris Thorne"
                          className="w-full px-4 py-2.5 bg-[#070B14] border border-border-dark rounded-xl text-xs text-text-luxury placeholder-text-sub/45 focus:outline-none focus:border-[#00D1FF] transition-all"
                        />
                      </div>

                      {/* Email field */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-text-sub uppercase tracking-wider block">
                          // Correspondence Mailbox Address
                        </label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. aris@synthai.systems"
                          className="w-full px-4 py-2.5 bg-[#070B14] border border-border-dark rounded-xl text-xs text-text-luxury placeholder-text-sub/45 focus:outline-none focus:border-[#00D1FF] transition-all"
                        />
                      </div>

                      {/* Project Type selection tags */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-text-sub uppercase tracking-wider block">
                          // Target Project Modality
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {projectTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setProjectType(type)}
                              className={`py-1.5 px-2 text-[10px] font-mono rounded-lg border transition-all duration-300 text-center cursor-pointer ${
                                projectType === type
                                  ? "bg-[#6C63FF]/20 text-white border-[#6C63FF] font-semibold"
                                  : "bg-[#070B14] border-border-dark text-text-sub hover:border-text-sub/40 hover:text-white"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Budget scale slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-text-sub">
                          <span>// Projected Investment</span>
                          <span className="text-[#00D1FF] font-semibold">₹{Number(budget).toLocaleString()}/-</span>
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
                      </div>

                      {/* Message field */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-text-sub uppercase tracking-wider block">
                          // Design Parameters & Mission Objectives
                        </label>
                        <textarea
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          placeholder="Briefly state your core project requirements..."
                          className="w-full px-4 py-2 bg-[#070B14] border border-border-dark rounded-xl text-xs text-text-luxury placeholder-text-sub/45 focus:outline-none focus:border-[#6C63FF] transition-all resize-none"
                        />
                      </div>

                      {/* Submission triggers */}
                      <div className="flex justify-center pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-white font-semibold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_0_20px_rgba(108,99,255,0.3)] flex items-center justify-center gap-2"
                        >
                          <span>{submitting ? "Submitting..." : "Send Request & Continue"}</span>
                          <Send className={`w-3.5 h-3.5 ${submitting ? "animate-pulse" : ""}`} />
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="contact-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-8 text-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                        <CheckCircle className="w-6 h-6 animate-bounce" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 p-1 px-3 bg-emerald-500/10 rounded-full">
                          // Received Successfully
                        </span>
                        <h3 className="text-xl font-display font-medium text-text-luxury">
                          Thank You for Reaching Out!
                        </h3>
                        <p className="text-xs text-text-sub max-w-sm mx-auto leading-relaxed">
                          Your details have been registered. Suhail will contact you within 12 hours. You can now explore the rest of the site!
                        </p>
                      </div>

                      <div className="flex gap-3 justify-center pt-2">
                        <button
                          onClick={onClose}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-white font-semibold text-xs hover:brightness-110 cursor-pointer shadow-md"
                        >
                          Explore Website
                        </button>
                        <button
                          onClick={handleReset}
                          className="px-4 py-2.5 rounded-xl border border-border-dark text-xs font-mono text-text-sub hover:text-white hover:border-[#00D1FF]/40 cursor-pointer transition-colors"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

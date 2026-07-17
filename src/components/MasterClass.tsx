import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as LucideIcons from "lucide-react";
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  CheckCircle, 
  CreditCard, 
  ArrowRight, 
  User, 
  Mail, 
  QrCode, 
  Award, 
  BookOpen, 
  Smartphone, 
  ShieldCheck, 
  Ticket,
  ChevronRight,
  MonitorPlay,
  Zap,
  Lock,
  Figma,
  Palette,
  Video,
  Presentation,
  ShoppingBag,
  Sparkle
} from "lucide-react";
import mdSuhailPortrait from "../assets/images/md_suhail_portrait_real.png.jpeg";

// Beautiful interactive vector tool icons styled with specific branding colors to float around his portrait
const floatingInteractiveIcons = [
  {
    name: "Figma",
    icon: "Figma",
    color: "border-[#f24e1e]/40 text-[#f24e1e] bg-[#f24e1e]/10 shadow-[0_0_15px_rgba(242,78,30,0.2)]",
    yRange: -12,
    duration: 3.4,
    delay: 0,
    style: { top: "4%", left: "-6%" }
  },
  {
    name: "Illustrator & Branding",
    icon: "Palette",
    color: "border-[#ff9a00]/40 text-[#ff9a00] bg-[#ff9a00]/10 shadow-[0_0_15px_rgba(255,154,0,0.2)]",
    yRange: 10,
    duration: 3.8,
    delay: 0.3,
    style: { top: "18%", right: "-6%" }
  },
  {
    name: "After Effects & Motion",
    icon: "Video",
    color: "border-[#9900ff]/40 text-[#9900ff] bg-[#9900ff]/10 shadow-[0_0_15px_rgba(153,0,255,0.2)]",
    yRange: -15,
    duration: 4.2,
    delay: 0.6,
    style: { bottom: "22%", left: "-10%" }
  },
  {
    name: "PowerPoint & Presentations",
    icon: "Presentation",
    color: "border-[#d83b01]/40 text-[#d83b01] bg-[#d83b01]/10 shadow-[0_0_15px_rgba(216,59,1,0.2)]",
    yRange: 12,
    duration: 3.6,
    delay: 0.15,
    style: { top: "42%", right: "-8%" }
  },
  {
    name: "AI & Midjourney",
    icon: "Sparkle",
    color: "border-[#00D1FF]/40 text-[#00D1FF] bg-[#00D1FF]/10 shadow-[0_0_15px_rgba(0,209,255,0.2)]",
    yRange: -9,
    duration: 2.9,
    delay: 0.45,
    style: { top: "45%", left: "-9%" }
  },
  {
    name: "Amazon Listings",
    icon: "ShoppingBag",
    color: "border-[#ff9900]/40 text-[#ff9900] bg-[#ff9900]/10 shadow-[0_0_15px_rgba(255,153,0,0.2)]",
    yRange: 8,
    duration: 3.1,
    delay: 0.7,
    style: { bottom: "6%", right: "-4%" }
  }
];

export default function MasterClass() {
  const [selectedAudience, setSelectedAudience] = useState<"student" | "business-owner">("student");
  const [bookingStep, setBookingStep] = useState<"idle" | "details" | "payment" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    slot: "Saturday 4:00 PM - 6:00 PM (IST)",
  });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "paypal">("upi");
  
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    holder: ""
  });

  const handleRegisterClick = () => {
    setBookingStep("details");
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setBookingStep("payment");
    }
  };

  const handlePaymentSubmit = () => {
    setBookingStep("success");
  };

  const resetBooking = () => {
    setBookingStep("idle");
    setFormData({
      name: "",
      email: "",
      slot: "Saturday 4:00 PM - 6:00 PM (IST)",
    });
    setCardDetails({
      number: "",
      expiry: "",
      cvv: "",
      holder: ""
    });
  };

  return (
    <section id="masterclass" className="py-24 relative overflow-hidden z-10 px-6 max-w-7xl mx-auto">
      {/* Background Orbits & Glimmer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-radial from-[#6c63ff0a] via-transparent to-transparent blur-3xl pointer-events-none" />
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[11px] font-mono mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-secondary-studio animate-pulse" />
          <span>UPGRADE YOUR SKILLSET // ALL-IN-ONE CREATIVE INTENSIVE</span>
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-text-luxury">
          All-In-One Creative <span className="text-gradient font-extrabold">Masterclass</span>
        </h2>
        
        <p className="text-sm md:text-base text-text-sub mt-4 max-w-2xl mx-auto leading-relaxed">
          Unlock the end-to-end framework of elite <strong className="text-text-luxury font-semibold">UI/UX Design, high-impact Branding Identity, corporate Presentation Decks (PPTs/Amazon Listings), and professional Motion Video editing</strong>. Learn to run unified AI-powered pipelines in an action-packed 2-hour weekend workshop.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Image & Quick Facts (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative">
            {/* Outer custom geometric colored lines */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#6C63FF] via-[#A855F7] to-[#00D1FF] opacity-35 blur-md" />
            
            {/* Main Portrait Frame with Shape Styling */}
            <div className="relative w-[340px] h-[400px] md:w-[380px] md:h-[450px] rounded-[24px] overflow-visible bg-surface-dark/95 border border-border-dark flex items-center justify-center p-2">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900/40">
                <img 
                  src={mdSuhailPortrait} 
                  alt="Mohd Suhail - CEO Creative Director portrait"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                />
                
                {/* Premium overlay metrics inside portrait */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#070B14]/90 border border-border-dark/65 backdrop-blur-md">
                  <div className="flex justify-between items-center text-[10px] font-mono text-text-sub">
                    <span>FACILITATOR</span>
                    <span className="text-secondary-studio font-bold">LIVE WORKSHOP</span>
                  </div>
                  <h4 className="text-sm font-bold text-text-luxury mt-1 font-display">Mohd Suhail</h4>
                  <p className="text-[10px] text-[#00D1FF] font-mono mt-0.5">Founder & Creative Director // SUHX Group</p>
                </div>
              </div>

              {/* Floating Real Tool Badges with ZERO Text - strictly elegant circular icon buttons */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {floatingInteractiveIcons.map((badge) => {
                  const IconComp = (LucideIcons as any)[badge.icon] || LucideIcons.Sparkles;
                  return (
                    <motion.div
                      key={badge.name}
                      className={`absolute pointer-events-auto p-3.5 rounded-full border flex items-center justify-center backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-115 cursor-help ${badge.color}`}
                      style={badge.style}
                      title={badge.name}
                      animate={{
                        y: [badge.yRange, -badge.yRange, badge.yRange],
                      }}
                      transition={{
                        duration: badge.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: badge.delay,
                      }}
                    >
                      <IconComp className="w-5 h-5 filter drop-shadow-[0_0_8px_currentColor]" />
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Quick Stats Grid under Portrait */}
          <div className="w-full max-w-[380px] mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-surface-dark border border-border-dark/40 text-center">
              <div className="text-2xl font-display font-bold text-secondary-studio">2 Hours</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-text-sub mt-1">Live Coding & Design</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface-dark border border-border-dark/40 text-center">
              <div className="text-2xl font-display font-bold text-[#A855F7]">₹499 Only</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-text-sub mt-1">Limited Seat Entry</div>
            </div>
          </div>
        </div>

        {/* Right Column - Curriculum & Interactive Booking (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Audience Tabs Toggle */}
          <div className="flex p-1 rounded-xl bg-surface-dark border border-border-dark/65 max-w-sm mb-8 select-none">
            <button
              onClick={() => setSelectedAudience("student")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold font-sans tracking-wide transition-all ${
                selectedAudience === "student"
                  ? "bg-gradient-to-r from-[#6C63FF] to-[#A855F7] text-text-luxury shadow-md"
                  : "text-text-sub hover:text-text-luxury"
              }`}
            >
              For Students & Designers
            </button>
            <button
              onClick={() => setSelectedAudience("business-owner")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold font-sans tracking-wide transition-all ${
                selectedAudience === "business-owner"
                  ? "bg-gradient-to-r from-[#A855F7] to-[#00D1FF] text-text-luxury shadow-md"
                  : "text-text-sub hover:text-text-luxury"
              }`}
            >
              For Business Owners
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAudience}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {selectedAudience === "student" ? (
                <div>
                  <h3 className="text-xl font-display font-bold text-text-luxury flex items-center gap-2">
                    <MonitorPlay className="w-5 h-5 text-secondary-studio" />
                    Complete Creative Stack Workshop
                  </h3>
                  <p className="text-xs text-text-sub mt-2 leading-relaxed">
                    Don't just specialize in one tiny niche. Become an indispensable visual architect by mastering the full cycle of user interfaces, strong corporate brand guidelines, highly converting Amazon layouts, and motion creatives.
                  </p>
                  
                  <ul className="mt-5 space-y-3.5">
                    {[
                      "UI/UX Systems & High-Fi Prototyping: Build layouts that look spectacular on Figma",
                      "Brand Marks & PPT presentation design: Formulate beautiful corporate pitch decks",
                      "E-Commerce Listings & Infographics structure: Convert viewers to high-paying customers",
                      "Motion & Promos: Learn custom motion workflows, video templates & Lottie file triggers",
                      "Generative Multi-tooling: Maximize output using Midjourney vectors, Lovable, & prompt scripts"
                    ].map((item, index) => (
                      <li key={index} className="flex gap-3 items-start text-xs text-text-luxury/95">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-display font-bold text-[#00D1FF] flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#00D1FF]" />
                    Dynamic Revenue Curation Playbook
                  </h3>
                  <p className="text-xs text-text-sub mt-2 leading-relaxed">
                    Eliminate expensive external agencies. In 2 hours, learn how our teams orchestrate premium presentations, social post layouts, Amazon Infographics, and video commercials at zero operational overhead.
                  </p>
                  
                  <ul className="mt-5 space-y-3.5">
                    {[
                      "Expressive Branding & Color Systems: Establish a recognizable product footprint in minutes",
                      "Persuasive Amazon Listings & Deck Optimization: Present features to convert instantly",
                      "Kinetic Promos & reels: Edit high-fidelity sound-integrated videos without professional tools",
                      "Automate & Prosper: Control AI systems to auto-translate and customize creatives globally"
                    ].map((item, index) => (
                      <li key={index} className="flex gap-3 items-start text-xs text-text-luxury/95">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Interactive Scheduling and Dynamic Call Out */}
          <div className="mt-8 p-5 rounded-2xl bg-[#101826]/70 border border-border-dark/65 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-text-luxury text-sm font-semibold">
                <Calendar className="w-4 h-4 text-primary-studio" />
                <span>Upcoming Weekend Batches (Sat & Sun)</span>
              </div>
              <p className="text-[11px] text-text-sub mt-1 font-mono">
                Hands-on Workshop // Interactive live building & templates provided
              </p>
            </div>
            
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono text-emerald-400 py-1 px-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                12 SEATS REMAINING
              </span>
            </div>
          </div>

          {/* Core Interactive Registration Interface */}
          <div className="mt-8">
            {bookingStep === "idle" && (
              <button
                onClick={handleRegisterClick}
                className="pill-glow-button w-full sm:w-auto font-bold text-sm tracking-wide"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Register for Masterclass — ₹499 Only</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            )}

            {/* Step 1: Ingest Form Modal/Expand */}
            {bookingStep === "details" && (
              <motion.form
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleDetailsSubmit}
                className="p-6 rounded-2xl bg-surface-dark border border-purple-500/30 space-y-4 shadow-xl"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-display font-semibold text-text-luxury uppercase tracking-wider">
                    Step 1: Contact Information
                  </h4>
                  <button type="button" onClick={resetBooking} className="text-xs text-text-sub hover:text-text-luxury">
                    Cancel
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-text-sub">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/40" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe" 
                        className="w-full text-xs py-3 pl-10 pr-4 bg-[#070B14] border border-border-dark/65 rounded-xl text-text-luxury focus:outline-none focus:border-[#6C63FF]/60 placeholder:text-text-sub/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-text-sub">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/40" />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="johndoe@example.com" 
                        className="w-full text-xs py-3 pl-10 pr-4 bg-[#070B14] border border-border-dark/65 rounded-xl text-text-luxury focus:outline-none focus:border-[#6C63FF]/60 placeholder:text-text-sub/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-text-sub">Choose Live Slot</label>
                  <select 
                    value={formData.slot}
                    onChange={(e) => setFormData(prev => ({ ...prev, slot: e.target.value }))}
                    className="w-full text-xs py-3 px-4 bg-[#070B14] border border-border-dark/65 rounded-xl text-text-luxury focus:outline-none focus:border-[#6C63FF]/60"
                  >
                    <option value="Saturday 4:00 PM - 6:00 PM (IST)">Saturday Batch (4:00 PM - 6:00 PM IST)</option>
                    <option value="Sunday 11:00 AM - 1:00 PM (IST)">Sunday Batch (11:00 AM - 1:00 PM IST)</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetBooking}
                    className="py-3 px-5 rounded-xl bg-[#070B14] border border-border-dark text-xs text-text-luxury hover:bg-surface-dark"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="pill-glow-button py-2 px-5 text-xs font-bold"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 2: Custom Immersive Mock Checkout (UPI, Cards, Paypal) */}
            {bookingStep === "payment" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-surface-dark border border-secondary-studio/30 shadow-xl space-y-5"
              >
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="text-[10px] font-mono text-secondary-studio tracking-widest uppercase">// INVOICE SECURE GATEWAY</span>
                    <h4 className="text-sm font-display font-semibold text-text-luxury mt-0.5">
                      Secure Workshop Pass
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-text-sub block">AMOUNT DUE</span>
                    <span className="text-lg font-bold text-text-luxury">₹499.00</span>
                  </div>
                </div>

                {/* Styled Payment Methods Switcher */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI (PhonePe, GPay)", icon: Smartphone },
                    { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                    { id: "paypal", label: "PayPal Express", icon: ShieldCheck }
                  ].map((method) => {
                    const IconComp = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all cursor-pointer ${
                          paymentMethod === method.id
                            ? "border-secondary-studio/50 bg-[#00D1FF]/5 text-text-luxury"
                            : "border-border-dark/60 bg-[#070B14]/60 text-text-sub hover:text-text-luxury hover:border-border-dark"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span className="text-[10px] font-medium leading-none">{method.id.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-panels matching selected method */}
                <div className="p-4 rounded-xl bg-[#070B14] border border-border-dark/50">
                  {paymentMethod === "upi" && (
                    <div className="flex flex-col sm:flex-row gap-5 items-center">
                      <div className="p-2.5 rounded-lg bg-white shrink-0 flex items-center justify-center">
                        {/* Elegant high-fidelity SVG Mock QR code containing suhx logos */}
                        <QrCode className="w-24 h-24 text-[#070B14]" />
                      </div>
                      
                      <div className="space-y-2 w-full">
                        <p className="text-xs text-text-luxury font-medium">Scan QR to pay ₹499 via GooglePay, Paytm, or PhonePe</p>
                        <p className="text-[10px] text-text-sub leading-relaxed font-mono">
                          Or enter your UPI ID directly below to trigger instant mobile checkout.
                        </p>
                        <div className="flex gap-2 w-full">
                          <input 
                            type="text" 
                            placeholder="username@okaxis" 
                            className="flex-1 text-xs py-2 px-3 bg-surface-dark border border-border-dark/60 rounded-lg text-text-luxury focus:outline-none"
                          />
                          <button 
                            onClick={handlePaymentSubmit}
                            className="py-1 px-4 rounded-lg bg-[#6C63FF] text-white font-bold text-xs shadow-md"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      {/* Interactive Credit Card Mock layout displaying live card values */}
                      <div className="w-full max-w-sm mx-auto h-40 rounded-xl bg-gradient-to-tr from-[#6C63FF] via-[#A855F7] to-[#00D1FF] p-4 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-mono tracking-wider opacity-75">MASTERCLASS ACCESS PASS</span>
                          <Lock className="w-3.5 h-3.5 opacity-90" />
                        </div>
                        
                        <div className="text-lg font-mono tracking-[0.25em] text-center my-2 font-semibold">
                          {cardDetails.number || "•••• •••• •••• ••••"}
                        </div>

                        <div className="flex justify-between items-end text-[10px] font-mono">
                          <div>
                            <span className="block text-[8px] opacity-70">CARD HOLDER</span>
                            <span className="font-bold tracking-wide uppercase">{cardDetails.holder || "YOUR FULL NAME"}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] opacity-70 text-right">EXPIRES</span>
                            <span className="font-bold">{cardDetails.expiry || "MM/YY"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Input fields */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <input 
                          type="text" 
                          placeholder="Card Number"
                          maxLength={19}
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                          className="col-span-2 text-xs py-2.5 px-3 bg-surface-dark border border-border-dark/60 rounded-lg text-text-luxury focus:outline-none focus:border-[#6C63FF]"
                        />
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                          className="text-xs py-2.5 px-3 bg-surface-dark border border-border-dark/60 rounded-lg text-text-luxury focus:outline-none focus:border-[#6C63FF]"
                        />
                        <input 
                          type="password" 
                          placeholder="CVV"
                          maxLength={3}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                          className="text-xs py-2.5 px-3 bg-surface-dark border border-border-dark/60 rounded-lg text-text-luxury focus:outline-none focus:border-[#6C63FF]"
                        />
                        <input 
                          type="text" 
                          placeholder="Card Holder Name"
                          value={cardDetails.holder}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, holder: e.target.value }))}
                          className="col-span-2 text-xs py-2.5 px-3 bg-surface-dark border border-border-dark/60 rounded-lg text-text-luxury focus:outline-none focus:border-[#6C63FF]"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="space-y-3.5 text-center py-2">
                      <p className="text-xs text-text-luxury font-medium">Fast, secure checkout via PayPal Express payment systems</p>
                      <button 
                        onClick={handlePaymentSubmit}
                        className="mx-auto block py-2 px-6 rounded-lg bg-amber-400 hover:bg-amber-300 transition-colors text-slate-900 font-bold text-xs"
                      >
                        Launch PayPal Express Portal
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setBookingStep("details")}
                    className="text-xs text-text-sub hover:text-text-luxury flex items-center gap-1 cursor-pointer"
                  >
                    Go Back
                  </button>
                  
                  <button
                    onClick={handlePaymentSubmit}
                    className="pill-glow-button py-2.5 px-6 text-xs font-bold"
                  >
                    Confirm Secure Payment (₹499)
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Immersive Ticket success layout */}
            {bookingStep === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-[#101826]/90 border border-emerald-500/30 text-center space-y-5 relative overflow-hidden"
              >
                {/* Embedded absolute celebration background spots */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-emerald-500/10 filter blur-xl pointer-events-none" />
                
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <Ticket className="w-6 h-6 animate-bounce" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-lg font-display font-bold text-emerald-400">Class Seat Reserved!</h4>
                  <p className="text-xs text-text-sub">We’ve emailed your workshop access keys to <span className="text-text-luxury font-semibold">{formData.email}</span>.</p>
                </div>

                {/* Simulated Digital Ticket Access Key */}
                <div className="border border-dashed border-border-dark/80 bg-[#070B14] rounded-xl p-4 text-left max-w-sm mx-auto relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface-dark border-r border-border-dark/65" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface-dark border-l border-border-dark/65" />
                  
                  <div className="text-[10px] font-mono text-text-sub flex justify-between">
                    <span>SEAT PASS: #SUHX-{Math.floor(1000 + Math.random() * 9000)}</span>
                    <span className="text-secondary-studio">LIVE DIGITAL</span>
                  </div>
                  
                  <div className="mt-3">
                    <h5 className="text-xs font-bold text-text-luxury font-sans uppercase">AIP MASTERCLASS PASS</h5>
                    <p className="text-[11px] text-[#00D1FF] font-mono mt-0.5">{formData.slot}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border-dark/60 flex justify-between items-center">
                    <div>
                      <span className="block text-[8px] text-text-sub tracking-wider">ATTENDEE</span>
                      <span className="text-xs font-bold text-text-luxury uppercase font-mono">{formData.name || "AIP Student"}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-text-sub tracking-wider">TICKET</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">CONFIRMED</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetBooking}
                    className="py-2.5 px-6 rounded-xl bg-surface-dark border border-border-dark/60 text-xs text-text-sub hover:text-text-luxury"
                  >
                    Close & Return
                  </button>
                  <a 
                    href="https://calendar.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="pill-glow-button py-2 px-5 text-xs font-bold"
                  >
                    Add to Calendar
                  </a>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

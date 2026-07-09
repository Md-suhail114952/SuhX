import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, 
  Palette, 
  Type, 
  Activity, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  Smartphone, 
  Check, 
  MousePointer, 
  Compass, 
  Zap,
  RefreshCw
} from "lucide-react";

// Types
type ActiveMode = "prototype" | "color" | "typography" | "motion";

interface NodeItem {
  id: string;
  label: string;
  x: number;
  y: number;
  status: "idle" | "active" | "success";
}

export default function UnifiedDesignPlayground() {
  const [activeMode, setActiveMode] = useState<ActiveMode>("prototype");
  
  // 1. Prototyping State
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: "entry", label: "User Landing", x: 15, y: 35, status: "active" },
    { id: "onboard", label: "AI Onboarding", x: 50, y: 15, status: "idle" },
    { id: "dashboard", label: "Core Console", x: 50, y: 65, status: "idle" },
    { id: "conversion", label: "Secure Pay (10x CTR)", x: 85, y: 35, status: "idle" }
  ]);
  const [activeFlowPath, setActiveFlowPath] = useState<string[]>(["entry"]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 2. Color Throw State
  const [activeColorTheme, setActiveColorTheme] = useState({
    id: "cyan",
    name: "Suhail Cyan",
    primary: "#00D1FF",
    secondary: "#0066FF",
    glow: "rgba(0, 209, 255, 0.4)",
    gradient: "from-[#00D1FF]/20 to-[#0066FF]/5",
    textClass: "text-[#00D1FF]",
    bgClass: "bg-[#00D1FF]"
  });

  const themes = [
    {
      id: "cyan",
      name: "Suhail Cyan",
      primary: "#00D1FF",
      secondary: "#0066FF",
      glow: "rgba(0, 209, 255, 0.4)",
      gradient: "from-[#00D1FF]/20 to-[#0066FF]/5",
      textClass: "text-[#00D1FF]",
      bgClass: "bg-[#00D1FF]"
    },
    {
      id: "purple",
      name: "Cosmic Indigo",
      primary: "#6C63FF",
      secondary: "#A855F7",
      glow: "rgba(108, 99, 255, 0.4)",
      gradient: "from-[#6C63FF]/20 to-[#A855F7]/5",
      textClass: "text-[#6C63FF]",
      bgClass: "bg-[#6C63FF]"
    },
    {
      id: "gold",
      name: "Aura Gold",
      primary: "#EAB308",
      secondary: "#F97316",
      glow: "rgba(234, 179, 8, 0.4)",
      gradient: "from-[#EAB308]/20 to-[#F97316]/5",
      textClass: "text-[#EAB308]",
      bgClass: "bg-[#EAB308]"
    },
    {
      id: "infrared",
      name: "Infrared Pulse",
      primary: "#FF0055",
      secondary: "#FF5E00",
      glow: "rgba(255, 0, 85, 0.4)",
      gradient: "from-[#FF0055]/20 to-[#FF5E00]/5",
      textClass: "text-[#FF0055]",
      bgClass: "bg-[#FF0055]"
    }
  ];

  const [colorRipples, setColorRipples] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const productContainerRef = useRef<HTMLDivElement>(null);

  // 3. Typography State
  const [selectedFont, setSelectedFont] = useState<"serif" | "sans" | "mono">("sans");
  const [letterSpacing, setLetterSpacing] = useState<number>(0); // -2 to 8
  const [fontWeight, setFontWeight] = useState<number>(500); // 400, 500, 700, 900

  // 4. Motion State
  const [stiffness, setStiffness] = useState<number>(120);
  const [damping, setDamping] = useState<number>(14);
  const [bounceCount, setBounceCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);

  // Handle Prototyping Node Selection
  const handleNodeClick = (nodeId: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentIdx = nodes.findIndex(n => n.id === nodeId);
    if (currentIdx === -1) return;

    // Build path sequentially
    let newPath = ["entry"];
    if (nodeId === "onboard") {
      newPath = ["entry", "onboard"];
    } else if (nodeId === "dashboard") {
      newPath = ["entry", "dashboard"];
    } else if (nodeId === "conversion") {
      newPath = ["entry", "dashboard", "conversion"];
    }

    setActiveFlowPath(newPath);

    // Update node states
    setNodes(prev => prev.map(n => {
      if (newPath.includes(n.id)) {
        return { ...n, status: n.id === nodeId ? "active" : "success" };
      }
      return { ...n, status: "idle" };
    }));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 850);
  };

  // Throw Color Ripple on canvas click
  const handleColorThrow = (theme: typeof themes[0], e: React.MouseEvent) => {
    setActiveColorTheme(theme);

    if (productContainerRef.current) {
      const rect = productContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = {
        id: Date.now(),
        x,
        y,
        color: theme.primary
      };

      setColorRipples(prev => [...prev, newRipple]);

      // Prune ripples after completion
      setTimeout(() => {
        setColorRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    }
  };

  const triggerMotionTest = () => {
    setIsBouncing(true);
    setBounceCount(prev => prev + 1);
    setTimeout(() => setIsBouncing(false), 1000);
  };

  return (
    <div className="w-full bg-surface-dark/30 border border-border-dark/50 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
      
      {/* Decorative ambient blurred backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-studio/5 rounded-full blur-3xl pointer-events-none" />
      <div 
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: `${activeColorTheme.primary}05` }}
      />

      {/* Title & Metadata Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10 border-b border-border-dark/30 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00D1FF] animate-pulse" />
            // Live Product Canvas
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-text-luxury leading-tight">
            SUHX <span className="text-gradient">Unified Design Playground</span>
          </h3>
          <p className="text-xs text-text-sub mt-2 max-w-xl">
            Experience absolute visual architecture. Toggle modes below to manipulate high-fidelity prototyping, dynamic color physics, typography matrices, and custom kinetic springs in a single mock experience.
          </p>
        </div>

        {/* Unified Mode Selection Buttons */}
        <div className="flex flex-wrap gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-white/[0.05]">
          {(["prototype", "color", "typography", "motion"] as ActiveMode[]).map((mode) => {
            const isSelected = activeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isSelected 
                    ? "bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 shadow-[0_0_15px_rgba(0,209,255,0.15)]"
                    : "text-text-sub hover:text-white hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {mode === "prototype" && <Layers className="w-3.5 h-3.5" />}
                {mode === "color" && <Palette className="w-3.5 h-3.5" />}
                {mode === "typography" && <Type className="w-3.5 h-3.5" />}
                {mode === "motion" && <Activity className="w-3.5 h-3.5" />}
                {mode}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* LEFT COLUMN: Controls & Interactive Parameter Settings */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-slate-950/30 p-5 rounded-2xl border border-border-dark/40">
          
          <div className="space-y-6">
            <div className="border-b border-white/[0.05] pb-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00D1FF]" />
                Interactive Telemetry
              </h4>
              <p className="text-[11px] text-text-sub mt-1">
                Dynamically tweak the rendering engines.
              </p>
            </div>

            {/* MODE CONTENT 1: PROTOTYPE */}
            {activeMode === "prototype" && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-text-sub leading-relaxed">
                  Classical user psychology states conversion occurs where action meets least resistance. Click the map nodes to test pathing rules.
                </p>
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-text-sub/50 uppercase tracking-widest block">Flow Nodes Map</span>
                  {nodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => handleNodeClick(node.id)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-all duration-300 flex items-center justify-between group ${
                        node.status === "active"
                          ? "bg-[#00D1FF]/10 border-[#00D1FF]/40 text-white"
                          : node.status === "success"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-surface-dark/80 border-border-dark/60 text-text-sub hover:border-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          node.status === "active" 
                            ? "bg-[#00D1FF] animate-ping" 
                            : node.status === "success" 
                              ? "bg-emerald-400" 
                              : "bg-gray-600"
                        }`} />
                        <span>{node.label}</span>
                      </div>
                      <span className="text-[9px] text-gray-500 group-hover:text-white transition-colors">
                        {node.status === "active" ? "[Active]" : node.status === "success" ? "[Passed]" : "[Tap Flow]"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MODE CONTENT 2: COLOR THROW */}
            {activeMode === "color" && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-text-sub leading-relaxed">
                  <strong>Color Throwing</strong> is a high-impact styling principle. Hover and click a paint token below to launch an absolute spatial ripple that recolors the entire mock container on impact!
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => {
                    const isSelected = activeColorTheme.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={(e) => handleColorThrow(theme, e)}
                        className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-20 group relative overflow-hidden ${
                          isSelected 
                            ? "border-white/30 bg-white/[0.03] shadow-lg" 
                            : "border-border-dark/60 bg-surface-dark/40 hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="w-3 h-3 rounded-full border border-white/20 shadow-md"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="text-[10px] font-mono font-bold text-text-luxury">{theme.name}</span>
                        </div>
                        <div className="flex items-center justify-between w-full mt-2">
                          <span className="text-[8px] font-mono text-gray-500">Throw Token</span>
                          <span className={`text-[10px] font-bold ${theme.textClass} opacity-0 group-hover:opacity-100 transition-opacity`}>➔</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MODE CONTENT 3: TYPOGRAPHY */}
            {activeMode === "typography" && (
              <div className="space-y-5 animate-fade-in">
                <p className="text-xs text-text-sub leading-relaxed">
                  Manipulate standard visual balance rules. Custom typography scale changes leading visual rhythm, grid kerning ratios, and immediate eye hierarchy.
                </p>
                
                {/* Font Choices */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-text-sub/50 uppercase tracking-widest block">Font Family Matrix</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "sans", name: "Swiss Sans", desc: "Inter" },
                      { id: "serif", name: "Playfair Serif", desc: "Elegant" },
                      { id: "mono", name: "JetBrains Mono", desc: "Tech" }
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFont(f.id as any)}
                        className={`p-2.5 rounded-lg border text-center transition-all duration-300 cursor-pointer ${
                          selectedFont === f.id
                            ? "bg-white/[0.04] border-[#00D1FF]/40 text-white"
                            : "bg-surface-dark/40 border-border-dark/60 text-text-sub hover:text-white hover:border-white/10"
                        }`}
                      >
                        <span className="text-[11px] font-bold block">{f.name}</span>
                        <span className="text-[8px] font-mono text-gray-500 mt-0.5 block">{f.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Weight */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-text-sub/70">
                    <span>Font Weight</span>
                    <span className="text-[#00D1FF]">{fontWeight}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[400, 500, 700, 900].map((w) => (
                      <button
                        key={w}
                        onClick={() => setFontWeight(w)}
                        className={`py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          fontWeight === w
                            ? "bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-white"
                            : "bg-surface-dark border border-border-dark/60 text-text-sub hover:text-white"
                        }`}
                      >
                        {w === 400 && "Regular"}
                        {w === 500 && "Medium"}
                        {w === 700 && "Bold"}
                        {w === 900 && "Black"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Letter Spacing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-text-sub/70">
                    <span>Tracking (Kerning)</span>
                    <span className="text-[#00D1FF]">{letterSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="8"
                    step="1"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full h-1 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-[#00D1FF]"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-gray-500">
                    <span>Tight (-2)</span>
                    <span>Wide (8)</span>
                  </div>
                </div>
              </div>
            )}

            {/* MODE CONTENT 4: MOTION PHYSICS */}
            {activeMode === "motion" && (
              <div className="space-y-5 animate-fade-in">
                <p className="text-xs text-text-sub leading-relaxed">
                  Fine-tune elastic physics inside the application. High-end user interactions rely on natural, non-linear velocity responses. Drag the slider specs below.
                </p>

                {/* Stiffness */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-text-sub/70">
                    <span>Spring Stiffness</span>
                    <span className="text-[#00D1FF]">{stiffness} N/m</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    step="10"
                    value={stiffness}
                    onChange={(e) => setStiffness(Number(e.target.value))}
                    className="w-full h-1 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-[#00D1FF]"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-gray-500">
                    <span>Lazy (20)</span>
                    <span>Intense (300)</span>
                  </div>
                </div>

                {/* Damping */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-text-sub/70">
                    <span>Spring Damping</span>
                    <span className="text-[#00D1FF]">{damping} Ns/m</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={damping}
                    onChange={(e) => setDamping(Number(e.target.value))}
                    className="w-full h-1 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-[#00D1FF]"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-gray-500">
                    <span>Loose (5)</span>
                    <span>Overdamped (40)</span>
                  </div>
                </div>

                <button
                  onClick={triggerMotionTest}
                  className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isBouncing ? 'animate-spin' : ''}`} />
                  Trigger Kinetic Ripple Test
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats telemetry readout */}
          <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-[9px] font-mono text-gray-500 select-none uppercase">
            <span>Grid Integrity: 100%</span>
            <span>Theme: {activeColorTheme.id}</span>
            <span>FPS: 60.0</span>
          </div>

        </div>

        {/* RIGHT COLUMN: The Interactive Mockup Display Canvas (The "Product") */}
        <div className="lg:col-span-8 flex items-center justify-center bg-slate-950/40 border border-border-dark/30 rounded-2xl p-4 md:p-8 relative min-h-[460px] overflow-hidden">
          
          {/* Dynamic background lighting keyed to selected theme */}
          <div 
            className="absolute inset-0 opacity-10 transition-colors duration-1000"
            style={{ 
              background: `radial-gradient(circle at center, ${activeColorTheme.primary} 0%, transparent 70%)` 
            }}
          />

          {/* Color Throw Wave Canvas Ripples */}
          {colorRipples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full pointer-events-none scale-0 animate-[ping_1.2s_cubic-bezier(0,0,0.2,1)_infinite] z-20"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: "400px",
                height: "400px",
                marginLeft: "-200px",
                marginTop: "-200px",
                border: `2px solid ${ripple.color}`,
                backgroundColor: `${ripple.color}05`,
              }}
            />
          ))}

          {/* Active Product Mockup Frame */}
          <div 
            ref={productContainerRef}
            className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-[#070b14]/90 shadow-2xl p-5 relative overflow-hidden transition-all duration-500"
            style={{
              boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px ${activeColorTheme.primary}10`,
              transform: isBouncing ? "scale(1.02)" : "scale(1)"
            }}
          >
            {/* Top Device Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-black rounded-full flex items-center justify-between px-3 select-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/[0.05]" />
              <div className="w-12 h-1 bg-white/[0.1] rounded" />
            </div>

            {/* Inner Dashboard Layout */}
            <div className="mt-5 pt-3 space-y-4">
              
              {/* Product Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-500"
                    style={{ backgroundColor: `${activeColorTheme.primary}15` }}
                  >
                    <Compass className="w-4 h-4" style={{ color: activeColorTheme.primary }} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white tracking-tight leading-none uppercase">SUHX OS</h5>
                    <span className="text-[8px] font-mono text-gray-500 leading-none">v2.44</span>
                  </div>
                </div>

                <span 
                  className="px-2 py-0.5 rounded text-[8px] font-mono border transition-all duration-300"
                  style={{ 
                    borderColor: `${activeColorTheme.primary}30`,
                    color: activeColorTheme.primary,
                    backgroundColor: `${activeColorTheme.primary}08`
                  }}
                >
                  // CORE ACTIVE
                </span>
              </div>

              {/* Main Display Typography Preview Block */}
              <div 
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 relative overflow-hidden"
              >
                {/* Visual Typography styles applied on the fly */}
                <motion.h4 
                  animate={{ scale: isBouncing ? 1.05 : 1 }}
                  transition={{ type: "spring", stiffness: stiffness, damping: damping }}
                  className={`text-xl md:text-2xl font-bold tracking-tight text-white select-none transition-all duration-500`}
                  style={{
                    fontFamily: selectedFont === "sans" 
                      ? "var(--font-sans)" 
                      : selectedFont === "serif" 
                        ? "'Playfair Display', serif" 
                        : "var(--font-mono)",
                    letterSpacing: `${letterSpacing}px`,
                    fontWeight: fontWeight,
                  }}
                >
                  Creative AI Symphony.
                </motion.h4>
                <p className="text-[10px] text-text-sub leading-relaxed">
                  Fusing geometric marks and classic layouts to maximize commercial engagement metrics. Try dragging typography or stiffness variables in real time.
                </p>

                {/* Dynamic Telemetry Display tag */}
                <div className="flex items-center justify-between text-[7.5px] font-mono text-gray-500 select-none pt-2 border-t border-white/[0.03]">
                  <span>Family: {selectedFont}</span>
                  <span>Kerning: {letterSpacing}px</span>
                  <span>Weight: {fontWeight}</span>
                </div>
              </div>

              {/* Prototyping Vector Interactive Nodes Canvas */}
              <div className="h-28 rounded-2xl bg-slate-950 border border-white/[0.04] p-3 relative overflow-hidden flex items-center justify-center">
                
                {/* Connector vector wirelines under nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  {/* Wire 1: entry to onboard */}
                  <line 
                    x1="15%" y1="35%" x2="50%" y2="15%" 
                    stroke={activeFlowPath.includes("onboard") ? activeColorTheme.primary : "rgba(255,255,255,0.15)"} 
                    strokeWidth={activeFlowPath.includes("onboard") ? "1.5" : "1"}
                    strokeDasharray={activeFlowPath.includes("onboard") ? "0" : "2 2"}
                    className="transition-all duration-500"
                  />
                  {/* Wire 2: entry to dashboard */}
                  <line 
                    x1="15%" y1="35%" x2="50%" y2="65%" 
                    stroke={activeFlowPath.includes("dashboard") ? activeColorTheme.primary : "rgba(255,255,255,0.15)"} 
                    strokeWidth={activeFlowPath.includes("dashboard") ? "1.5" : "1"}
                    strokeDasharray={activeFlowPath.includes("dashboard") ? "0" : "2 2"}
                    className="transition-all duration-500"
                  />
                  {/* Wire 3: dashboard to conversion */}
                  <line 
                    x1="50%" y1="65%" x2="85%" y2="35%" 
                    stroke={activeFlowPath.includes("conversion") ? activeColorTheme.primary : "rgba(255,255,255,0.15)"} 
                    strokeWidth={activeFlowPath.includes("conversion") ? "1.5" : "1"}
                    strokeDasharray={activeFlowPath.includes("conversion") ? "0" : "2 2"}
                    className="transition-all duration-500"
                  />

                  {/* Laser light pulse travel for active transition feedback */}
                  {isTransitioning && (
                    <circle r="3" fill="#ffffff" className="filter drop-shadow-[0_0_5px_#fff]">
                      <animateMotion 
                        dur="0.8s" 
                        repeatCount="1"
                        path={
                          activeFlowPath[activeFlowPath.length - 1] === "onboard"
                            ? "M 45,39 L 150,17"
                            : activeFlowPath[activeFlowPath.length - 1] === "dashboard"
                              ? "M 45,39 L 150,73"
                              : "M 150,73 L 255,39"
                        }
                        fill="freeze"
                      />
                    </circle>
                  )}
                </svg>

                {/* Nodes rendering inside product */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {nodes.map((node) => {
                    const isActive = node.status === "active";
                    const isSuccess = node.status === "success";

                    return (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node.id)}
                        className="absolute p-1 rounded-lg border flex flex-col items-center justify-center transition-all duration-300 select-none cursor-pointer group"
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div 
                          className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all duration-300 ${
                            isActive
                              ? "bg-white border-white text-black shadow-lg"
                              : isSuccess
                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                : "bg-slate-900 border-white/10 text-text-sub group-hover:border-white/30"
                          }`}
                        >
                          {node.id === "entry" && <MousePointer className="w-3.5 h-3.5" />}
                          {node.id === "onboard" && <Zap className="w-3.5 h-3.5" />}
                          {node.id === "dashboard" && <Smartphone className="w-3.5 h-3.5" />}
                          {node.id === "conversion" && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-[7px] font-mono text-gray-500 group-hover:text-white transition-colors mt-1 select-none pointer-events-none">
                          {node.label.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="absolute bottom-1 right-2 text-[6.5px] font-mono text-gray-500">
                  Click Nodes to Re-Route Wireflow
                </div>
              </div>

              {/* Kinetic Springs Spring Animation interactive panel */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  animate={{ 
                    y: isBouncing ? [-8, 4, -2, 0] : 0,
                    scale: isBouncing ? [1.02, 0.98, 1] : 1
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: stiffness, 
                    damping: damping 
                  }}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center"
                >
                  <span className="text-[18px] font-bold text-white block">35%</span>
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">CTR Conversion</span>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: isBouncing ? [8, -4, 2, 0] : 0,
                    scale: isBouncing ? [0.98, 1.02, 1] : 1
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: stiffness, 
                    damping: damping 
                  }}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center"
                >
                  <span className="text-[18px] font-bold text-[#00D1FF] block transition-colors duration-500" style={{ color: activeColorTheme.primary }}>+10x</span>
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">Core Retention</span>
                </motion.div>
              </div>

            </div>

            {/* Simulated home indicator line */}
            <div className="w-20 h-1 bg-white/20 rounded-full mx-auto mt-6" />

          </div>
        </div>

      </div>

    </div>
  );
}

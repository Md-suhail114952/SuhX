import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles, MessageSquare, AlertCircle, Bot, CornerDownLeft } from "lucide-react";
import { ChatMessage } from "../types";

// Custom inline parser to display basic Markdown elements beautifully without needing extra packages
function FormattedBotResponse({ text }: { text: string }) {
  if (!text) return null;

  // Split lines to detect lists, codeblocks, etc.
  const lines = text.split("\n");

  return (
    <div className="space-y-2 text-sm text-text-luxury/90 leading-relaxed font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // 1. Bullet list items
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-[#00D1FF] mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" />
              <span>{renderTextWithBold(content)}</span>
            </div>
          );
        }

        // 2. Headings (e.g. ### or ##)
        if (trimmed.startsWith("#")) {
          const level = (trimmed.match(/^#+/) || [""])[0].length;
          const cleanText = trimmed.replace(/^#+\s*/, "");
          return (
            <h5 
              key={idx} 
              className={`font-display font-black text-text-luxury mt-3 ${
                level === 1 ? "text-lg border-b border-border-dark py-1" : "text-sm text-[#00D1FF]"
              }`}
            >
              {cleanText}
            </h5>
          );
        }

        // 3. Code blocks or quotes
        if (trimmed.startsWith("`") || trimmed.endsWith("`")) {
          const cleanText = trimmed.replace(/`/g, "");
          return (
            <pre key={idx} className="bg-[#070B14] p-3 rounded-lg border border-border-dark font-mono text-xs text-secondary-studio overflow-x-auto my-2">
              <code>{cleanText}</code>
            </pre>
          );
        }

        // 4. Default paragraphs
        return <p key={idx}>{renderTextWithBold(line)}</p>;
      })}
    </div>
  );
}

// Helper to replace **bold** markers inside strings
function renderTextWithBold(text: string) {
  const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-bold text-[#00D1FF]">
          {part}
        </strong>
      );
    }
    return part;
  });
}

interface AIChatAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatAgent({ isOpen, onClose }: AIChatAgentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Greetings, creative strategist. I am **SUHX-AI**, the digital intelligence twin of MD Suhail.\n\nFusing visual art structures with advanced prompt matrices. Ask me to:\n- **Brainstorm a luxury dark palette** for your startup\n- **Suggest typography combinations** for premium SaaS\n- **Construct high-impact Midjourney triggers**\n\nHow can we design your digital footprint today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Design a color scheme for a luxury Web3 platform.",
    "Draft a Midjourney prompt for futuristic 3D wire glass.",
    "Recommend premium font pairings for a Figma system.",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Build correct context map
      const contextMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/suhx-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextMessages }),
      });

      if (!res.ok) {
        throw new Error("Neural Core response error. Mainframe offline.");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "Message fully parsed, but telemetry stream returned null.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `🤖 **[SYSTEM RE-ROUTE ERROR]**:\n\n*Unable to finalize transmission to MD Suhail's neural matrix.*\n\nDetail: ${err.message || "Key verification failure"}.\n\n*Direct inquiry is open: Please email **mohd.suhail114952@gmail.com** or call **+91 7065927198**.*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          {/* Subtle click-away dark background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#070B14]/65 backdrop-blur-sm pointer-events-auto cursor-pointer"
          />

          {/* Chat Side Drawer panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-full max-w-lg h-full bg-[#0a0f1d] border-l border-border-dark pointer-events-auto flex flex-col justify-between shadow-[0_0_50px_rgba(108,99,255,0.15)] relative z-10"
            id="ai-chatbot-drawer"
          >
            {/* Drawer Top Header */}
            <div className="p-6 border-b border-border-dark/60 flex items-center justify-between bg-[#101826]/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0c1220] border border-border-dark flex items-center justify-center shadow-lg animate-pulse">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <defs>
                      <linearGradient id="drawerSparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff7b00" />
                        <stop offset="30%" stopColor="#e52e71" />
                        <stop offset="55%" stopColor="#b422e5" />
                        <stop offset="80%" stopColor="#6C63FF" />
                        <stop offset="100%" stopColor="#00D1FF" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#drawerSparkleGradient)"
                      d="M9 22a.75.75 0 0 1-.75-.75c0-4.9-3.6-8.5-8.5-8.5a.75.75 0 0 1 0-1.5c4.9 0 8.5-3.6 8.5-8.5a.75.75 0 0 1 1.5 0c0 4.9 3.6 8.5 8.5 8.5a.75.75 0 0 1 0 1.5c-4.9 0-8.5 3.6-8.5 8.5A.75.75 0 0 1 9 22zm9.5-12.5a.5.5 0 0 1-.5-.5c0-2.2-1.8-4-4-4a.5.5 0 0 1 0-1c2.2 0 4-1.8 4-4a.5.5 0 0 1 1 0c0 2.2 1.8 4 4 4a.5.5 0 0 1 0 1c-2.2 0-4 1.8-4 4a.5.5 0 0 1-.5.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-black text-text-luxury text-sm">SUHX-AI // Neural Hub</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[9px] font-mono tracking-wider text-emerald-400 font-semibold uppercase">ONLINE // MATRIX CORE</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-surface-dark border border-border-dark text-text-sub hover:text-text-luxury hover:border-[#00D1FF]/40 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Chatbot Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chats messages timeline viewport */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-surface-dark scroll-smooth"
            >
              {messages.map((m, idx) => {
                const isBot = m.role === "assistant";

                return (
                  <div
                    key={idx}
                    className={`flex gap-3 max-w-[85%] ${isBot ? "" : "ml-auto flex-row-reverse"}`}
                  >
                    {/* Tiny Avatar */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isBot ? "bg-[#6C63FF]/15 border border-[#6C63FF]/30 text-[#6C63FF]" : "bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[#00D1FF]"
                    }`}>
                      {isBot ? <Bot className="w-5 h-5" /> : <MessageSquare className="w-4 h-4" />}
                    </div>

                    {/* Chat Bubble card */}
                    <div className="space-y-1">
                      <div className={`p-4 rounded-2xl border ${
                        isBot 
                          ? "bg-surface-dark/70 border-border-dark/60 text-text-luxury" 
                          : "bg-gradient-to-br from-[#00D1FF]/10 to-[#6C63FF]/5 border-[#00D1FF]/30 text-text-luxury"
                      }`}>
                        {isBot ? (
                          <FormattedBotResponse text={m.content} />
                        ) : (
                          <p className="text-sm font-sans whitespace-pre-wrap leading-relaxed">
                            {m.content}
                          </p>
                        )}
                      </div>
                      <p className={`text-[9px] font-mono text-text-sub/40 ${isBot ? "text-left" : "text-right"}`}>
                        {m.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Loader indicator */}
              {loading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-[#6C63FF]/15 border border-[#6C63FF]/30 text-[#6C63FF] flex items-center justify-center shrink-0 animate-bounce">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="p-4 rounded-2xl glass border-border-dark flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00D1FF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#6C63FF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-bounce" />
                    <span className="text-[10px] font-mono text-[#00D1FF] ml-1">Streaming Synaptic Stream...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick action helper buttons + User Input row */}
            <div className="p-6 border-t border-border-dark/60 bg-[#101826]/30 backdrop-blur-md space-y-4">
              {/* Quick questions trigger pills list */}
              {messages.length === 1 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-mono uppercase text-text-sub/50 tracking-wider">
                    // Quick Synaptic Triggers
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {quickPrompts.map((pText) => (
                      <button
                        key={pText}
                        onClick={() => handleSendMessage(pText)}
                        className="text-left text-xs text-text-sub hover:text-[#00D1FF] hover:border-[#00D1FF]/35 bg-[#070B14] border border-border-dark/60 px-3 py-2 rounded-xl transition-all truncate cursor-pointer active:scale-[0.99]"
                      >
                        ⚡ "{pText}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Text Input field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    required
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask SUHX-AI twins for design palettes, prompts..."
                    className="w-full pl-4 pr-10 py-3.5 bg-[#070B14] border border-border-dark rounded-xl text-xs text-text-luxury placeholder-text-sub/40 focus:outline-none focus:border-[#00D1FF] focus:shadow-[0_0_10px_rgba(0,209,255,0.1)] transition-all"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 text-[10px] font-mono text-text-sub/30 flex items-center gap-0.5 select-none pointer-events-none">
                    <CornerDownLeft className="w-3 h-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] text-white flex items-center justify-center hover:opacity-95 active:scale-[0.95] transition-all cursor-pointer disabled:opacity-40 shadow-inner"
                  aria-label="Transmit message to SUHX-AI"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

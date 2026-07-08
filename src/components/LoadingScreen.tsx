import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Design", "Create", "Inspire"];

  // 1. requestAnimationFrame Counter (0 to 100 over ~2700ms)
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2700; // 2.7 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate current count
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Trigger completion after 400ms delay as requested
        const timer = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timer);
      }
    };

    const animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  // 2. Cycle words every 900ms (so 3 words fit perfectly in 2700ms)
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(wordTimer);
  }, []);

  return (
    <div id="loading-screen" className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none">
      {/* Top Left: "Portfolio" label */}
      <div className="flex items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-mono"
        >
          Portfolio / MD Suhail
        </motion.div>
      </div>

      {/* Center: Rotating words */}
      <div className="flex items-center justify-center">
        <div className="h-24 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary/80"
            >
              {words[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom: Counter and Progress Bar */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          {/* Subtle details */}
          <div className="text-[10px] text-muted font-mono tracking-wider max-w-[150px] uppercase hidden sm:block">
            Establishing Creative Connection // SUHX Core v2.6
          </div>
          
          {/* Bottom-right Counter display */}
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums select-none leading-none">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="relative w-full h-[3px] bg-stroke/30 overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full accent-gradient transition-transform duration-75 ease-out origin-left rounded-full"
            style={{
              width: "100%",
              transform: `scaleX(${count / 100})`,
              boxShadow: "0 0 12px rgba(137, 170, 204, 0.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";

interface TypewriterBioProps {
  onComplete?: () => void;
}

export default function TypewriterBio({ onComplete }: TypewriterBioProps) {
  const fullText = "Hello, I am MD Suhail (SUHX). I operate at the absolute vanguard of visual communication. Fusing deep background classical drawing and modern vector symmetry rules with structural user psychology principles.\n\nMy focus is delivering award-winning, high-conversion visual design languages for top scale-ups and corporate partners. As an elite Certified AI Generalist, I integrate custom image finetunes and advanced language processing interfaces directly into product designs, ensuring we stay 10 ten steps ahead.";
  
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup Intersection Observer to start typing when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle actual typing
  useEffect(() => {
    if (!inView) return;

    if (index < fullText.length) {
      const delay = Math.random() * 12 + 6; // Faster and more natural typing speed
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, fullText, onComplete, inView]);

  const handleReset = () => {
    setDisplayedText("");
    setIndex(0);
  };

  // Safely format the displayed text to render MD Suhail (SUHX) as bold & keep linebreaks
  const renderFormattedText = () => {
    const paragraphs = displayedText.split("\n\n");
    
    return paragraphs.map((para, paraIdx) => {
      const parts = para.split("MD Suhail (SUHX)");
      
      return (
        <p key={paraIdx} className="text-sm sm:text-base text-text-sub leading-relaxed mb-4 font-sans transition-all duration-300">
          {parts.map((part, partIdx) => {
            const isLastPart = partIdx === parts.length - 1;
            return (
              <span key={partIdx}>
                {part}
                {!isLastPart && (
                  <strong className="text-[#00D1FF] font-bold drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]">
                    MD Suhail (SUHX)
                  </strong>
                )}
              </span>
            );
          })}
          {/* Show the blinking caret cursor on the active paragraph */}
          {paraIdx === paragraphs.length - 1 && index < fullText.length && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-[#00D1FF] animate-pulse align-middle" />
          )}
        </p>
      );
    });
  };

  return (
    <div ref={containerRef} className="min-h-[220px] transition-all duration-300 relative group/typewriter pt-2">
      {/* Visual Indicator of AI Streaming status */}
      <div className="absolute -top-12 right-2 flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] select-none">
        <div className={`w-1.5 h-1.5 rounded-full ${index < fullText.length ? 'bg-[#00D1FF] animate-ping' : 'bg-emerald-400'}`} />
        <span className="text-[9px] font-mono text-text-sub uppercase tracking-wider">
          {index < fullText.length ? 'AI Bio Streaming...' : 'Bio Loaded'}
        </span>
        {index === fullText.length && (
          <button 
            onClick={handleReset} 
            className="ml-2 hover:text-[#00D1FF] text-gray-500 transition-colors flex items-center cursor-pointer"
            title="Replay typing effect"
          >
            <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-500" />
          </button>
        )}
      </div>

      <div className="mt-2">
        {renderFormattedText()}
      </div>

      {index === fullText.length && (
        <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-emerald-400 opacity-80 animate-fade-in">
          <span>● System Status: Fully Decoded</span>
        </div>
      )}
    </div>
  );
}

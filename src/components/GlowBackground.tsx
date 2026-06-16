import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function GlowBackground() {
  const [mounted, setMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobileDevice(
        window.innerWidth < 768 || 
        ('ontouchstart' in window) || 
        navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the glow sphere diameter (e.g. 200px) so it's centered on cursor
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#070B14] pointer-events-none">
      {/* Dynamic Cursor Light Glow - Only render on desktop */}
      {!isMobileDevice && (
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-radial from-[#6c63ff1c] to-transparent blur-3xl"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        />
      )}

      {/* Futuristic Deep Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f46e5 1px, transparent 1px),
            linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }}
      />

      {/* Decorative Floating Glowing Blobs - Only dynamic on desktop, highly simplified static glows on mobile to avoid repaint flicker */}
      {isMobileDevice ? (
        // Simple static ambient layers for mobile (no motion, no filter-blur repaint loops)
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#00D1FF] opacity-10 blur-[100px]" />
          <div className="absolute top-[40%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-[#A855F7] opacity-10 blur-[100px]" />
        </div>
      ) : (
        // High fidelity animating spots for high-spec desktop browsers
        <div className="absolute inset-0 overflow-hidden filter blur-[120px] opacity-40">
          {/* Ambient Spot 1: Neon Cyan Top Left */}
          <motion.div
            animate={{
              x: [0, 50, -40, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.15, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-[#00D1FF] to-[#6C63FF] opacity-30"
          />

          {/* Ambient Spot 2: Luxury Violet Center Right */}
          <motion.div
            animate={{
              x: [0, -80, 60, 0],
              y: [0, 40, -50, 0],
              scale: [1, 0.85, 1.1, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#A855F7] to-[#00D1FF] opacity-25"
          />

          {/* Ambient Spot 3: Deep Indigo Bottom Center */}
          <motion.div
            animate={{
              x: [0, 40, -40, 0],
              y: [0, -30, 40, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-15%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-[#6C63FF] opacity-20"
          />
        </div>
      )}

      {/* Radial Vignette Mask */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,#070B14_95%]" />
    </div>
  );
}

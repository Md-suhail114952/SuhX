import { useEffect, useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

// ----------------------------------------------------
// 1. LIQUID/GOOEY CUSTOM CURSOR
// ----------------------------------------------------
export function LusionCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position of actual mouse
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  // Array of trail coordinates for the gooey liquid tail
  const trailCount = 6;
  const trailRefs = useRef<{ x: number; y: number }[]>(
    Array.from({ length: trailCount }, () => ({ x: 0, y: 0 }))
  );

  // Motion values for the primary cursor dot and outer blend ring
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Velocity state to deform/stretch the main trailing blob
  const [velocity, setVelocity] = useState({ x: 0, y: 0, speed: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Setup interactive hover listeners
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .interactive-hover, [data-hover-glow]'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add listeners initially
    addHoverListeners();

    // Re-bind hover elements periodically to catch dynamically loaded items
    const interval = setInterval(addHoverListeners, 1500);

    // High performance animation loop for the gooey fluid tail
    let animFrameId: number;
    const updateTrail = () => {
      // Calculate speed and direction (velocity) for stretching
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Update velocity with easing
      setVelocity((prev) => ({
        x: dx,
        y: dy,
        speed: prev.speed * 0.85 + dist * 0.15,
      }));

      lastMouse.current.x = mouse.current.x;
      lastMouse.current.y = mouse.current.y;

      // Update trailing elements
      // Each point in the trail follows the previous one with a lerp
      let prevX = mouse.current.x;
      let prevY = mouse.current.y;

      trailRefs.current.forEach((point, idx) => {
        // High index = slower/lagging tail elements
        const lerpFactor = 0.35 - idx * 0.04; 
        point.x += (prevX - point.x) * lerpFactor;
        point.y += (prevY - point.y) * lerpFactor;
        
        // Update DOM element position directly for ultra high FPS (avoids react render overhead)
        const element = document.getElementById(`lusion-trail-${idx}`);
        if (element) {
          element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
        }

        prevX = point.x;
        prevY = point.y;
      });

      animFrameId = requestAnimationFrame(updateTrail);
    };
    animFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(interval);
      cancelAnimationFrame(animFrameId);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  // Calculate dynamic rotation angle and scale based on velocity to stretch the trail
  const angle = Math.atan2(velocity.y, velocity.x);
  const scaleX = 1 + Math.min(velocity.speed * 0.04, 0.8);
  const scaleY = Math.max(0.4, 1 - Math.min(velocity.speed * 0.03, 0.6));

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
      {/* SVG Gooey Filter definition */}
      <svg className="hidden">
        <defs>
          <filter id="gooey-cursor">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* 1. Fluid Gooey Blob Container */}
      <div 
        className="absolute inset-0"
        style={{ filter: "url(#gooey-cursor)" }}
      >
        <AnimatePresence>
          {isVisible && (
            <>
              {/* Leader Dot (The focal point of the mouse) */}
              <motion.div
                className="absolute w-4 h-4 bg-white rounded-full origin-center"
                style={{
                  x: springX,
                  y: springY,
                  translateX: "-50%",
                  translateY: "-50%",
                  scale: isHovered ? 2.5 : isClicking ? 0.7 : 1,
                  backgroundColor: isHovered ? "#FFFFFF" : "#E2E8F0",
                }}
              />

              {/* Stretched/Distorted Fluid Trail Nodes */}
              {Array.from({ length: trailCount }).map((_, idx) => (
                <div
                  key={idx}
                  id={`lusion-trail-${idx}`}
                  className="absolute rounded-full bg-white/80 origin-center"
                  style={{
                    // Decreasing node sizes for a teardrop profile
                    width: `${20 - idx * 2.5}px`,
                    height: `${20 - idx * 2.5}px`,
                    opacity: 0.95 - idx * 0.12,
                    transform: `translate3d(0px, 0px, 0) translate(-50%, -50%)`,
                    // Dynamic speed stretch distortion for the first couple trail nodes
                    transformOrigin: "center center",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Outer Liquid Ring / Blend Circle (Lusion style Mix-Blend-Mode Highlight) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute rounded-full border border-white bg-transparent mix-blend-difference"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              width: isHovered ? "72px" : "36px",
              height: isHovered ? "72px" : "36px",
              scale: isClicking ? 0.85 : 1,
              backgroundColor: isHovered ? "rgba(255, 255, 255, 0.12)" : "transparent",
              transition: "width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// 2. MAGNETIC HOVER WRAPPER (High-end cursor grab effect)
// ----------------------------------------------------
interface LusionMagneticProps {
  children: ReactNode;
  strength?: number; // Grab intensity multiplier (default = 0.35)
  key?: string | number;
}

export function LusionMagnetic({ children, strength = 0.35 }: LusionMagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { damping: 15, stiffness: 150 });
  const y = useSpring(0, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance from center of element to mouse
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply attraction within element boundaries or very close range
    const maxRange = 100;
    const dist = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (dist < maxRange) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------
// 3. FLUID LETTERS REVEAL (Character-level stagger)
// ----------------------------------------------------
interface LusionTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function LusionTextReveal({ text, className = "", delay = 0 }: LusionTextRevealProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "40%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Cubic bezier identical to high-end CSS transitions
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`inline-block ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// ----------------------------------------------------
// 4. PERSISTENT FLOATING PARTICLE REVELATOR
// ----------------------------------------------------
export function LusionParticles() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      decay: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse position on canvas
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Spawn a dynamic trail particle
      if (Math.random() < 0.3) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5, // Float slightly upwards
          opacity: 0,
          maxOpacity: Math.random() * 0.4 + 0.1,
          decay: Math.random() * 0.01 + 0.005,
        });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Populate ambient particles
    const maxAmbientParticles = 40;
    for (let i = 0; i < maxAmbientParticles; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.1,
        opacity: Math.random() * 0.3,
        maxOpacity: Math.random() * 0.3 + 0.05,
        decay: Math.random() * 0.003 + 0.001,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Handle particle movement & lifetime
        p.x += p.speedX;
        p.y += p.speedY;

        // Fade-in ambient and fade-out near end of life
        if (p.opacity < p.maxOpacity && p.decay > 0) {
          p.opacity += 0.01;
        } else {
          p.opacity -= p.decay;
        }

        // Wrap around screens or respawn ambient particles
        if (p.opacity <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          // Reset to a new random ambient particle
          particles[idx] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4 - 0.1,
            opacity: 0,
            maxOpacity: Math.random() * 0.3 + 0.05,
            decay: Math.random() * 0.003 + 0.001,
          };
          return;
        }

        // Interactive mouse connection: pull particles slightly toward cursor if close
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const pull = (150 - dist) * 0.00015;
            p.speedX += dx * pull;
            p.speedY += dy * pull;
          }
        }

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.opacity)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-75"
    />
  );
}

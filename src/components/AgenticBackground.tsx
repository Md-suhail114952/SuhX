import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface DotNode {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  currentAlpha: number;
  scale: number;
  phase: number;
}

interface AmbientOrb {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
  speed: number;
}

export default function AgenticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let dots: DotNode[] = [];
    let orbs: AmbientOrb[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let time = 0;
    const spacing = 28; // Perfect resolution spacing for elegant dot matrix

    // Initialize the uniform dot matrix grid
    const initGrid = () => {
      dots = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const homeX = (c - 0.5) * spacing;
          const homeY = (r - 0.5) * spacing;
          
          dots.push({
            homeX,
            homeY,
            x: homeX + (Math.random() - 0.5) * 4,
            y: homeY + (Math.random() - 0.5) * 4,
            vx: 0,
            vy: 0,
            baseAlpha: 0.05 + (Math.sin(homeX * 0.01) * Math.cos(homeY * 0.01)) * 0.02,
            currentAlpha: 0.05,
            scale: 1,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    };

    // Initialize floating ambient lights behind dots (Apple Studio Gradient style)
    const initOrbs = () => {
      orbs = [
        {
          x: width * 0.25,
          y: height * 0.3,
          targetX: width * 0.25,
          targetY: height * 0.3,
          radius: Math.min(width, height) * 0.4,
          color: "rgba(108, 99, 255, 0.15)", // Deep Indigo
          speed: 0.003
        },
        {
          x: width * 0.75,
          y: height * 0.6,
          targetX: width * 0.75,
          targetY: height * 0.6,
          radius: Math.min(width, height) * 0.35,
          color: "rgba(0, 209, 255, 0.12)", // Cyan
          speed: 0.002
        },
        {
          x: width * 0.5,
          y: height * 0.4,
          targetX: width * 0.5,
          targetY: height * 0.4,
          radius: Math.min(width, height) * 0.5,
          color: "rgba(168, 85, 247, 0.08)", // Purple
          speed: 0.001
        }
      ];
    };

    initGrid();
    initOrbs();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
      initOrbs();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Main premium Apple rendering loop
    const render = () => {
      time += 0.5;
      
      // Clear with dark deep luxury blue-slate tint
      ctx.clearRect(0, 0, width, height);

      // 1. Render Floating Ambient Orbs with smooth interpolation
      orbs.forEach((orb) => {
        // Drift towards target slightly
        if (Math.abs(orb.x - orb.targetX) < 10 && Math.abs(orb.y - orb.targetY) < 10) {
          orb.targetX = Math.random() * width;
          orb.targetY = Math.random() * height;
        }
        orb.x += (orb.targetX - orb.x) * orb.speed;
        orb.y += (orb.targetY - orb.y) * orb.speed;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "rgba(7, 11, 20, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Render Apple Style Wave lines (ultra fine, premium grid guidelines)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 1;
      const subtleGridSize = 56;
      for (let x = 0; x < width; x += subtleGridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += subtleGridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Calculate the global scanning light wave (like Apple's breathing light)
      // Slow sweep diagonally from top-left to bottom-right
      const waveX = (time * 1.2) % (width + height + 800) - 400;

      // 3. Update and Draw the premium Dot Matrix
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Wave sweep calculation
        // Equation of diagonal: x + y = wavePosition
        const dotPosSum = dot.homeX + dot.homeY;
        const waveDist = Math.abs(dotPosSum - waveX);

        let waveAlphaAddition = 0;
        let waveScaleAddition = 0;
        if (waveDist < 350) {
          const factor = (1 - waveDist / 350);
          // Ease-out-in curve for wave breathing
          const smoothFactor = Math.sin(factor * Math.PI);
          waveAlphaAddition = smoothFactor * 0.18;
          waveScaleAddition = smoothFactor * 0.45;
        }

        // Mouse distance calculations
        let mouseAlphaAddition = 0;
        let mouseScaleAddition = 0;
        
        if (isHovered) {
          const dx = mousePos.x - dot.x;
          const dy = mousePos.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            const factor = 1 - dist / 220;
            const easeFactor = factor * factor; // steeper ramp for focus feel
            mouseAlphaAddition = easeFactor * 0.45;
            mouseScaleAddition = easeFactor * 0.8;

            // Interactive Warp / Lens distortion physics
            // Dots gently move out of the way, creating a lens-like spatial warp
            const force = (220 - dist) / 220;
            const angle = Math.atan2(dy, dx);
            const repelStrength = 14; // perfect micro-warp threshold
            
            dot.vx -= Math.cos(angle) * force * repelStrength * 0.15;
            dot.vy -= Math.sin(angle) * force * repelStrength * 0.15;
          }
        }

        // Standard spring back to original grid positions
        const homeDx = dot.homeX - dot.x;
        const homeDy = dot.homeY - dot.y;

        dot.vx += homeDx * 0.06; // Spring stiffness
        dot.vy += homeDy * 0.06;

        dot.vx *= 0.82; // Friction dampener
        dot.vy *= 0.82;

        if (!prefersReducedMotion) {
          dot.x += dot.vx;
          dot.y += dot.vy;
        } else {
          dot.x = dot.homeX;
          dot.y = dot.homeY;
        }

        // Pulse slowly over time
        dot.phase += 0.008;
        const pulse = Math.sin(dot.phase) * 0.03;

        // Combine alphas
        const targetAlpha = dot.baseAlpha + waveAlphaAddition + mouseAlphaAddition + pulse;
        dot.currentAlpha += (targetAlpha - dot.currentAlpha) * 0.15;

        // Combine scale sizes (base is 1.1px, up to 2.8px under interaction)
        const targetScale = 1.0 + waveScaleAddition + mouseScaleAddition + pulse * 2;
        dot.scale += (targetScale - dot.scale) * 0.15;

        // Dot Rendering: Use precise micro-arcs
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 0.95 * dot.scale, 0, Math.PI * 2);

        // Apple branding spectrum: White under interaction, shifting to dynamic cyan and baseline subtle silver-gray
        if (mouseAlphaAddition > 0.1) {
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.currentAlpha})`;
        } else if (waveAlphaAddition > 0.05) {
          ctx.fillStyle = `rgba(0, 209, 255, ${dot.currentAlpha})`;
        } else {
          ctx.fillStyle = `rgba(164, 185, 215, ${dot.currentAlpha})`;
        }

        ctx.fill();

        // Draw an ultra-faint orbit ring for extremely focused dots near the cursor
        if (mouseScaleAddition > 0.5) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2.8 * dot.scale, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 209, 255, ${mouseAlphaAddition * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw subtle decorative vector lines (Concentric technical circles representing camera/calibration lens)
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 80, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 209, 255, 0.04)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 160, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(108, 99, 255, 0.02)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas) {
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [prefersReducedMotion, isHovered, mousePos]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#070b14]"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block bg-transparent"
      />
      {/* Absolute Premium Dark Vignette and Depth Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070B14] z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,#070B14_95%] opacity-85 z-[1] pointer-events-none" />
    </div>
  );
}

import React from "react";
import { motion } from "motion/react";

interface SoftwareIcon {
  name: string;
  label: string;
  color: string; // Hex or gradient for border / text
  glowColor: string; // Shadow glow color
  textColor: string;
  positionClass: string; // Responsive classes for position, scale, opacity
  delay: number;
  duration: number;
  isFigma?: boolean;
}

const softwareList: SoftwareIcon[] = [
  {
    name: "Illustrator",
    label: "Ai",
    color: "border-[#FF9A00]/40",
    glowColor: "rgba(255, 154, 0, 0.25)",
    textColor: "text-[#FF9A00]",
    positionClass: "top-[14%] left-[1.5%] md:top-[16%] md:left-[6%] opacity-80 md:opacity-85",
    delay: 0,
    duration: 7,
  },
  {
    name: "Photoshop",
    label: "Ps",
    color: "border-[#00C8FF]/40",
    glowColor: "rgba(0, 200, 255, 0.25)",
    textColor: "text-[#00C8FF]",
    positionClass: "top-[56%] left-[0.5%] md:top-[54%] md:left-[9%] opacity-80 md:opacity-85",
    delay: 1.5,
    duration: 8,
  },
  {
    name: "AdobeXD",
    label: "Xd",
    color: "border-[#FF26BE]/40",
    glowColor: "rgba(255, 38, 190, 0.25)",
    textColor: "text-[#FF26BE]",
    positionClass: "top-[36%] left-[2%] md:top-[34%] md:left-[16%] opacity-80 md:opacity-85",
    delay: 0.8,
    duration: 6.5,
  },
  {
    name: "InDesign",
    label: "Id",
    color: "border-[#FF1493]/40",
    glowColor: "rgba(255, 20, 147, 0.25)",
    textColor: "text-[#FF1493]",
    positionClass: "top-[78%] left-[1%] md:top-[76%] md:left-[5%] opacity-80 md:opacity-85",
    delay: 2.2,
    duration: 9,
  },
  {
    name: "PremierePro",
    label: "Pr",
    color: "border-[#9980FA]/40",
    glowColor: "rgba(153, 128, 250, 0.25)",
    textColor: "text-[#9980FA]",
    positionClass: "top-[16%] right-[1.5%] md:top-[18%] md:right-[6%] opacity-80 md:opacity-85",
    delay: 0.5,
    duration: 7.5,
  },
  {
    name: "AfterEffects",
    label: "Ae",
    color: "border-[#D6A2E8]/40",
    glowColor: "rgba(214, 162, 232, 0.25)",
    textColor: "text-[#D6A2E8]",
    positionClass: "top-[52%] right-[0.5%] md:top-[50%] md:right-[12%] opacity-80 md:opacity-85",
    delay: 1.8,
    duration: 8.5,
  },
  {
    name: "Firefly",
    label: "Ff",
    color: "border-[#FF26BE]/40",
    glowColor: "rgba(255, 38, 190, 0.25)",
    textColor: "bg-gradient-to-r from-[#FF26BE] via-[#6C63FF] to-[#00D1FF] bg-clip-text text-transparent",
    positionClass: "top-[34%] right-[2%] md:top-[32%] md:right-[18%] opacity-80 md:opacity-85",
    delay: 1.1,
    duration: 7.2,
  },
  {
    name: "Figma",
    label: "Fg",
    color: "border-[#A259FF]/40",
    glowColor: "rgba(162, 89, 255, 0.25)",
    textColor: "",
    positionClass: "top-[74%] right-[1%] md:top-[72%] md:right-[8%] opacity-80 md:opacity-85",
    delay: 2.5,
    duration: 9.5,
    isFigma: true,
  },
];

export default function FloatingSoftwareIcons() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-1">
      {softwareList.map((icon, idx) => {
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 1],
              y: [0, -18, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              opacity: { duration: 1.2, delay: icon.delay * 0.4 },
              y: {
                repeat: Infinity,
                duration: icon.duration,
                ease: "easeInOut",
                delay: icon.delay,
              },
              rotate: {
                repeat: Infinity,
                duration: icon.duration * 1.2,
                ease: "easeInOut",
                delay: icon.delay,
              },
            }}
            whileHover={{
              scale: 1.15,
              opacity: 1,
              filter: "brightness(1.2) contrast(1.1)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className={`absolute pointer-events-auto cursor-pointer select-none origin-center ${icon.positionClass}`}
          >
            {/* Elegant glassmorphic square container */}
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-[14px] md:rounded-[20px] border ${icon.color} bg-[#070b14]/75 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300`}
              style={{
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4), 0 0 16px ${icon.glowColor}`,
              }}
              title={icon.name}
            >
              {icon.isFigma ? (
                /* Original Figma 5-colored vector logo */
                <svg
                  width="22"
                  height="33"
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-8 md:w-7 md:h-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                >
                  {/* Top Left Semicircle */}
                  <path d="M0 3C0 1.34315 1.34315 0 3 0H6V6H3C1.34315 6 0 4.65685 0 3Z" fill="#F24E1E" />
                  {/* Middle Left Semicircle */}
                  <path d="M0 9C0 7.34315 1.34315 6 3 6H6V12H3C1.34315 12 0 10.6569 0 9Z" fill="#A259FF" />
                  {/* Bottom Left Teardrop */}
                  <path d="M0 15C0 13.3431 1.34315 12 3 12H6V15C6 16.6569 4.65685 18 3 18C1.34315 18 0 16.6569 0 15Z" fill="#0ACF83" />
                  {/* Middle Right Circle */}
                  <path d="M6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9C12 10.6569 10.6569 12 9 12H6V9Z" fill="#1ABC9C" />
                  {/* Top Right Circle */}
                  <path d="M6 3C6 1.34315 7.34315 0 9 0C10.6569 0 12 1.34315 12 3C12 4.65685 10.6569 6 9 6H6V3Z" fill="#FF7262" />
                </svg>
              ) : (
                <span className={`text-lg md:text-xl font-sans font-black tracking-tighter ${icon.textColor}`}>
                  {icon.label}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

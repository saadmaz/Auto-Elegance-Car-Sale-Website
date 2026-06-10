import { motion } from "motion/react";

const PARTICLES = [
  { id: 0,  x: 8,  y: 45, size: 1.5, duration: 14, delay: 0   },
  { id: 1,  x: 22, y: 68, size: 1.0, duration: 18, delay: 2.4 },
  { id: 2,  x: 38, y: 25, size: 2.0, duration: 12, delay: 1.1 },
  { id: 3,  x: 51, y: 72, size: 1.2, duration: 20, delay: 3.8 },
  { id: 4,  x: 64, y: 38, size: 1.8, duration: 15, delay: 0.7 },
  { id: 5,  x: 77, y: 82, size: 1.3, duration: 17, delay: 5.2 },
  { id: 6,  x: 88, y: 55, size: 2.2, duration: 13, delay: 1.9 },
  { id: 7,  x: 15, y: 15, size: 1.0, duration: 22, delay: 4.1 },
  { id: 8,  x: 44, y: 60, size: 1.6, duration: 16, delay: 2.9 },
  { id: 9,  x: 92, y: 30, size: 1.4, duration: 19, delay: 6.3 },
  { id: 10, x: 30, y: 88, size: 1.1, duration: 21, delay: 0.3 },
  { id: 11, x: 70, y: 18, size: 1.9, duration: 11, delay: 7.1 },
];

const STREAKS = [
  { id: 0, top: 22, duration: 9,  delay: 0,   repeatDelay: 12 },
  { id: 1, top: 55, duration: 12, delay: 4.5, repeatDelay: 15 },
  { id: 2, top: 38, duration: 10, delay: 8,   repeatDelay: 18 },
  { id: 3, top: 70, duration: 11, delay: 2.5, repeatDelay: 14 },
];

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "oklch(0.65 0.22 43 / 0.55)",
          }}
          animate={{
            y: [0, -50, -20, -80],
            opacity: [0, 0.5, 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {STREAKS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute h-px origin-left -skew-y-6"
          style={{
            top: `${s.top}%`,
            left: 0,
            width: "28%",
            background:
              "linear-gradient(90deg, transparent, oklch(0.65 0.22 43 / 0.3), transparent)",
          }}
          animate={{
            x: ["-30%", "145%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

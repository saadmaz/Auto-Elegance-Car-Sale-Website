import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useVelocity,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import carSide from "@/assets/car-side.png";
import road from "@/assets/road.jpg";

export function CinematicDrive() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Smooth out scroll progress so motion feels expensive, not jittery
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6 });

  // ── Multi-stage car choreography ──
  // 0.0 → 0.18  fade in from far left, small (approach)
  // 0.18 → 0.42 push to center, scale up (arrival)
  // 0.42 → 0.62 hold near center, micro-tilt (the beauty shot)
  // 0.62 → 1.0  launch off to the right, motion-blur (departure)
  const carX = useTransform(p, [0, 0.2, 0.45, 0.62, 1], ["-90%", "-25%", "0%", "8%", "120%"]);
  const carScale = useTransform(p, [0, 0.2, 0.45, 0.62, 1], [0.55, 0.95, 1.18, 1.22, 0.85]);
  const carTilt = useTransform(p, [0, 0.45, 0.62, 1], [-3, 0, 1, 4]);
  const carY = useTransform(p, [0, 0.45, 0.62, 1], [40, 0, 0, -10]);
  const blur = useTransform(p, [0, 0.18, 0.45, 0.62, 0.85, 1], [10, 2, 0, 0, 5, 14]);
  const filter = useMotionTemplate`blur(${blur}px) saturate(1.05)`;

  // Velocity-driven streaks
  const v = useVelocity(p);
  const speedAbs = useTransform(v, (x) => Math.min(Math.abs(x) * 600, 100));
  const linesOpacity = useTransform(p, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Road parallax — way more aggressive
  const roadX = useTransform(p, [0, 1], ["20%", "-60%"]);
  const roadScale = useTransform(p, [0, 0.5, 1], [1.15, 1.35, 1.55]);
  const roadBlur = useTransform(p, [0, 0.45, 0.62, 1], [4, 0, 0, 8]);
  const roadFilter = useMotionTemplate`blur(${roadBlur}px)`;

  // Camera shake (subtle, only when "going fast")
  const shakeX = useTransform(speedAbs, (s) => (Math.random() - 0.5) * (s / 50));
  const shakeY = useTransform(speedAbs, (s) => (Math.random() - 0.5) * (s / 80));

  // Headlight cones — bloom in mid-section
  const lightOpacity = useTransform(p, [0.25, 0.5, 0.75], [0, 1, 0.4]);

  // Headline choreography (split into two beats)
  const t1Opacity = useTransform(p, [0.02, 0.12, 0.4, 0.5], [0, 1, 1, 0]);
  const t1Y = useTransform(p, [0, 0.5], [60, -40]);
  const t2Opacity = useTransform(p, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0]);
  const t2Y = useTransform(p, [0.55, 0.95], [60, -60]);

  // Wheel spin driven by velocity (much more responsive)
  const wheelRotate = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const speed = Math.abs(v.get()) * 1200 + 30; // baseline idle spin
      wheelRotate.set(wheelRotate.get() + speed * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v, wheelRotate]);

  // Ground shadow stretch — tied to scale
  const shadowScaleX = useTransform(carScale, [0.55, 1.22], [0.4, 1.3]);
  const shadowOpacity = useTransform(p, [0, 0.45, 0.62, 1], [0.2, 0.85, 0.85, 0.3]);

  // Light streak under the car when accelerating away
  const streakOpacity = useTransform(p, [0.55, 0.7, 1], [0, 1, 0]);
  const streakWidth = useTransform(p, [0.55, 1], ["10%", "180%"]);

  return (
    <section ref={ref} className="relative h-[420vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Atmospheric gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,oklch(0.18_0.06_75/0.45),transparent_60%)]" />

        {/* Road background (parallax + blur with velocity) */}
        <motion.div
          style={{ x: roadX, scale: roadScale, filter: roadFilter }}
          className="absolute inset-0"
        >
          <img src={road} alt="" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </motion.div>

        {/* Lane stripes — animated dash flying past */}
        <motion.div
          style={{ opacity: linesOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-[18%] h-px"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0 40px, oklch(0.82 0.13 82 / 0.5) 40px 90px)",
              animation: "lanePan 0.6s linear infinite",
            }}
          />
        </motion.div>

        {/* Volumetric headlight cone */}
        <motion.div
          style={{ opacity: lightOpacity }}
          className="pointer-events-none absolute left-[55%] top-[40%] h-[80vh] w-[120vw] origin-left -translate-y-1/2"
        >
          <div className="h-full w-full bg-[conic-gradient(from_85deg_at_0%_50%,transparent_0deg,oklch(0.95_0.14_88/0.18)_8deg,transparent_22deg)] blur-2xl" />
        </motion.div>

        {/* Horizontal speed streaks */}
        <motion.div
          style={{ opacity: linesOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
              style={{ top: `${6 + i * 4}%`, left: "-30%", right: "-30%" }}
              animate={{ x: ["-40%", "40%"] }}
              transition={{
                duration: 0.35 + (i % 5) * 0.18,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.03,
              }}
            />
          ))}
        </motion.div>

        {/* Headline beat 1 — THE ARRIVAL */}
        <motion.div
          style={{ y: t1Y, opacity: t1Opacity }}
          className="absolute inset-x-0 top-[14%] z-20 px-6 text-center"
        >
          <div className="font-mono text-[10px] tracking-[0.55em] text-gold/70">
            — SCENE 01 / THE ARRIVAL
          </div>
          <h2 className="mt-6 font-display text-6xl leading-[0.92] tracking-tight md:text-[10rem]">
            Engineered for <span className="italic gold-shine">the road</span>.
          </h2>
        </motion.div>

        {/* Headline beat 2 — THE DEPARTURE */}
        <motion.div
          style={{ y: t2Y, opacity: t2Opacity }}
          className="absolute inset-x-0 top-[14%] z-20 px-6 text-center"
        >
          <div className="font-mono text-[10px] tracking-[0.55em] text-gold/70">
            — SCENE 02 / THE DEPARTURE
          </div>
          <h2 className="mt-6 font-display text-6xl leading-[0.92] tracking-tight md:text-[10rem]">
            And gone in a <span className="italic gold-shine">breath</span>.
          </h2>
        </motion.div>

        {/* The driving car */}
        <motion.div
          style={{ x: carX, y: carY, scale: carScale, rotate: carTilt, filter }}
          className="relative z-10 w-[85vw] max-w-[1500px]"
        >
          <motion.div style={{ x: shakeX, y: shakeY }} className="relative">
            {/* Trailing light streak under the car */}
            <motion.div
              style={{ opacity: streakOpacity, width: streakWidth }}
              className="pointer-events-none absolute right-full top-[70%] h-2 -translate-y-1/2 rounded-full bg-gradient-to-l from-gold via-gold/40 to-transparent blur-md"
            />

            <img src={carSide} alt="Luxury sports coupe driving" className="w-full" />

            {/* Spinning wheel overlays */}
            <motion.div
              style={{ rotate: wheelRotate }}
              className="pointer-events-none absolute left-[19.5%] top-[68%] h-[18%] w-[10%] rounded-full"
            >
              <div className="absolute inset-0 rounded-full border-2 border-gold/70" />
              <div className="absolute inset-2 rounded-full border border-gold/30" />
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gold/50"
                  style={{ transform: `rotate(${i * 36}deg)` }}
                />
              ))}
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
            </motion.div>
            <motion.div
              style={{ rotate: wheelRotate }}
              className="pointer-events-none absolute right-[12%] top-[68%] h-[18%] w-[10%] rounded-full"
            >
              <div className="absolute inset-0 rounded-full border-2 border-gold/70" />
              <div className="absolute inset-2 rounded-full border border-gold/30" />
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gold/50"
                  style={{ transform: `rotate(${i * 36}deg)` }}
                />
              ))}
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
            </motion.div>

            {/* Reflection / paint glint sweep */}
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ mixBlendMode: "screen" }}
            >
              <motion.div
                className="absolute -inset-y-10 w-[20%] -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{ x: ["-30%", "600%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Ground shadow */}
          <motion.div
            style={{ opacity: shadowOpacity, scaleX: shadowScaleX }}
            className="absolute -bottom-4 left-[8%] right-[8%] h-10 origin-center rounded-full bg-black blur-2xl"
          />
        </motion.div>

        {/* Telemetry HUD */}
        <TelemetryHUD progress={p} />

        {/* Corner UI — scene marker */}
        <div className="absolute left-8 top-8 z-20 hidden flex-col items-start gap-2 font-mono text-[10px] tracking-[0.4em] text-gold/60 md:flex">
          <div>● REC</div>
          <div>CAM_02 / EXT.NIGHT</div>
        </div>
        <div className="absolute right-8 top-8 z-20 hidden font-mono text-[10px] tracking-[0.4em] text-gold/60 md:block">
          MAISON / STUDIO REEL · 4K
        </div>

        {/* Bottom vignette */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>

      {/* Inline keyframes for lane stripes */}
      <style>{`@keyframes lanePan { from { background-position: 0 0 } to { background-position: -130px 0 } }`}</style>
    </section>
  );
}

function TelemetryHUD({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const speed = useTransform(progress, [0, 0.2, 0.45, 0.62, 0.85, 1], [0, 140, 280, 312, 240, 90]);
  const rounded = useSpring(speed, { stiffness: 80, damping: 20 });
  const [text, setText] = useState("0");
  useEffect(() => rounded.on("change", (v) => setText(Math.round(v).toString())), [rounded]);

  const gear = useTransform(progress, (pp) =>
    pp < 0.15 ? "2" : pp < 0.32 ? "3" : pp < 0.5 ? "4" : pp < 0.72 ? "6" : pp < 0.88 ? "5" : "3",
  );
  const [gearText, setGearText] = useState("2");
  useEffect(() => gear.on("change", (v) => setGearText(v)), [gear]);

  const arc = useTransform(progress, [0, 0.5, 1], [0, 78, 32]);
  const arcStr = useMotionTemplate`${arc} 100`;

  return (
    <div className="absolute bottom-10 right-8 z-20 hidden items-end gap-4 md:flex">
      <div className="rounded-2xl border border-gold/30 bg-background/50 px-6 py-4 backdrop-blur-md">
        <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
          SPEED · KM/H
        </div>
        <div className="font-display text-5xl text-gold tabular-nums">{text}</div>
      </div>
      <div className="rounded-2xl border border-gold/30 bg-background/50 px-6 py-4 backdrop-blur-md">
        <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">GEAR</div>
        <div className="font-display text-5xl text-gold">{gearText}</div>
      </div>
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gold"
            strokeDasharray={arcStr}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="font-mono text-[8px] tracking-widest text-muted-foreground">RPM</div>
          <div className="font-display text-sm">7.2k</div>
        </div>
      </div>
    </div>
  );
}

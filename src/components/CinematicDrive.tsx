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
import carSide from "@/assets/car-side.webp";
import road from "@/assets/road.webp";

export function CinematicDrive() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6 });

  // Multi-stage car choreography
  const carX     = useTransform(p, [0, 0.2, 0.45, 0.62, 1], ["90%", "25%", "0%", "-8%", "-120%"]);
  const carScale = useTransform(p, [0, 0.2, 0.45, 0.62, 1], [0.55, 0.95, 1.18, 1.22, 0.85]);
  const carTilt  = useTransform(p, [0, 0.45, 0.62, 1], [-2, 0, 1, 3]);
  const carY     = useTransform(p, [0, 0.45, 0.62, 1], [40, 0, 0, -10]);
  const blur     = useTransform(p, [0, 0.18, 0.45, 0.62, 0.85, 1], [10, 2, 0, 0, 5, 14]);
  const filter   = useMotionTemplate`blur(${blur}px) saturate(1.05)`;

  const v            = useVelocity(p);
  const linesOpacity = useTransform(p, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Road parallax
  const roadX      = useTransform(p, [0, 1], ["-20%", "60%"]);
  const roadScale  = useTransform(p, [0, 0.5, 1], [1.15, 1.35, 1.55]);
  const roadBlur   = useTransform(p, [0, 0.45, 0.62, 1], [4, 0, 0, 8]);
  const roadFilter = useMotionTemplate`blur(${roadBlur}px)`;

  // Headlight bloom
  const lightOpacity = useTransform(p, [0.25, 0.5, 0.75], [0, 1, 0.4]);

  // Headline beats
  const t1Opacity = useTransform(p, [0.02, 0.12, 0.4, 0.5], [0, 1, 1, 0]);
  const t1Y       = useTransform(p, [0, 0.5], [55, -35]);
  const t2Opacity = useTransform(p, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0]);
  const t2Y       = useTransform(p, [0.55, 0.95], [55, -55]);

  // Velocity-driven wheel spin
  const wheelRotate = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const speed = Math.abs(v.get()) * 1200 + 30;
      wheelRotate.set(wheelRotate.get() + speed * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v, wheelRotate]);

  // Ground shadow
  const shadowScaleX  = useTransform(carScale, [0.55, 1.22], [0.4, 1.3]);
  const shadowOpacity = useTransform(p, [0, 0.45, 0.62, 1], [0.2, 0.85, 0.85, 0.3]);

  // Departure light streak
  const streakOpacity = useTransform(p, [0.55, 0.7, 1], [0, 1, 0]);
  const streakWidth   = useTransform(p, [0.55, 1], ["10%", "180%"]);

  return (
    <section ref={ref} className="relative h-[420vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">

        {/* Atmospheric backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,oklch(0.14_0.05_78/0.40),transparent_58%)]" />

        {/* Road */}
        <motion.div
          style={{ x: roadX, scale: roadScale, filter: roadFilter }}
          className="absolute inset-0"
        >
          <img src={road} alt="" className="h-full w-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/15 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </motion.div>

        {/* Lane stripes */}
        <motion.div
          style={{ opacity: linesOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-[18%] h-px"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0 40px, oklch(0.78 0.09 82 / 0.45) 40px 90px)",
              animation: "lanePan 0.6s linear infinite",
            }}
          />
        </motion.div>

        {/* Headlight cone */}
        <motion.div
          style={{ opacity: lightOpacity }}
          className="pointer-events-none absolute right-[50%] top-[40%] h-[80vh] w-[120vw] origin-right -translate-y-1/2 scale-x-[-1]"
        >
          <div className="h-full w-full bg-[conic-gradient(from_85deg_at_0%_50%,transparent_0deg,oklch(0.92_0.12_86/0.16)_8deg,transparent_22deg)] blur-2xl" />
        </motion.div>

        {/* Speed streaks */}
        <motion.div
          style={{ opacity: linesOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
              style={{ top: `${8 + i * 8}%`, left: "-30%", right: "-30%" }}
              animate={{ x: ["-40%", "40%"] }}
              transition={{
                duration: 0.4 + (i % 4) * 0.2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.07,
              }}
            />
          ))}
        </motion.div>

        {/* Headline beat 1 — THE ARRIVAL */}
        <motion.div
          style={{ y: t1Y, opacity: t1Opacity }}
          className="absolute inset-x-0 top-[12%] z-20 px-8 text-center"
        >
          <div
            className="text-[9px] tracking-[0.6em] text-gold/60"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            — SCENE 01 · THE ARRIVAL
          </div>
          <h2 className="mt-7 font-display text-[3.5rem] font-light leading-[0.93] tracking-tight md:text-[8rem]">
            Engineered for{" "}
            <em className="italic gold-shine not-italic">the road.</em>
          </h2>
        </motion.div>

        {/* Headline beat 2 — THE DEPARTURE */}
        <motion.div
          style={{ y: t2Y, opacity: t2Opacity }}
          className="absolute inset-x-0 top-[12%] z-20 px-8 text-center"
        >
          <div
            className="text-[9px] tracking-[0.6em] text-gold/60"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            — SCENE 02 · THE DEPARTURE
          </div>
          <h2 className="mt-7 font-display text-[3.5rem] font-light leading-[0.93] tracking-tight md:text-[8rem]">
            And gone in a{" "}
            <em className="italic gold-shine not-italic">breath.</em>
          </h2>
        </motion.div>

        {/* The driving car */}
        <motion.div
          style={{ x: carX, y: carY, scale: carScale, rotate: carTilt, filter }}
          className="relative z-10 w-[85vw] max-w-[1500px]"
        >
          <div className="relative">
            {/* Trailing streak */}
            <motion.div
              style={{ opacity: streakOpacity, width: streakWidth }}
              className="pointer-events-none absolute left-full top-[70%] h-1.5 -translate-y-1/2 rounded-full bg-linear-to-r from-gold via-gold/35 to-transparent blur-md"
            />

            <img src={carSide} alt="Luxury sports coupe in motion" className="w-full" />

            {/* Rear wheel */}
            <motion.div
              style={{ rotate: wheelRotate }}
              className="pointer-events-none absolute left-[19.5%] top-[68%] h-[18%] w-[10%] rounded-full"
            >
              <div className="absolute inset-0 rounded-full border border-gold/55" />
              <div className="absolute inset-[15%] rounded-full border border-gold/22" />
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gold/40"
                  style={{ transform: `rotate(${i * 36}deg)` }}
                />
              ))}
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/80" />
            </motion.div>

            {/* Front wheel */}
            <motion.div
              style={{ rotate: wheelRotate }}
              className="pointer-events-none absolute right-[12%] top-[68%] h-[18%] w-[10%] rounded-full"
            >
              <div className="absolute inset-0 rounded-full border border-gold/55" />
              <div className="absolute inset-[15%] rounded-full border border-gold/22" />
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gold/40"
                  style={{ transform: `rotate(${i * 36}deg)` }}
                />
              ))}
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/80" />
            </motion.div>

            {/* Paint glint */}
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ mixBlendMode: "screen" }}
            >
              <motion.div
                className="absolute -inset-y-10 w-[18%] -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent"
                animate={{ x: ["-30%", "620%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              />
            </motion.div>
          </div>

          {/* Ground shadow */}
          <motion.div
            style={{ opacity: shadowOpacity, scaleX: shadowScaleX }}
            className="absolute -bottom-4 left-[8%] right-[8%] h-8 origin-center rounded-full bg-black blur-3xl"
          />
        </motion.div>

        {/* Telemetry HUD */}
        <TelemetryHUD progress={p} />

        {/* Corner markers */}
        <div
          className="absolute left-8 top-8 z-20 hidden flex-col items-start gap-1.5 text-[9px] tracking-[0.45em] text-gold/45 md:flex"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div>● REC</div>
          <div>CAM_02 · EXT.NIGHT</div>
        </div>
        <div
          className="absolute right-8 top-8 z-20 hidden text-[9px] tracking-[0.45em] text-gold/45 md:block"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          MAISON AUTO · STUDIO REEL · 4K
        </div>

        {/* Edge vignettes */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>

      <style>{`@keyframes lanePan { from { background-position: 0 0 } to { background-position: -130px 0 } }`}</style>
    </section>
  );
}

function TelemetryHUD({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const speed   = useTransform(progress, [0, 0.2, 0.45, 0.62, 0.85, 1], [0, 140, 280, 312, 240, 90]);
  const rounded = useSpring(speed, { stiffness: 80, damping: 20 });
  const [text, setText] = useState("0");
  useEffect(() => rounded.on("change", (v) => setText(Math.round(v).toString())), [rounded]);

  const gear = useTransform(progress, (pp) =>
    pp < 0.15 ? "2" : pp < 0.32 ? "3" : pp < 0.5 ? "4" : pp < 0.72 ? "6" : pp < 0.88 ? "5" : "3",
  );
  const [gearText, setGearText] = useState("2");
  useEffect(() => gear.on("change", (v) => setGearText(v)), [gear]);

  const arc    = useTransform(progress, [0, 0.5, 1], [0, 78, 32]);
  const arcStr = useMotionTemplate`${arc} 100`;

  return (
    <div className="absolute bottom-10 right-8 z-20 hidden items-end gap-3 md:flex">
      <div
        className="border border-gold/22 bg-background/55 px-5 py-4 backdrop-blur-md"
        style={{ borderRadius: "2px" }}
      >
        <div
          className="text-[8.5px] tracking-[0.38em] text-muted-foreground/60"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          SPEED · KM/H
        </div>
        <div className="font-display text-[2.8rem] font-light text-gold tabular-nums leading-none mt-1">
          {text}
        </div>
      </div>
      <div
        className="border border-gold/22 bg-background/55 px-5 py-4 backdrop-blur-md"
        style={{ borderRadius: "2px" }}
      >
        <div
          className="text-[8.5px] tracking-[0.38em] text-muted-foreground/60"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          GEAR
        </div>
        <div className="font-display text-[2.8rem] font-light text-gold leading-none mt-1">
          {gearText}
        </div>
      </div>
      <div className="relative h-[72px] w-[72px]">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle
            cx="18" cy="18" r="15.9"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="text-border"
          />
          <motion.circle
            cx="18" cy="18" r="15.9"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="text-gold"
            strokeDasharray={arcStr}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div
            className="text-[7px] tracking-widest text-muted-foreground/55"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            RPM
          </div>
          <div className="font-display text-[0.75rem] font-light leading-none mt-0.5">7.2k</div>
        </div>
      </div>
    </div>
  );
}

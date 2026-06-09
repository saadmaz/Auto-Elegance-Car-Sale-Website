import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import car1 from "@/assets/car-1.webp";
import car2 from "@/assets/car-2.webp";
import car3 from "@/assets/car-3.webp";

const FLEET = [
  { img: car1, name: "Porsche 911 Carrera", spec: "Silver Pearl · 2023", ref: "REF · 087" },
  { img: car2, name: "BMW M4 Competition", spec: "Tanzanite Blue · 2024", ref: "REF · 091" },
  { img: car3, name: "Audi RS7 Sportback", spec: "Daytona Grey · 2023", ref: "REF · 094" },
];

/**
 * Runway — scroll-jacked horizontal "show floor" where cars roll in from the
 * right, pause center-stage, and exit left. Plays like a luxury auto reveal reel.
 */
export function Runway() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });

  // Horizontal track: 3 cars sequenced across the viewport
  const trackX = useTransform(p, [0, 1], ["10%", "-220%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-background">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Studio floor — diagonal sweep light */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,oklch(0.16_0.04_75/0.5),transparent_55%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,oklch(0.1_0.01_60),transparent)]" />
          {/* Studio grid floor */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.82 0.13 82 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.13 82 / 0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              transform: "perspective(900px) rotateX(70deg)",
              transformOrigin: "bottom",
              maskImage: "linear-gradient(to top, black, transparent 80%)",
            }}
          />
          {/* Top spotlight bar */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Header */}
        <div className="relative z-20 flex items-end justify-between px-8 pt-10 md:px-16">
          <div>
            <div className="font-mono text-[10px] tracking-[0.5em] text-gold/70">
              — ROLLING SHOWROOM
            </div>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              The fleet, <span className="italic gold-shine">in motion</span>.
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[10px] tracking-[0.4em] text-muted-foreground md:block">
            SCROLL · DRIVE
            <br />
            03 / VEHICLES
          </div>
        </div>

        {/* Horizontal car track */}
        <div className="relative flex-1">
          <motion.div
            style={{ x: trackX }}
            className="absolute inset-y-0 left-0 flex w-[400vw] items-center"
          >
            {FLEET.map((car, i) => (
              <RunwayCar key={car.name} car={car} index={i} progress={p} />
            ))}
          </motion.div>

          {/* Floor reflection */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Scrub bar */}
        <div className="relative z-20 mx-8 mb-8 md:mx-16">
          <div className="h-px w-full bg-border">
            <motion.div className="h-px bg-gold" style={{ scaleX: p, transformOrigin: "left" }} />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            <span>01 · APPROACH</span>
            <span>02 · CENTER STAGE</span>
            <span>03 · EXIT</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RunwayCar({
  car,
  index,
  progress,
}: {
  car: { img: string; name: string; spec: string; ref: string };
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  // Each car has a "spotlight window" within total progress where it's center stage
  const start = index / FLEET.length;
  const peak = start + 1 / (FLEET.length * 2);
  const end = (index + 1) / FLEET.length;

  const cardOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.05), peak, Math.min(1, end + 0.05)],
    [0.3, 1, 0.3],
  );
  const cardScale = useTransform(progress, [start, peak, end], [0.88, 1.05, 0.88]);
  const labelY = useTransform(progress, [start, peak, end], [40, 0, 40]);

  return (
    <div className="flex w-screen flex-shrink-0 items-center justify-center px-12">
      <motion.div
        style={{ opacity: cardOpacity, scale: cardScale }}
        className="relative w-full max-w-[1100px]"
      >
        <div className="absolute -inset-16 rounded-full bg-gradient-radial from-gold/15 via-transparent to-transparent blur-3xl" />
        <img
          src={car.img}
          alt={car.name}
          className="relative w-full drop-shadow-[0_60px_60px_rgba(0,0,0,0.6)]"
        />

        {/* Floor shadow */}
        <div className="absolute -bottom-2 left-[12%] right-[12%] h-8 rounded-full bg-black/70 blur-2xl" />

        {/* Floating label */}
        <motion.div
          style={{ y: labelY, opacity: cardOpacity }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
        >
          <div className="font-mono text-[10px] tracking-[0.5em] text-gold">{car.ref}</div>
          <div className="mt-2 font-display text-3xl md:text-5xl">{car.name}</div>
          <div className="mt-1 font-mono text-[10px] tracking-[0.4em] text-muted-foreground">
            {car.spec.toUpperCase()}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

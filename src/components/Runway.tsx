import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import car1 from "@/assets/car-1.webp";
import car2 from "@/assets/car-2.webp";
import car3 from "@/assets/car-3.webp";

const FLEET = [
  { img: car1, name: "Porsche 911 Carrera",  spec: "Silver Pearl · 2023", ref: "REF · 087", year: "2023", km: "8,200 km",  price: "€148,000" },
  { img: car2, name: "BMW M4 Competition",   spec: "Tanzanite Blue · 2024", ref: "REF · 091", year: "2024", km: "3,400 km",  price: "€132,500" },
  { img: car3, name: "Audi RS7 Sportback",   spec: "Daytona Grey · 2023",  ref: "REF · 094", year: "2023", km: "12,100 km", price: "€189,000" },
];

export function Runway() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });

  const trackX = useTransform(p, [0, 1], ["10%", "-220%"]);

  return (
    <section ref={ref} className="relative h-[240vh] bg-background">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">

        {/* Studio environment */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,oklch(0.13_0.04_78/0.45),transparent_52%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,oklch(0.05_0.003_270),transparent)]" />

          {/* Perspective grid floor */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.78 0.09 82 / 0.2) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.09 82 / 0.2) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              transform: "perspective(900px) rotateX(70deg)",
              transformOrigin: "bottom",
              maskImage: "linear-gradient(to top, black, transparent 80%)",
            }}
          />

          {/* Ceiling light bar */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Section header */}
        <div className="relative z-20 flex items-end justify-between px-8 pt-12 md:px-16">
          <div>
            <p
              className="text-[9px] tracking-[0.55em] text-gold/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              — ROLLING SHOWROOM
            </p>
            <h2 className="mt-4 font-display text-[2.4rem] font-light leading-[0.95] tracking-tight md:text-[4rem]">
              The fleet,{" "}
              <span className="italic gold-shine">in motion.</span>
            </h2>
          </div>
          <div
            className="hidden text-right text-[8.5px] tracking-[0.4em] text-muted-foreground/40 md:block"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SCROLL · DRIVE
            <br />
            03 / VEHICLES
          </div>
        </div>

        {/* Car track */}
        <div className="relative flex-1">
          <motion.div
            style={{ x: trackX }}
            className="absolute inset-y-0 left-0 flex w-[400vw] items-center"
          >
            {FLEET.map((car, i) => (
              <RunwayCar key={car.name} car={car} index={i} progress={p} />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Scrub progress bar */}
        <div className="relative z-20 mx-8 mb-10 md:mx-16">
          <div className="h-px w-full bg-border/40">
            <motion.div className="h-px bg-gold" style={{ scaleX: p, transformOrigin: "left" }} />
          </div>
          <div
            className="mt-3 flex justify-between text-[8.5px] tracking-[0.35em] text-muted-foreground/40"
            style={{ fontFamily: "var(--font-mono)" }}
          >
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
  car: { img: string; name: string; spec: string; ref: string; year: string; km: string; price: string };
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const start = index / FLEET.length;
  const peak  = start + 1 / (FLEET.length * 2);
  const end   = (index + 1) / FLEET.length;

  const cardOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.05), peak, Math.min(1, end + 0.05)],
    [0.28, 1, 0.28],
  );
  const cardScale = useTransform(progress, [start, peak, end], [0.88, 1.02, 0.88]);
  const labelY    = useTransform(progress, [start, peak, end], [24, 0, 24]);

  return (
    <div className="flex w-screen flex-shrink-0 flex-col items-center justify-center gap-6 px-12 pb-4">
      <motion.div
        style={{ opacity: cardOpacity, scale: cardScale }}
        className="relative w-full max-w-[960px]"
      >
        <div className="absolute -inset-16 rounded-full bg-gold/8 blur-3xl" />
        <img
          src={car.img}
          alt={car.name}
          className="relative w-full drop-shadow-[0_50px_70px_rgba(0,0,0,0.7)]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute -bottom-2 left-[12%] right-[12%] h-6 rounded-full bg-black/60 blur-2xl" />
      </motion.div>

      <motion.div
        style={{ y: labelY, opacity: cardOpacity }}
        className="whitespace-nowrap text-center"
      >
        <div
          className="text-[8.5px] tracking-[0.55em] text-gold/70"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {car.ref}
        </div>
        <div className="mt-2.5 font-display text-[2rem] font-light md:text-[3.2rem]">
          {car.name}
        </div>
        <div
          className="mt-1.5 text-[8.5px] tracking-[0.45em] text-muted-foreground/45"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {car.spec.toUpperCase()}
        </div>
        <div
          className="mt-4 flex items-center justify-center gap-5 text-[8.5px] tracking-[0.3em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="text-gold/60">{car.year}</span>
          <span className="text-border/60">·</span>
          <span className="text-muted-foreground/50">{car.km}</span>
          <span className="text-border/60">·</span>
          <span className="text-gold">{car.price}</span>
        </div>
      </motion.div>
    </div>
  );
}

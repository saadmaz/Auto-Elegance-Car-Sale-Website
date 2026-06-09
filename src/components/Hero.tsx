import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import heroCar from "@/assets/hero-car.webp";

const STATS = [
  { k: "4,200+", v: "Cars delivered" },
  { k: "11 yrs", v: "In business" },
  { k: "32 pt", v: "Inspection" },
  { k: "100%", v: "Verified history" },
];

// Ease used for all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const carY    = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const mx = useSpring(0, { stiffness: 38, damping: 20 });
  const my = useSpring(0, { stiffness: 38, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 22);
      my.set((e.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative h-screen min-h-[680px] overflow-hidden hero-gradient grain">

      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Car ─────────────────────────────────────────────── */}
      {/* Bottom-right, natural aspect ratio, blended into bg   */}
      <motion.div
        initial={{ x: "18%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.9, ease: EASE, delay: 0.3 }}
        style={{ y: carY, x: mx }}
        className="pointer-events-none absolute bottom-0 right-[-3%] w-[64%] md:right-0 md:w-[58%] lg:w-[62%]"
      >
        {/* Left-side blend so car never competes with text */}
        <div className="absolute inset-y-0 left-0 z-10 w-[52%] bg-linear-to-r from-background via-background/75 to-transparent" />
        {/* Bottom fade into section floor */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-[30%] bg-linear-to-t from-background to-transparent" />
        {/* Ambient gold glow beneath tyres */}
        <div className="absolute bottom-[6%] left-[35%] right-[8%] h-[18%] rounded-full bg-gold/14 blur-[72px]" />

        <motion.img
          src={heroCar}
          alt="Luxury sports coupe"
          style={{ y: my, opacity }}
          className="relative w-full drop-shadow-[0_20px_64px_rgba(212,168,76,0.18)]"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* ── Page content ──────────────────────────────────────── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-400 flex-col px-6 md:px-16"
      >
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-center justify-between pt-28 md:pt-32"
        >
          <div className="flex items-center gap-4 text-[10px] tracking-[0.5em] text-gold/60">
            <span className="h-px w-8 bg-gold/40" />
            CONCIERGE AUTO ACQUISITION
          </div>
          <span className="hidden font-mono text-[9px] tracking-[0.4em] text-foreground/20 md:block">
            EST. 2014 · WARSAW
          </span>
        </motion.div>

        {/* ── Headline block (vertically centred in remaining space) */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="font-display font-light">

            {/* "Buy your" — masked slide-up */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
                className="block text-5xl leading-[0.93] tracking-wide md:text-6xl lg:text-7xl xl:text-8xl"
              >
                Buy your
              </motion.span>
            </div>

            {/* "dream car." — italic gold, masked */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
                className="block text-5xl italic leading-[0.93] tracking-wide gold-shine md:text-6xl lg:text-7xl xl:text-8xl"
              >
                dream car.
              </motion.span>
            </div>

            {/* "Online." — ghost */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.56 }}
                className="block text-5xl leading-[0.93] tracking-wide text-foreground/20 md:text-6xl lg:text-7xl xl:text-8xl"
              >
                Online.
              </motion.span>
            </div>
          </h1>

          {/* Body copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.78 }}
            className="mt-8 max-w-sm md:mt-10"
          >
            <p className="text-[0.92rem] leading-[1.9] text-muted-foreground">
              We source the finest European luxury cars, verify every detail,
              and deliver straight to your door. No compromise.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#collection"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <span className="relative z-10">View collection</span>
                <svg
                  className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
                <span className="absolute inset-0 bg-linear-to-r from-gold via-amber-200 to-gold opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-foreground/18 px-7 py-3 text-sm tracking-wide transition hover:border-gold/50 hover:text-gold"
              >
                Request a quote
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Stats strip ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 1.0 }}
          className="mb-6 grid grid-cols-4 border-t border-border/40 md:mb-10"
        >
          {STATS.map((s, i) => (
            <div
              key={s.v}
              className={`py-5 ${i > 0 ? "border-l border-border/30 pl-6" : ""} pr-4`}
            >
              <div className="font-display text-2xl text-gold md:text-3xl">{s.k}</div>
              <div className="mt-1.5 text-[9px] tracking-[0.22em] text-muted-foreground/70">
                {s.v.toUpperCase()}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 right-8 hidden flex-col items-end gap-2 md:flex"
      >
        <div className="text-[9px] tracking-[0.45em] text-muted-foreground/40">SCROLL</div>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px origin-top bg-linear-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

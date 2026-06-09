import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import heroCar from "@/assets/hero-car.webp";

const STATS = [
  { k: "4,200+", v: "Cars delivered" },
  { k: "11 yrs", v: "Of craft" },
  { k: "32 pt", v: "Inspection" },
  { k: "100%", v: "Verified history" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const carY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Gentle mouse parallax — applied only to the car
  const mx = useSpring(0, { stiffness: 40, damping: 22 });
  const my = useSpring(0, { stiffness: 40, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 28);
      my.set((e.clientY / window.innerHeight - 0.5) * 16);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden hero-gradient grain"
    >
      {/* Fine grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Thin vertical accent rule — left edge */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className="absolute left-6 top-32 bottom-32 w-px origin-top bg-linear-to-b from-transparent via-gold/40 to-transparent md:left-16"
      />

      {/* ── Car — right column ── */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] overflow-hidden">
        {/* Blend car into text area on the left */}
        <div className="absolute inset-y-0 left-0 z-10 w-2/5 bg-linear-to-r from-background via-background/85 to-transparent" />
        {/* Ground fade */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-linear-to-t from-background to-transparent" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-background to-transparent" />

        {/* Gold ground glow */}
        <div className="absolute bottom-[12%] left-[8%] right-[4%] h-[28%] rounded-full bg-gold/12 blur-[90px]" />

        <motion.div
          initial={{ x: "22%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          style={{ y: carY, x: mx }}
          className="absolute inset-0 flex items-end justify-center pb-[5%]"
        >
          <motion.img
            src={heroCar}
            alt="Luxury sports coupe"
            style={{ y: my, opacity: fade }}
            className="h-full w-full object-contain object-bottom drop-shadow-[0_32px_80px_rgba(212,168,76,0.22)]"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
      </div>

      {/* ── Text column ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-400 flex-col px-6 pt-40 pb-20 md:px-16">
        <div className="flex flex-1 flex-col justify-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 text-[10px] tracking-[0.5em] text-gold/70"
          >
            <span className="h-px w-10 bg-gold/50" />
            CONCIERGE AUTO ACQUISITION
          </motion.div>

          {/* Animated reveal rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="mt-7 h-px w-28 origin-left bg-gold/30"
          />

          {/* Headline — three lines with stagger */}
          <div className="mt-8 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.3 }}
              className="font-display"
            >
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="block text-[11vw] leading-[0.95] tracking-tight md:text-[8.5rem] lg:text-[9.5rem]"
              >
                Buy your
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
                className="block text-[11vw] leading-[0.95] italic gold-shine tracking-tight md:text-[8.5rem] lg:text-[9.5rem]"
              >
                dream car.
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}
                className="block text-[11vw] leading-[0.95] tracking-tight text-foreground/25 md:text-[8.5rem] lg:text-[9.5rem]"
              >
                Online.
              </motion.span>
            </motion.h1>
          </div>

          {/* Body + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.82 }}
            className="mt-12 max-w-[440px]"
          >
            <p className="text-[0.95rem] leading-[1.9] text-muted-foreground">
              We search Europe, verify every detail, and deliver to your doorstep.
              No haggling. No surprises. Just the car you've been dreaming of.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition hover:scale-[1.02]"
              >
                <span className="relative z-10">View the collection</span>
                <svg
                  className="relative z-10 h-3.5 w-3.5 transition group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
                <span className="absolute inset-0 bg-linear-to-r from-gold via-amber-200 to-gold opacity-0 transition group-hover:opacity-100" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 py-3.5 text-sm tracking-wide transition hover:border-gold/60 hover:text-gold"
              >
                Request a quote
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/30 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.v} className="bg-background/70 px-7 py-7 backdrop-blur md:px-9">
              <div className="font-display text-3xl text-gold md:text-4xl">{s.k}</div>
              <div className="mt-2 text-[10px] tracking-[0.18em] text-muted-foreground">
                {s.v.toUpperCase()}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-[9px] tracking-[0.5em] text-muted-foreground/60">SCROLL</div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-4 w-px bg-linear-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
